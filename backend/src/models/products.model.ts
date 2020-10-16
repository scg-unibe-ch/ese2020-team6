import { Optional, Model, Sequelize, DataTypes, IntegerDataType } from 'sequelize';

export interface ProductsAttributes { // maybe rename
    productId: number; // rename
    titel: string;
    description: string;
    productPrice: number; // rename
    category: string;
    location: string;
    productType: string;
    offerType: string;
    picture: string;
    subcategory: string;
    expirationDate: number;
    status: string;
    workingStatus: string;

}
export interface GoodsCreationAttributes extends Optional<ProductsAttributes, 'productId'> { }

export class Products extends Model<ProductsAttributes, GoodsCreationAttributes> implements ProductsAttributes {
    productId!: number; // rename
    titel!: string;
    description!: string;
    productPrice!: number; // rename
    category!: string;
    location!: string;
    productType!: string;
    offerType!: string;
    picture!: string;
    subcategory!: string;
    expirationDate!: number;
    status!: string;
    workingStatus!: string;

    public static initialize(sequelize: Sequelize) {
        Products.init({
            productId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            titel: {
                type: DataTypes.STRING,
                allowNull: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true
            },
            productPrice: {
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

        },
            {
                sequelize,
                tableName: 'product'
            }
        );
    }
}
