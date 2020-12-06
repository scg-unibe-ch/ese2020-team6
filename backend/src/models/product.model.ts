import { Sequelize, Model, DataTypes, Association, Optional, BelongsToGetAssociationMixin } from 'sequelize';
import { Address } from './address.model';
import { MessageThread } from './messageThread.model';
import { Order } from './order.model';
import { User } from './user.model';
import { IsForRent } from '../interfaces/is-for-rent.interface';


export interface  ProductAttributes {
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
    sellerId: number;
    rejectionMessage: string;
    isDeliverable: boolean;

}
export interface ProductCreationAttributes extends
Optional<ProductAttributes, 'productId' | 'isAccepted' | 'status' | 'rejectionMessage'> { }

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes, IsForRent {
    get purchasedStatus(): string {
      return this.offerType === 'Rent' ? 'Lent' : 'Sold';
    }

    public static associations: {
      orders: Association<Product, Order>;
      address: Association<Product, Address>;
      user: Association<Product, User>;
    };

    public getSeller!: BelongsToGetAssociationMixin<User>;

    productId!: number;
    title!: string;
    description!: string;
    price!: number;
    category!: string;
    addressId!: number;
    productType!: string;
    offerType!: string;
    picture: string;
    subcategory!: string;
    expirationDate!: number;
    status!: string;
    isAccepted!: boolean;
    sellerId!: number;
    rejectionMessage!: string;
    isDeliverable!: boolean;

    public static initialize(sequelize: Sequelize) {
        Product.init({
            productId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            sellerId: {
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
        targetKey: 'userId',
        foreignKey: 'sellerId',
        as: 'seller'
      });

      Product.belongsTo(Address, {
        foreignKey: 'addressId',
        as: 'address'
      });

      Product.hasMany(Order, {
        foreignKey: 'productId',
        as: 'orders'
      });

      Product.hasMany(MessageThread, {
        sourceKey: 'productId',
        foreignKey: 'messageThreadId',
        as: 'productmessagethreads'
      });
    }

    public isForRent: () => boolean = () => this.offerType === 'Rent';
}
