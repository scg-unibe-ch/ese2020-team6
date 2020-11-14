import { Optional, Model, Sequelize, DataTypes, IntegerDataType, Association } from 'sequelize';
import { Address, AddressAttributes } from './address.model';


export interface ProductsAttributes {
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
export interface GoodsCreationAttributes extends Optional<ProductsAttributes, 'productId'> { }

export class Products extends Model<ProductsAttributes, GoodsCreationAttributes> implements ProductsAttributes {


    public static Address: Association;
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
        Products.init({
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

    public static createAssociations() {
      Products.Address = Products.belongsTo(Address, {
        foreignKey: 'addressId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'address'
      });
    }
}
