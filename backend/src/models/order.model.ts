import {
  Sequelize,
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional
} from 'sequelize';
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

    public static associations: {
      buyer: Association<Order, User>,
      seller: Association<Order, User>,
      product: Association<Order, Product>,
      itemsSold: Association<Order, ItemSold>,
      itemsRented: Association<Order, ItemRented>,
      servicesRented: Association<Order, ServiceRented>
    };

    public getItemsSold!: HasManyGetAssociationsMixin<ItemSold>;
    public addItemSold!: HasManyAddAssociationMixin<ItemSold, number>;
    public hasItemsSold!: HasManyHasAssociationMixin<ItemSold, number>;
    public countItemsSold!: HasManyCountAssociationsMixin;
    public createItemSold!: HasManyCreateAssociationMixin<ItemSold>;

    public getItemsRented!: HasManyGetAssociationsMixin<ItemRented>;
    public addItemRented!: HasManyAddAssociationMixin<ItemRented, number>;
    public hasItemsRented!: HasManyHasAssociationMixin<ItemRented, number>;
    public countItemsRented!: HasManyCountAssociationsMixin;
    public createItemRented!: HasManyCreateAssociationMixin<ItemRented>;

    public getServicesRented!: HasManyGetAssociationsMixin<ServiceRented>;
    public addServiceRented!: HasManyAddAssociationMixin<ServiceRented, number>;
    public hasServicesRented!: HasManyHasAssociationMixin<ServiceRented, number>;
    public countServicesRented!: HasManyCountAssociationsMixin;
    public createServiceRented!: HasManyCreateAssociationMixin<ServiceRented>;

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
