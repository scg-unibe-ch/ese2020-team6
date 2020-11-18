import { Optional, Model, Sequelize, DataTypes, IntegerDataType, Association } from 'sequelize';
import { Address, AddressAttributes } from './address.model';
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
export interface ProductCreationAttributes extends Optional<ProductAttributes, 'productId'> { }

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    public static Orders: Association;
    public static Address: Association;
    public static User: Association;
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
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false
            },
            addressId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            // item or service
            productType: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  isIn: [['Item', 'Service']]
                }
            },
            // sell or rent
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
            subcategory: {
                type: DataTypes.STRING,
                allowNull: true
            },
            expirationDate: {
                type: DataTypes.STRING,
                allowNull: true
            },
            // available, lent, sold
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  isIn: [['Available', 'Lent', 'Sold']]
                }
            },
            isAccepted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            rejectionMessage: {
                type: DataTypes.STRING,
                defaultValue : null,
                allowNull: true,
            },
            isDeliverable: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            }

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
      Product.User = Product.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
      });

      Product.Address = Product.belongsTo(Address, {
        foreignKey: 'addressId',
        as: 'address'
      });

      Product.Orders = Product.hasMany(Order, {
        foreignKey: 'productId',
        as: 'orders'
      });
    }
}