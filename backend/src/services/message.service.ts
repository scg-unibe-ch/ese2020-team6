//import {message}

import { where } from "sequelize/types"

export class MessageService{
  
    public static getMessagesByThreadId(messageThreadId: number): Promise<Array<Message>>{
        return Message.findAll(){
            where:{
                messageThreadId: messageThreadId;
            }
        }
    };
    public static getUserThreads(userId: number): Promise<Array<MessageThread>>{
        return MessageThreadParticipants.findAll(){
            where:{
                participantId: userId;
            }
        }
    };
    public static getProductThread(productId: number): Promise<Array<MessageThread>>{
        return MessageThread.findAll(){
            where:{
                productId: productId;
            }
        }
    };