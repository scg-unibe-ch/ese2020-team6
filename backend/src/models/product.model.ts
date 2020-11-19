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
  Optional } from 'sequelize';
import { Address } from './address.model';
import { Order } from './order.model';
import { User } from './user.model';


export interface ProductAttributes {
    productId: number;
    title: string;
    description: string;
    price: number;
    category: string;
    addressId: number;
    productType: string;
    offerType: string;
    picture: string;
    subcategory: string;
    expirationDate: number;
    status: string;
    isAccepted: boolean;
    userId: number;
    rejectionMessage: string;
    isDeliverable: boolean;

}
export interface ProductCreationAttributes extends
Optional<ProductAttributes, 'productId' | 'isAccepted' | 'status' | 'rejectionMessage'> { }

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {

    public static associations: {
      orders: Association<Product, Order>;
      address: Association<Product, Address>;
      user: Association<Product, User>;
    };

    public getOrders!: HasManyGetAssociationsMixin<Order>;
    public addOrder!: HasManyAddAssociationMixin<Order, number>;
    public hasOrders!: HasManyHasAssociationMixin<Order, number>;
    public countOrders!: HasManyCountAssociationsMixin;
    public createOrder!: HasManyCreateAssociationMixin<Order>;

    productId!: number;
    title!: string;
    description!: string;
    price!: number;
    category!: string;
    addressId!: number;
    productType!: string;
    offerType!: string;
    picture!: string;
    subcategory!: string;
    expirationDate!: number;
    status!: string;
    isAccepted!: boolean;
    userId!: number;
    rejectionMessage!: string;
    isDeliverable!: boolean;

    public static initialize(sequelize: Sequelize) {
        Product.init({
            productId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.FLOAT(5, 2),
                allowNull: false
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false
            },
            subcategory: {
                type: DataTypes.STRING,
                allowNull: false
            },
            addressId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            productType: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  isIn: [['Item', 'Service']]
                }
            },
            offerType: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  isIn: [['Sell', 'Rent']]
                }
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: true
            },
            expirationDate: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isDeliverable: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'Available',
                validate: {
                  isIn: [['Available', 'Lent', 'Sold']]
                }
            },
            isAccepted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            rejectionMessage: {
                type: DataTypes.STRING,
                defaultValue : null,
                allowNull: true,
            },

        },
            {
                sequelize,
                tableName: 'products',
                validate: {
                  productTypeAndOfferType() {
                    if (this.productType === 'Service' && this.offerType === 'Sell') {
                      throw new Error('Service cannot be sold! Cannot insert product type Service with offer type Sell!');
                    }
                  }
                }
            }
        );
    }

    public static createAssociations(): void {
      Product.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
      });

      Product.belongsTo(Address, {
        foreignKey: 'addressId',
        as: 'address'
      });

      Product.hasMany(Order, {
        foreignKey: 'productId',
        as: 'orders'
      });
    }
}
