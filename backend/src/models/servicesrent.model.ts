import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface ServicesRentAttributes {
    orderId: number;
    hours: number;
}

export interface ServicesRent extends Optional<ServicesRentAttributes, 'orderId'> {

}

export class ServicesRent extends Model<ServicesRentAttributes, ServicesRent>
    implements ServicesRentAttributes {
        orderId!: number;
        hours!: number;

        public static initialize(sequelize: Sequelize) {
            ServicesRent.init({
                orderId: {
                    type: DataTypes.NUMBER,
                    primaryKey: true,
                    allowNull: false,
                    unique: true
                },
                hours: {
                    type: DataTypes.NUMBER,
                    allowNull: false
                },

            },
                {
                    sequelize,
                    tableName: 'servicesrent'
                }
            );
        }

    }
