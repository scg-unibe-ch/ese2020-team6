// import {MessageService} from "../controllers/messages.controller"
import {Message, MessageCreationAttributes} from '../models/message.model';
import {MessageThread, MessageThreadCreationAttributes, MessageThreadAttributes} from '../models/messageThread.model';
import {MessageThreadParticipants} from '../models/messageThreadParticipants.model';
import { Transaction, Op, Association } from 'sequelize';
import { Sequelize, where } from 'sequelize/types';
import { InstanceDoesNotExistError } from '../errors/instance-does-not-exist.error';
import { User, UserAttributes } from '../models/user.model';

export class MessageService {

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
     /*messageThread.findAll({
         where:{
          '$MessageThreadParticipats.messageThreadParticipantId$' : userId
         },
         include: [association: MessageThread.association.messageThreadParticipant]
     })
     */

    public static getProductThread(productId: number): Promise<Array<MessageThread>> {
        return MessageThread.findAll({
            where: {
                productId: productId
            }
        });
    }

    public static async getMessageThreadIdByProductId(productId: number): Promise<number> {
        const messageThread = await MessageThread.findOne({
            where: {
                productId: productId
            }
        });
        return messageThread.messageThreadId;
    }
/* Unused method

    public static createMessageThread(messageThread: MessageThreadCreationAttributes): Promise<MessageThread> {
        return MessageThread.create(messageThread);
      }
*/

    /*public static async  saveMessages(body: string, productId: number, roleOfSender: string, senderId: number): Promise<void> {
        if (roleOfSender === 'buyer') {
            this.findOrCreateMessageThread({productId: productId, isAccepted: false}, senderId);
            const threadId = await this.getMessageThreadIdByProductId(productId);
            this.getMessageThreadIdByProductId(productId) // more than one thread for a product
            .then((messageThreadId: number) => messageThreadId = threadId)
            .catch((err: any) => Promise.reject()); // handle error better
            this.insertMessageInMessageThread(threadId, senderId, body);
        } else if (roleOfSender === 'sender') {
          const threadId = await this.getMessageThreadIdByProductId(productId);
            this.insertMessageInMessageThread(threadId, senderId, body);
            this.setMessageThreadToAccepted(productId);
        } else {
            return Promise.reject();
        }

        return Promise.resolve();
    }
*/
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
        return Promise.resolve(); // promise resolve??
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
