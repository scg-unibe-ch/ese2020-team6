import {Message } from '../models/message.model';
import {MessageThread, MessageThreadCreationAttributes, MessageThreadAttributes} from '../models/messageThread.model';
import {MessageThreadParticipants} from '../models/messageThreadParticipants.model';
import { Transaction } from 'sequelize';
import { InstanceDoesNotExistError } from '../errors/instance-does-not-exist.error';
import { User } from '../models/user.model';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';
import { UserService } from './user.service';
import { StatusError } from '../errors/status.error';

export class MessageService {

  public static saveMessage(body: string, productId: number, senderId: number, threadId?: number): Promise<Message> {
    if (threadId) {
      return MessageThread.findByPk(threadId)
      .then((thread: MessageThread) => Promise.all([
        Promise.resolve(thread),
        ProductService.getProductById(productId).then((product: Product) => UserService.getUserById(product.sellerId)),
        UserService.getUserById(senderId)
      ]))
      .then((values: [MessageThread, User, User]) => MessageService.insertMessageIntoExistingThread(body, values));
    } else {
      return MessageThread.sequelize.transaction((transaction: Transaction) => {
        return MessageService.createThread(productId, senderId, transaction)
        .then((values: [MessageThread, User, User]) => MessageService.insertMessageIntoNewThread(body, values, transaction));
      });
    }
  }

  private static createThread(
    productId: number, senderId: number, transaction: Transaction
  ): Promise<[MessageThread, User, User]> {
    return MessageThread.create({ productId: productId, isAccepted: false },
    { transaction: transaction })
    .then((thread: MessageThread) => Promise.all([
      Promise.resolve(thread),
      ProductService.getProductById(productId).then((product: Product) => UserService.getUserById(product.sellerId)),
      UserService.getUserById(senderId)
    ]))
    .then(([thread, seller, sender]: [MessageThread, User, User]) =>
      MessageService.addParticipants(thread, seller, sender, transaction));
  }


  private static addParticipants(
    thread: MessageThread, seller: User, sender: User, transaction: Transaction
  ): Promise<[MessageThread, User, User]> {
    if (seller.userId === sender.userId) {
      return Promise.reject(new StatusError('Seller cannot create a new thread on his product!', 400));
    } else {
      return Promise.all([
        thread.createParticipant({
          participantId: seller.userId
        }, { transaction: transaction }),
        thread.createParticipant({
          participantId: sender.userId
        }, { transaction: transaction })
      ]).then(() => Promise.resolve([thread, seller, sender]));

    }
  }

  private static insertMessageIntoExistingThread(
    body: string, [thread, sender, seller]: [MessageThread, User, User]
  ): Promise<Message> {
    return thread.getParticipants().then((participants: Array<MessageThreadParticipants>) => {
      return Promise.all(participants.map((participant: MessageThreadParticipants) => {
        return participant.getUser();
      }));
    })
    .then((users: Array<User>) => Promise.all(users.map((user: User) => {
      return user.userId === sender.userId || user.userId === seller.userId ? true : false;
    })))
    .then((checkedUsers: Array<boolean>) => Promise.resolve(checkedUsers.includes(false)))
    .then((userCheck: boolean) => {
      if (userCheck) {
        return Promise.resolve();
      } else {
        return Promise.reject(new StatusError('Users do not belong to the thread!', 400));
      }
    }).then(() => thread.createMessage({
      body: body, senderId: sender.userId, readStatus: false
    }));
  }

  private static insertMessageIntoNewThread(
    body: string, [thread, sender]: [MessageThread, User, User], transaction?: Transaction
  ): Promise<Message> {
    return thread.createMessage({
      body: body, senderId: sender.userId, readStatus: false
    }, { transaction: transaction });
  }

    /***********************
        Getter methods
    ***********************/
    public static getMessagesByThreadId(messageThreadId: number): Promise<Array<Message>> {
        return Message.findAll({
            where: {
                messageThreadId: messageThreadId
            }
        });
    }

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
            association: MessageThread.associations.messages
          },
          {
            association: MessageThread.associations.product,
            include: [
              Product.associations.address
            ]
          }
        ]
      }).then(value => {console.log(value); return Promise.resolve(value); }));
     }

    public static getProductThread(productId: number): Promise<Array<MessageThread>> {
        return MessageThread.findAll({
            where: {
                productId: productId
            }
        });
    }

    public static getMessageThreadIdByProductId(productId: number): Promise<MessageThread> {
        return MessageThread.findOne({
            where: {
                productId: productId
            }
        });
    }

     /************************
        Setter helper methods
    *************************/

    public static setToRead(messageThreadId: number): Promise<Array<Message>> {
        Message.update({ readStatus: true}, {
          where: {
            messageThreadId: messageThreadId
          }
        });
        return this.getMessagesByThreadId(messageThreadId);
      }

    public static setMessageThreadToAccepted(productId: number): Promise<MessageThread> {
        try {
          MessageThread.update({ isAccepted: true}, {
            where: {
              productId: productId
            }
          });
        }
        finally {
          return this.getMessageThreadIdByProductId(productId);
        }
      }
      public static insertMessageInMessageThread(messageThreadId: number, senderId: number, text: string,
        transaction?: Transaction): Promise<Message> {
        return Message.create({messageThreadId: messageThreadId, senderId: senderId, body: text, readStatus: false},
          {transaction: transaction});
      }

    /********************************************************************
        Helper methods to check if a thread exists and if not creates one
    ********************************************************************/

    public static threadDoesExist(messageThread: Partial<MessageThreadAttributes>): Promise<MessageThread> {
        return MessageThread.findOne({
          where: messageThread,
          rejectOnEmpty: new InstanceDoesNotExistError(MessageThread.getTableName())
        });
      }

    public static findOrCreateMessageThread(messageThread: MessageThreadCreationAttributes, buyerId: number,
      transaction?: Transaction): Promise<MessageThread> {
        return this.threadDoesExist(messageThread)
        .catch((err: any) => {
          if (err instanceof InstanceDoesNotExistError) {
            MessageThread.create(messageThread, {transaction: transaction});
            MessageThreadParticipants.create({messageThreadId: messageThread.messageThreadId, participantId: buyerId},
              {transaction: transaction});
            return MessageThread.findOne({
                where: {
                    messageThreadId: messageThread.messageThreadId
                }
            });
          } else {
            return Promise.reject(err);
          }
        });
      }
}
