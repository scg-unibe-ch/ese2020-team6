import { Sequelize, Model, DataTypes, Association, Optional,
  BelongsToGetAssociationMixin, HasManyGetAssociationsMixin } from 'sequelize';
import { User } from './user.model';
import { Product } from './product.model';
import { ItemSold } from './item-sold.model';
import { ItemRented } from './item-rented.model';
import { ServiceRented } from './service-rented.model';
import { Associations } from '../classes/associations.class';

export interface OrderAttributes {
    orderId: number;
    buyerId: number;
    productId: number;
    sellerId: number;
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, 'orderId'> {}

export class Order extends Associations<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {

    public static associations: {
      buyer: Association<Order, User>,
      seller: Association<Order, User>,
      product: Association<Order, Product>,
      itemsSold: Association<Order, ItemSold>,
      itemsRented: Association<Order, ItemRented>,
      servicesRented: Association<Order, ServiceRented>
    };

    public getProduct!: BelongsToGetAssociationMixin<Product>;
    public getSeller!: BelongsToGetAssociationMixin<User>;
    public getBuyer!: BelongsToGetAssociationMixin<User>;
    public getItemsSold!: HasManyGetAssociationsMixin<ItemSold>;
    public getItemsRented!: HasManyGetAssociationsMixin<ItemRented>;
    public getServicesRented!: HasManyGetAssociationsMixin<ServiceRented>;

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
    }

    public static createAssociations(): void {
      Order.belongsTo(User, {
        targetKey: 'userId',
        foreignKey: 'buyerId',
        as: 'buyer'
      });

      Order.belongsTo(User, {
        targetKey: 'userId',
        foreignKey: 'sellerId',
        as: 'seller'
      });

      Order.belongsTo(Product, {
        foreignKey: 'productId',
        as: 'product'
      });

      Order.hasMany(ItemSold, {
        foreignKey: 'orderId',
        as: 'itemsSold'
      });

      Order.hasMany(ItemRented, {
        foreignKey: 'orderId',
        as: 'itemsRented'
      });

      Order.hasMany(ServiceRented, {
        foreignKey: 'orderId',
        as: 'servicesRented'
      });
    }

}
