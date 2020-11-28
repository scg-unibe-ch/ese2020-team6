//import

import { handleError } from "../errors/status.error";
import { verifyToken } from "../middlewares/checkAuth";
import { MessageService } from "../services/message.service";

const messageController: Router = express.Router();
const messageService = new MessageService();

messageController.get('/message/thread/product/:productId'), verifyToken,
    (req:Request, res:Response) =>{
        const productId: number = req.body.productId;
        MessageService.getProductThread(userId)
        .then((messasgeThread:MessageThread) => res.send(messageThread))
        .catch((err:any) => handleError(err, res));
}

messageController.get('/message/thread'), verifyToken,
    (req:Request, res:Response) =>{
        const userId: number = req.body.userId;
        MessageService.getUserThreads(userId)
        .then((messasgeThreads:Array<MessageThread>) => res.send(messageThreads))
        .catch((err:any) => handleError(err, res));
}

messageController.get('/message/thread/messages/:threadId'), verifyToken,
    (req:Request, res:Response) =>{
        const threadId: number = req.body.threadId;
        MessageService.getMessagesByThreadId(threadId)
        .then((messasges:Array<Message>) => res.send(messages))
        .catch((err:any) => handleError(err, res));
}