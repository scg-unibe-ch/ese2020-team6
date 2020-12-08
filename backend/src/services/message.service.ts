import { Message } from '../models/message.model';
import { MessageThread } from '../models/messageThread.model';
import { MessageThreadParticipants } from '../models/messageThreadParticipants.model';
import { Transaction } from 'sequelize';
import { User } from '../models/user.model';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';
import { UserService } from './user.service';
import { StatusError } from '../errors/status.error';
import { UserDoesNotBelongToThreadError } from '../errors/user-does-not-belong-to-thread.error';
import { Count } from '../interfaces/count.interface';

export class MessageService {

    public static saveMessage(body: string, productId: number, senderId: number, threadId?: number): Promise<Message> {
      return MessageThread.sequelize.transaction((transaction: Transaction) => {
        if (threadId) {
            return MessageThread.findByPk(threadId)
            .then((thread: MessageThread) => this.findSellerAndSender(thread, productId, senderId))
            .then((values: [MessageThread, User, User]) => MessageService.insertMessageIntoExistingThread(body, values, transaction));
        } else {
            return MessageService.createThread(productId, senderId, transaction)
            .then(([thread, sender]: [MessageThread, User]) => {
              return thread.insert(body, sender, transaction);
            });
        }
    });
    }

    private static findSellerAndSender(
      thread: MessageThread, productId: number, senderId: number
    ): Promise<[MessageThread, User, User]> {
      return Promise.all([
        Promise.resolve(thread),
        ProductService.getProductById(productId).then((product: Product) => UserService.getUserById(product.sellerId)),
        UserService.getUserById(senderId)
      ]);
    }

    private static createThread(
      productId: number, senderId: number, transaction: Transaction
    ): Promise<[MessageThread, User]> {
      return MessageThread.create({ productId: productId, isAccepted: false },
      { transaction: transaction })
      .then((thread: MessageThread) => this.findSellerAndSender(thread, productId, senderId))
      .then(([thread, seller, sender]: [MessageThread, User, User]) =>
        MessageService.addParticipants(thread, seller, sender, transaction));
    }


    private static addParticipants(
      thread: MessageThread, seller: User, sender: User, transaction: Transaction
    ): Promise<[MessageThread, User]> {
      if (seller.userId === sender.userId) {
        return Promise.reject(new StatusError('Seller cannot create a new thread on his product!', 400));
      } else {
        return Promise.all([
          thread.createParticipant({
            participantId: seller.userId,
            isSeller: true
          }, { transaction: transaction }),
          thread.createParticipant({
            participantId: sender.userId,
            isSeller: false
          }, { transaction: transaction })
        ]).then(() => Promise.resolve([thread, sender]));

      }
    }

    private static insertMessageIntoExistingThread(
      body: string, [thread, seller, sender]: [MessageThread, User, User], transaction: Transaction
    ): Promise<Message> {
      return thread.isParticipant(sender)
      .catch((error: any) => {
        if (error instanceof UserDoesNotBelongToThreadError) {
          return Promise.reject(new StatusError(error.message, 400));
        } else {
          return Promise.reject(error);
        }
      })
      .then(() => thread.insert(body, sender, transaction));
    }



    static setToRead(messageThreadId: number, participantId: number): Promise<MessageThread> {
      return MessageThread.findByPk(messageThreadId)
      .then((thread: MessageThread) => thread.setToRead(participantId));
    }

    /***********************
        Getter methods
    ***********************/

    public static getMessageThreadsByUserId(userId: number): Promise<Array<MessageThread>> {
      return User.findByPk(userId).then((user: User) => user.getThreads())
      .then((threads: Array<MessageThreadParticipants>) => Promise.all(
        threads.map((thread: MessageThreadParticipants) => Promise.resolve(thread.messageThreadId))
      )).then((threadIds: Array<number>) => MessageThread.findAll({
        where: {
          messageThreadId: threadIds
        },
        include: [
          {
            association: MessageThread.associations.participants,
            include: [MessageThreadParticipants.associations.user]
          },
          {
            association: MessageThread.associations.messages,
            include: [Message.associations.sender]
          },
          {
            association: MessageThread.associations.product,
            include: [
              Product.associations.address,
              Product.associations.seller
            ]
          }
        ]
      }));
     }

     public static getUnreadCount(userId: number): Promise<Count<MessageThread>> {
       return User.findByPk(userId).then((user: User) => user.getThreads())
       .then((threads: Array<MessageThreadParticipants>) => Promise.all(
         threads.map((thread: MessageThreadParticipants) => thread.getThread())
       )).then((threads: Array<MessageThread>) => {
         return Promise.all(threads.map((thread: MessageThread) => {
           return thread.getUnreadCount();
         }));
       }).then((counts: Array<Count<MessageThread>>) => {
        return Promise.resolve(new Count(counts));
       });
     }
}
