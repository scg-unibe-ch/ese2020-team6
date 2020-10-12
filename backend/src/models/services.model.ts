import { Optional, Model, Sequelize, DataTypes, IntegerDataType } from 'sequelize';

export interface ServicesAttributes {
    serviceId: number; // rename
    titel: string;
    description: string;
    servicePrice: number; // rename
    // image?
    category: string;
    subcategory: string;
    expirationDate: number;
    status: string;
    workingStatus: string;

}
export interface ServicesCreationAttributes extends Optional<ServicesAttributes, 'serviceId'> { }

export class Services extends Model<ServicesAttributes, ServicesCreationAttributes> implements ServicesAttributes {
    serviceId!: number; // rename
    titel!: string;
    description!: string;
    servicePrice!: number; // rename
    category!: string;
    subcategory!: string;
    expirationDate!: number;
    status!: string;
    workingStatus!: string;

    public static initialize(sequelize: Sequelize) {
        Services.init({
            serviceId: {
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
            servicePrice: {
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
                tableName: 'services'
            }
        );
    }
}
