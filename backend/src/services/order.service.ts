import { Product } from '../models/product.model';
import { User } from '../models/user.model';
import { Order, OrderAttributes} from '../models/order.model';
import { UserService } from './user.service';
import { Sequelize } from 'sequelize/types';

const {OP} = require('sequelize');

export class OrderService {

    public async buyItem(productId: number, paymentMethod: string, shipping: string, buyerId: number) {

        const product = await this.findOneProduct(productId);
        const sellerId: number = product.userId;
        const user = await this.findOneUser(buyerId);

        if (user.wallet >= product.price) {
        }

           /*try {
                const result = await Sequelize.transaction(async (t) =>) {
                    User.increment( 'wallet', {by: -product.price, where: { userId: buyerId }},
                    { transaction :t });
                }

            }
            catch (error){
            console.log('Error Saldo zu klein');
        }*/
    }

    public transaction(product: Product, productId: number, buyerId: number, sellerId: number) {
        User.increment( 'wallet', {by: -product.price, where: { userId: buyerId }});
        User.increment( 'wallet', {by: product.price, where: { userId: sellerId}});
        Order.create({productId: productId, buyerId: buyerId, sellerId: sellerId});
        Product.update({status: 'sold'}, {
            where: {
                productId: productId
            }
        });
    }


    public findOneProduct(productId: number): Promise<Product> {
        return Product.findOne({
            where: {
                productId: productId
            }
        });
    }

    public findOneUser(userId: number): Promise<User> {
        return User.findOne({
            where: {
                userId: userId
            }
        });
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


/*
try {

    const result = await sequelize.transaction(async (t) => {

      const user = await User.create({
        firstName: 'Abraham',
        lastName: 'Lincoln'
      }, { transaction: t });

      await user.setShooter({
        firstName: 'John',
        lastName: 'Boothe'
      }, { transaction: t });

      return user;

    });

    // If the execution reaches this line, the transaction has been committed successfully
    // `result` is whatever was returned from the transaction callback (the `user`, in this case)

  } catch (error) {

    // If the execution reaches this line, an error occurred.
    // The transaction has already been rolled back automatically by Sequelize!

  }*/
