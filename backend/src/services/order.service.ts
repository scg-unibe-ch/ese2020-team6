import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { Order, OrderAttributes} from '../models/order.model';
import { UserService } from './user.service';
import { Sequelize } from 'sequelize/types';
import { Model} from 'sequelize/types';

const {OP} = require('sequelize');

export class OrderService {

    public async buyItem(productId: number, paymentMethod: string, shipping: string, buyerId: number) {

        const product = await Product.findOne({
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

        // if wallet

           try {
              await Order.sequelize.transaction(
                   async () => {
                    User.increment( 'wallet', {by: -product.price, where: { userId: buyerId }});
                    User.increment( 'wallet', {by: product.price, where: { userId: sellerId}});
                    Order.create({ buyerId: buyerId, productId: productId, sellerId: sellerId});
                    Product.update({status: 'sold'}, {
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

    public getMyOrders(userId: number): Promise<Array<OrderAttributes>> {
        return Order.findAll({
            where: {
                buyerId: userId
            }
        });
    }

    public getMyProductOrders(userId: number): Promise<Array<OrderAttributes>> {
        return Order.findAll({
            where: {
                sellerId: userId
            }
        });
    }
}
