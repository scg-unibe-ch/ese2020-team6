import { Optional, Model, Sequelize, DataTypes, IntegerDataType } from 'sequelize';

export interface ProductsAttributes {
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
export interface GoodsCreationAttributes extends Optional<ProductsAttributes, 'productId'> { }

export class Products extends Model<ProductsAttributes, GoodsCreationAttributes>
    implements ProductsAttributes {
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
        Products.init({
            productId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            category: {
                type: DataTypes.STRING,
                allowNull: true
            },
            location: {
                type: DataTypes.STRING
            },
            // item or service
            productType: {
                type: DataTypes.STRING
            },
            // sell or rent
            offerType: {
                type: DataTypes.STRING
            },
            picture: {
                type: DataTypes.STRING
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
                allowNull: true
            },
            isAccepted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            accepted: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            userId: {
                type: DataTypes.STRING,
            },
            rejectionMessage: {
                type: DataTypes.STRING,
                defaultValue : null,
                allowNull: false,
            },
            isDeliverable: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            }

        },
            {
                sequelize,
                tableName: 'product'
            }
        );
    }
}
