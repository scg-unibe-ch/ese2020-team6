import express, { Router, Request, Response } from 'express';
import {Message} from '../models/message.model';
import {MessageThread} from '../models/messageThread.model';
import { handleError } from '../errors/status.error';
import { verifyToken } from '../middlewares/checkAuth';
import { MessageService } from '../services/message.service';

const messageController: Router = express.Router();
const messageService = new MessageService();

messageController.get('/message/thread/product/:productId', verifyToken,
(req: Request, res: Response) => {
        const productId: number = parseInt(req.body.productId, 10); // body udr params?
        MessageService.getProductThread(productId)
        .then((messageThread: Array<MessageThread>) => res.send(messageThread))
        .catch((err: any) => handleError(err, res));
});


messageController.get('/message/thread', verifyToken,
    (req: Request, res: Response) => {
        const userId: number = parseInt(req.body.userId, 10); // body udr params
        MessageService.getMessageThreadsByUserId(userId)
        .then((messageThread: Array<MessageThread>) => res.send(messageThread))
        .catch((err: any) => handleError(err, res));
});

messageController.get('/message/thread/messages/:threadId', verifyToken,
    (req: Request, res: Response) => {
        const threadId: number = parseInt(req.body.threadId, 10); // body udr params
        MessageService.getMessagesByThreadId(threadId)
        .then((messages: Array<Message>) => res.send(messages))
        .catch((err: any) => handleError(err, res));
});

messageController.post('/message/send', verifyToken,
     (req: Request, res: Response) => {
        const body: string = req.body.body;
        const productId: number = parseInt(req.body.productId, 10);
        const roleOfSender: string = req.body.roleOfSender;
        const senderId: number = parseInt(req.body.userId, 10);
        let response: string;
        MessageService.saveMessages(body, productId, roleOfSender, senderId)
        .then((message: Message) => res.send(message))
        .catch((err: any) => handleError(err, res));
     });
