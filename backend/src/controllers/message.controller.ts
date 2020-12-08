import express, { Router, Request, Response } from 'express';
import {Message} from '../models/message.model';
import {MessageThread} from '../models/messageThread.model';
import { handleError } from '../errors/status.error';
import { verifyToken } from '../middlewares/checkAuth';
import { MessageService } from '../services/message.service';

const messageController: Router = express.Router();

messageController.get('/thread', verifyToken,
    (req: Request, res: Response) => {
        const userId: number = req.body.tokenPayload.userId;
        MessageService.getMessageThreadsByUserId(userId)
        .then((messageThread: Array<MessageThread>) => res.send(messageThread))
        .catch((err: any) => handleError(err, res));
});

messageController.post('/send', verifyToken,
     (req: Request, res: Response) => {
        const body: string = req.body.body;
        const productId: number = req.body.productId;
        const senderId: number = req.body.tokenPayload.userId;
        const theradId: number = req.body.messageThreadId;
        MessageService.saveMessage(body, productId, senderId, theradId)
        .then((message: Message) => res.send(message))
        .catch((err: any) => handleError(err, res));
});

export const MessageController: Router = messageController;
