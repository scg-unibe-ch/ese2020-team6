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
}
