import { Products } from '../models/products.model';
import { User } from '../models/user.model';
import {Orders} from '../models/order.model';
import { Model} from 'sequelize/types';

export class OrderService {

    public async buyItem(productId: number, paymentMethod: string, shipping: string, buyerId: number) {

       var orderId: number;
        const product = await Products.findOne({
            where: {
                productId: productId
            }
        });
        const sellerId: number = product.userId;

            //if paymentMethod =wallet
            // if wallet < price -> error "Wallet to small?"
           try {
              await Model.sequelize.transaction(
                   async () => {
                    User.increment( 'wallet', {by: -product.price, where: { userId: buyerId }});
                    //alt: User.incremet( 'wallet', {by: -product.price, where {userId: 'buyerId'}});
                    User.increment( 'wallet', {by: product.price, where: { userId: sellerId}});
                    const order = Orders.create({ userId: buyerId, productId: productId, sellerId: sellerId});
                    Products.update({status: 'sold'}, {
                        where: {
                            productId: productId
                        }
                    });
                    orderId = (await order).orderId ;
                });

                 return {
                     ok: true,
                     orderId
                 };
            } catch (err) {

                console.log(err);
                return {
                    ok: false
                };
            }
        }       

    public async rentItem(productId: number, hours: number, paymentMethod: string, shipping: string, buyerId: number) {

        var orderId: number;
        const product = await Products.findOne({
            where: {
                productId: productId
            }
        });
        const sellerId: number = product.userId;

        // if paymentMethod = wallet
        // if wallet < price -> error "Wallet to small?
        try{
            await Model.sequelize.transaction(
                async () => {
                    User.increment( 'wallet', {by: -(product.price * hours), where: { userId: buyerId}});
                    User.increment( 'wallet', {by: (product.price * hours), where: { userId: sellerId}});
                    const order = Orders.create({productId: productId, userId: buyerId, sellerId: sellerId});
                    //wollen wir das so? wie besser machen?
                    Products.update({status: 'rent'}, {
                      where: {
                          productId: productId
                       }
                      });
                      orderId = (await order).orderId;
                });

                return {
                    ok: true,
                    orderId
                };
        } catch (err) {

            console.log(err);
            return {
                ok: false
            };
        }
    }

    public async purchaseService(productId: number, hours: number, paymentMethod: string, shipping: string, buyerId: number) {

        var orderId: number;
        const service = await Products.findOne({
            where: {
                productId: productId
            }
        });
        const sellerId: number = service.userId;

        //if paymentMethod = wallet
        // if wallet < price -> error "Wallet to small?"
        try {
            await Model.sequelize.transaction(
                async () => {
                    User.increment( 'wallet', {by: -(service.price * hours), where: { userId: 'buyerId'}});
                    User.increment( 'wallet', {by: (service.price * hours), where: { userId: 'sellerId'}});
                    const order = Orders.build({productId: productId, userId: buyerId, sellerId: sellerId});
                    Products.update({status: 'available'}, {
                         where: {
                             productId: productId
                         }
                   });
                   orderId = (await order).orderId;
                });

                return {
                    ok: true,
                    orderId
                };
        } catch (err) {

            console.log(err);
            return {
                ok: false
            };
        }
    }
}
