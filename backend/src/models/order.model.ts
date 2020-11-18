import { Optional, Model, Sequelize, DataTypes, Association } from 'sequelize';
import { User } from './user.model';
import { Product } from './product.model';
import { ItemSold } from './item-sold.model';
import { ItemRented } from './item-rented.model';
import { ServiceRented } from './service-rented.model';

export interface OrderAttributes {
    orderId: number;
    buyerId: number;
    productId: number;
    sellerId: number;
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, 'orderId'> {}

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {

    public static Buyer: Association;
    public static Seller: Association;
    public static Product: Association;
    public static ItemsSold: Association;
    public static ItemsRented: Association;
    public static ServicesRented: Association;
    public static sequelize: Sequelize;
    orderId!: number;
    buyerId!: number;
    productId!: number;
    sellerId!: number;

    public static initialize(sequelize: Sequelize) {
        Order.init({
            orderId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            buyerId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            productId: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            sellerId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
            {
                sequelize,
                tableName: 'orders'
            }
        );

        this.sequelize = sequelize;
    }

    public static createAssociations(): void {
      Order.Buyer = Order.belongsTo(User, {
        foreignKey: 'buyerId',
        as: 'buyer'
      });

      Order.Seller = Order.belongsTo(User, {
        foreignKey: 'sellerId',
        as: 'seller'
      });

      Order.Product = Order.belongsTo(Product, {
        foreignKey: 'productId',
        as: 'product'
      });

      Order.ItemsSold = Order.hasMany(ItemSold, {
        foreignKey: 'orderId',
        as: 'itemssold'
      });

      Order.ItemsRented = Order.hasMany(ItemRented, {
        foreignKey: 'orderId',
        as: 'itemsrented'
      });

      Order.ServicesRented = Order.hasMany(ServiceRented, {
        foreignKey: 'orderId',
        as: 'servicesrented'
      });
    }

}
