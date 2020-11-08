import { Optional, Model, Sequelize, DataTypes, IntegerDataType } from 'sequelize';

export interface Order {
    orderId: number;
    userId: number;
    productId: number;
    sellerId: number;
}

export interface Orders extends Optional<Order, 'orderId'> {

}

export class Order extends Model<Order, Orders>
    implements Order {
        orderId!: number;
        userId!: number;
        productId!: number;
        sellerId!: number;

    }
