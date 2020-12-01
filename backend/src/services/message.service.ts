//import {MessageService} from "../controllers/messages.controller"
import {Message, MessageCreationAttributes} from "../models/message.model"
import {MessageThread, MessageThreadCreationAttributes, MessageThreadAttributes} from "../models/messageThread.model"
import {MessageThreadParticipants} from "../models/messageThreadParticipants.model"

import { Sequelize, where } from "sequelize/types"
import { InstanceDoesNotExistError } from '../errors/instance-does-not-exist.error';

export class MessageService{
  
    public static getMessagesByThreadId(messageThreadId: number): Promise<Array<Message>>{
        return Message.findAll({
            where:{
                messageThreadId: messageThreadId
            }
        });
    }

    public static getUserThreads(userId: number): Promise<Array<MessageThreadParticipants>>{
        return MessageThreadParticipants.findAll({
            where:{
                participantId: userId
            }
        });
    }

    public static getProductThread(productId: number): Promise<Array<MessageThread>>{
        return MessageThread.findAll({
            where:{
                productId: productId
            }
        });
    }

    public static createMessageThread(messageThread: MessageThreadCreationAttributes): Promise<MessageThread> {
        return MessageThread.create(messageThread);
      }
//////////////////////////////////////////////////////////////////////////////////////////////////////////
    public static getMessageThreadsByUserId(userId: number): Promise<Array<MessageThread>>{
        const test = MessageThreadParticipants.findAll({
            where: {
                participantId: userId
            }
        })
        return MessageThread.findAll({
            attributes: ['messageThreadId', [Sequelize.literal('0'), 'test']
        ],
        where : {messageThreadId : test}
    })
    /*
            where: {
                messageThreadId: test
            }
        })
    }*/
    }
    public static getAllMessageThreads(userId: number){
        return MessageThreadParticipants.findAll({
            where: {
                participantId: userId
            }
        })
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////
      /*
        Setter helper methods
      */
    public static setToRead(messageThreadId: number): Promise<Array<Message>> {
        Message.update({ readStatus: true}, {
          where: {
            messageThreadId: messageThreadId
          }
        });
        return this.getMessagesByThreadId(messageThreadId);
      }

    public static setThreadToAccepted(messageThreadId: number): Promise<Array<Message>> {
        MessageThread.update({ isAccepted: true}, {
          where: {
            messageThreadId: messageThreadId
          }
        });
        return this.getMessagesByThreadId(messageThreadId);
      }

    /*
        Helper methods to check if a thread exists and if not creates one
    */
    public static threadDoesExist(messageThread: Partial<MessageThreadAttributes>): Promise<MessageThread> {
        return MessageThread.findOne({
          where: messageThread,
          rejectOnEmpty: new InstanceDoesNotExistError(MessageThread.getTableName())
        });
      }

    public static findOrCreateMessageThread(messageThread: MessageThreadCreationAttributes): Promise<MessageThread> {
        return this.threadDoesExist(messageThread).catch((err: any) => {
          if (err instanceof InstanceDoesNotExistError) {
            return MessageThread.create(messageThread);
          } else {
            return Promise.reject(err);
          }
        });
      }
}