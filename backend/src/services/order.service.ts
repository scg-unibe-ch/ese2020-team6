import { Products } from '../models/products.model';
import { User } from '../models/user.model';
import { Orders } from '../models/order.model';
import { Address } from '../models/address.model';
import { Model } from 'sequelize/types';

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
                    OrderService.createAddress(shipping);
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
                    OrderService.createAddress(shipping);
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
                    OrderService.createAddress(shipping);
                    //wollen wir das besser machen, falls ja,wie?
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

    public static createAddress(shipping : string) {
        var address = shipping.split(/[ ,]+/).filter(Boolean);
        Address.create({ streetName: address[0], streetType: address[1], addressNumber: address[2],
                         streetAddress: address[3], neighbourhood: address[4], city: address[5],
                         region: address[6], postal: parseInt(address[7], 10), country: address[8]});
    }
}
