import {Message } from '../models/message.model';
import {MessageThread, MessageThreadCreationAttributes, MessageThreadAttributes} from '../models/messageThread.model';
import {MessageThreadParticipants} from '../models/messageThreadParticipants.model';
import { Transaction } from 'sequelize';
import { InstanceDoesNotExistError } from '../errors/instance-does-not-exist.error';
import { User } from '../models/user.model';

export class MessageService {

  public static saveMessages(body: string, productId: number, roleOfSender: string, senderId: number): Promise<Message> {
    if (roleOfSender === 'buyer') {
        this.findOrCreateMessageThread({productId: productId, isAccepted: false}, senderId)
        .then((messageThread: MessageThread) => {
        this.insertMessageInMessageThread(messageThread.messageThreadId, senderId, body); });
    } else if (roleOfSender === 'sender') {
      this.getMessageThreadIdByProductId(productId)
      .then((messageThread: MessageThread) => {
        this.insertMessageInMessageThread(messageThread.messageThreadId, senderId, body);
        this.setMessageThreadToAccepted(productId);
      });
    } else {
        return Promise.reject('Messgae has not been saved');
    }
    return Message.findOne({ // find with messageId
      where: {
        body: body,
        senderId: senderId
      }
    });
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
        return User.findByPk(userId).then((user: User) => user.getMessageThreadParticipants())
         .then((messageThreadParticipants: Array<MessageThreadParticipants>) => Promise.all(messageThreadParticipants.map(
             (messageThreadParticipant: MessageThreadParticipants) => messageThreadParticipant.getMessageThread()
         )));
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

    public static setMessageThreadToAccepted(productId: number): Promise<Array<Message>> {
        // if
        MessageThread.update({ isAccepted: true}, {
          where: {
            productId: productId
          }
        });
        return this.getMessagesByThreadId(productId);
      }
      public static insertMessageInMessageThread(messageThreadId: number, senderId: number, text: string,
        transaction?: Transaction): Promise<void> {
        Message.create({messageThreadId: messageThreadId, senderId: senderId, body: text, readStatus: false},
          {transaction: transaction});
        return Promise.resolve();
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
        return this.threadDoesExist(messageThread).catch((err: any) => {
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
