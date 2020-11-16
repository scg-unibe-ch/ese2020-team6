import { Optional, Model, Sequelize, DataTypes, Association } from 'sequelize';
import { Order } from './order.model';

export interface ProductAttributes {
    productId: number;
    title: string;
    description: string;
    price: number;
    category: string;
    location: string;
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
    productId!: number;
    title!: string;
    description!: string;
    price!: number;
    category!: string;
    location!: string;
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
            location: {
                type: DataTypes.STRING,
                allowNull: true
            },
            // item or service
            productType: {
                type: DataTypes.STRING,
                allowNull: false
            },
            // sell or rent
            offerType: {
                type: DataTypes.STRING,
                allowNull: false
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
                type: DataTypes.NUMBER,
                allowNull: true
            },
            // available, lent, sold
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isAccepted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            userId: {
                type: DataTypes.STRING,
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
                tableName: 'products'
            }
        );
    }

    public static createAssociations(): void {
      Product.Orders = Product.hasMany(Order, {
        foreignKey: 'productId',
        as: 'orders'
      });
    }
}
