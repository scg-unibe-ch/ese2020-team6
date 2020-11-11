import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface OrdersAttributes {
    orderId: number;
    userId: number;
    productId: number;
    sellerId: number;
}

export interface BuyOrdersAttributes extends Optional<OrdersAttributes, 'orderId'> {

}

export class Orders extends Model<OrdersAttributes, BuyOrdersAttributes>
    implements OrdersAttributes {
        orderId!: number;
        userId!: number;
        productId!: number;
        sellerId!: number;

        public static initialize(sequelize: Sequelize){
            Orders.init({
                orderId:{
                    type: DataTypes.NUMBER,
                    primaryKey: true,
                    allowNull: false,
                    unique: true
                },
                userId: {
                    type: DataTypes.NUMBER,
                    allowNull: false,
                },
                productId: {
                    type: DataTypes.NUMBER,
                    allowNull: false,
                },
                sellerId: {
                    type: DataTypes.NUMBER,
                    allowNull: false
                }
            },
                {
                    sequelize,
                    tableName: 'orders'
                }
            );
        }

    }
