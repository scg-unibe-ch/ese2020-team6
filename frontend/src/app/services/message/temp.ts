import { Threads } from 'src/app/models/message/threads.model';
import { Thread } from 'src/app/models/message/thread.model';
import { Message } from 'src/app/models/message/message.model';
import { Product } from 'src/app/models/product/product.model';
import { User } from 'src/app/models/user/user.model';

let user = User.NullUser;
user.userName = "UserName";

let msg7 = new Message(4, 'Hallo', new Date(), true);
let msg8 = new Message(4, 'Wie gehts?', new Date(), true);
const threadA = new Thread(1, Product.NullProduct, [user, user], true, [msg7, msg8]);
let msg5 = new Message(5, 'Ich brauche was zu essen', new Date(), true);
let msg6 = new Message(5, 'dringend', new Date(), true);
const threadM = new Thread(2, Product.NullProduct, [user, user], true, [msg5, msg6]);

let msg3 = new Message(6, 'Ich liebe Pizza', new Date(), true);
let msg4 = new Message(6, 'Warum habe ich keine Pizza?', new Date(), true);
const threadL = new Thread(3, Product.NullProduct, [user, user], true, [msg3, msg4]);

let msg1 = new Message(7, 'Warum programmieren wir?', new Date(), true);
let msg2 = new Message(7, 'Immer wenn etwas geht, ist es gleich wieder kaputt', new Date(), true);
const threadS = new Thread(4, Product.NullProduct, [user, user], true, [msg1, msg2]);

let msg = new Message(8, 'Hallo', new Date(), true);
const threadE = new Thread(5, Product.NullProduct, [user, user], true, [msg]);

let msg9 = new Message(9, 'Lalalalalala', new Date(), true);
let msg10 = new Message(9, 'Heeeeey', new Date(), true);
const threadK = new Thread(6, Product.NullProduct, [user, user], true, [msg9, msg10]);

const threadJ = new Thread(7, Product.NullProduct, [user, user], true, []);
const threadH = new Thread(8, Product.NullProduct, [user, user], true, []);
const threadP = new Thread(9, Product.NullProduct, [user, user], true, []);
const threadN = new Thread(10, Product.NullProduct, [user, user], true, []);

export var threads = new Threads([threadA, threadM, threadL, threadS, threadE, threadK, threadJ, threadH, threadP, threadN]);
