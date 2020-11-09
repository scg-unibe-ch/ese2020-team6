import { Products, ProductsAttributes } from '../models/products.model';
import { UserAttributes, User } from '../models/user.model';
import {Order, Orders} from '../models/order.model';

const {OP} = require('sequelize');

export class OrderService {

    public async buyItem(productId: number, paymentMethod: string, shipping: string, buyerId: number) {

        const product = await Products.findOne({
            where: {
                productId: productId
            }
        });
        const sellerId: number = product.userId;

        const user = await User.findOne({
            where: {
                userId: buyerId
            }
        });

        // user.wallet>=product.price ? do payment : error messager

        if (user.wallet >= product.price) {
        // subtract from buyer
        User.increment( 'wallet', {by: -product.price, where: { userId: 'buyerId'}});
        // add to seller
        User.increment( 'wallet', {by: product.price, where: { userId: 'sellerId'}});
      //  Order.build({productId: productId, userId: buyerId, sellerId: user.userId})
        Products.update({status: 'sold'}, {
            where: {
                productId: productId
            }
        });
        } else {
            console.log('Error Saldo zu klein');
        }
       // return orderId;
    }
}