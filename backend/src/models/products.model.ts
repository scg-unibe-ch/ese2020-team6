import { Optional, Model, Sequelize, DataTypes, IntegerDataType } from 'sequelize';

export interface ProductsAttributes { // maybe rename
    productId: number; // rename
    titel: string;
    description: string;
    productPrice: number; // rename
    // image?
    category: string;
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
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            productPrice: {
                type: DataTypes.INTEGER,
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
            expirationDate: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            workingStatus: {
                type: DataTypes.STRING,
                allowNull: false
            },

        },
            {
                sequelize,
                tableName: 'product'
            }
        );
    }
}
