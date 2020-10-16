import { Optional, Model, Sequelize, DataTypes, IntegerDataType } from 'sequelize';

export interface ProductsAttributes { // maybe rename
    productId: number; // rename
    title: string;
    description: string;
    price: number; // rename
    category: string;
    location: string;
    productType: string;
    offerType: string;
    picture: string;
    subcategory: string;
    expirationDate: number;
    status: string;
    workingStatus: string;
    userId: number;

}
export interface GoodsCreationAttributes extends Optional<ProductsAttributes, 'productId'> { }

export class Products extends Model<ProductsAttributes, GoodsCreationAttributes> implements ProductsAttributes {
    productId!: number; // rename
    title!: string;
    description!: string;
    price!: number; // rename
    category!: string;
    location!: string;
    productType!: string;
    offerType!: string;
    picture!: string;
    subcategory!: string;
    expirationDate!: number;
    status!: string;
    workingStatus!: string;
    userId!: number;

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
            productType: {
                type: DataTypes.STRING
            },
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
            status: {
                type: DataTypes.STRING,
                allowNull: true
            },
            workingStatus: {
                type: DataTypes.STRING,
                allowNull: true
            },
            userId: {
                type: DataTypes.STRING,
            }

        },
            {
                sequelize,
                tableName: 'product'
            }
        );
    }
}
