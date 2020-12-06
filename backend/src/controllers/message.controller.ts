import express, { Router, Request, Response } from 'express';
import { verifyToken } from '../middlewares/checkAuth';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

const messageController: Router = express.Router();
let tmp: any;
let add1Id = 3;
const add1: Array<any> = [
  {
    messageId: 1,
    messageThreadId: 1,
    senderId: 1,
    body: 'Some Message',
    createdAt: new Date(),
    readStatus: false
  },
  {
    messageId: 2,
    messageThreadId: 1,
    senderId: 2,
    body: 'Some Other Message',
    createdAt: new Date(),
    readStatus: false
  }
];

const add2Id = 3;
const add2: Array<any> = [
  {
    messageId: 1,
    messageThreadId: 1,
    senderId: 1,
    body: 'Some Message for second thread',
    createdAt: new Date(),
    readStatus: false
  },
  {
    messageId: 2,
    messageThreadId: 1,
    senderId: 2,
    body: 'Some Other Message for second thread',
    createdAt: new Date(),
    readStatus: false
  }
];

messageController.post('/send', verifyToken,
  (req: Request, res: Response) => {
    console.log(req.body);
    add1.push({
      messageId: add1Id++,
      messageThreadId: 1,
      senderId: req.body.tokenPayload.userId,
      body: req.body.body,
      createdAt: new Date(),
      readStatus: false
    });
    res.send();
  }
);

messageController.get('/thread', verifyToken,
    (req: Request, res: Response) => {
        const userId: number = parseInt(req.body.tokenPayload.userId, 10);
        Promise.all([
          UserService.getUserById(userId),
          UserService.getUserById(2),
          ProductService.getProductById(2),
        ]).then(value => {
          tmp = [
            {
              messageThreadId: 1,
              productId: 1,
              product: value[2],
              messages: add1,
              participants: [
                value[0],
                value[1]
              ],
              isAccepted: false
            },
            {
              messageThreadId: 2,
              productId: 1,
              product: value[2],
              messages: add2,
              participants: [
                value[0],
                value[1]
              ],
              isAccepted: false
            }
          ];
          res.send(tmp);
        });
});


export const MessageController: Router = messageController;
