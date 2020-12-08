import express, { Router, Request, Response } from 'express';
import {Message} from '../models/message.model';
import {MessageThread} from '../models/messageThread.model';
import { handleError } from '../errors/status.error';
import { verifyToken } from '../middlewares/checkAuth';
import { MessageService } from '../services/message.service';
import { Count } from '../interfaces/count.interface';

const messageController: Router = express.Router();

messageController.get('/thread', verifyToken,
    (req: Request, res: Response) => {
        const userId: number = req.body.tokenPayload.userId;
        MessageService.getMessageThreadsByUserId(userId)
        .then((messageThreads: Array<MessageThread>) => res.send(messageThreads))
        .catch((err: any) => handleError(err, res));
});

messageController.put('/thread/readstatus', verifyToken,
    (req: Request, res: Response) => {
        const messageThreadId = req.body.messageThreadId;
        const participantId = req.body.tokenPayload.userId;
        MessageService.setToRead(messageThreadId, participantId)
        .then((messageThread: MessageThread) => res.send(messageThread))
        .catch((err: any) => handleError(err, res));
});

messageController.get('/thread/unread/count', verifyToken,
    (req: Request, res: Response) => {
        const participantId = req.body.tokenPayload.userId;
        MessageService.getUnreadCount(participantId)
        .then((count: Count<MessageThread>) => {
          console.log(count);
          res.send(count);
        })
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
