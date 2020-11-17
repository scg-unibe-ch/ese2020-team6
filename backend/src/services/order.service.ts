import { Products, ProductsAttributes } from '../models/products.model';
import { User } from '../models/user.model';
import {Orders, OrdersAttributes} from '../models/order.model';
import { UserService } from './user.service';
import { Model, Sequelize } from 'sequelize/types';
import { REPL_MODE_SLOPPY } from 'repl';

const {OP} = require('sequelize');

export class OrderService {

    public async buyItem(productId: number, paymentMethod: string, shipping: string, buyerId: number) {

        const product = await Products.findOne({
            where: {
                productId: productId
            }
        });
        const seller = await User.findOne({
            where: {
                userId: buyerId
            }
        });
        const sellerId: number = product.userId;

        if (seller.wallet >= product.price) {
        }

           try {
              await Model.sequelize.transaction(
                   async () => {
                    User.increment( 'wallet', {by: -product.price, where: { userId: buyerId }});
                    User.increment( 'wallet', {by: product.price, where: { userId: sellerId}});
                    Orders.create({ userId: buyerId, productId: productId, sellerId: sellerId});
                    Products.update({status: 'sold'}, {
                        where: {
                            productId: productId
                        }
                    });
                });

                 return {
                          ok: true
                 };
                } catch (err) {
                console.log(err);
                return{
                    ok: false
                };
            }
    }
}
