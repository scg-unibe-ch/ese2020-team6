import { Products } from '../models/products.model';
import { User } from '../models/user.model';
import {Orders} from '../models/order.model';
import { Model} from 'sequelize/types';

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

        // if wallet

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
