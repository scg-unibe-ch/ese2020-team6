//import {MessageService} from "../controllers/messages.controller"
import {Message, MessageCreationAttributes} from "../models/message.model"
import {MessageThread, MessageThreadCreationAttributes} from "../models/messageThread.model"
import {MessageThreadParticipants} from "../models/messageThreadParticipants.model"

import { where } from "sequelize/types"

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
}