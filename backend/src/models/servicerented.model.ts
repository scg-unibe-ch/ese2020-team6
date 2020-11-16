import { Optional, Model, Sequelize, DataTypes, Association } from 'sequelize';
import { Order } from './order.model';

export interface ServiceRentedAttributes {
    orderId: number;
    hours: number;
}

export interface ServiceRentedCreationAttributes extends Optional<ServiceRentedAttributes, 'orderId'> {

}

export class ServiceRented extends Model<ServiceRentedAttributes, ServiceRentedCreationAttributes> implements ServiceRentedAttributes {
    public static Order: Association;
    orderId!: number;
    hours!: number;

    public static initialize(sequelize: Sequelize) {
        ServiceRented.init({
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
                tableName: 'servicesrented'
            }
        );
    }

    public static createAssociations(): void {
      ServiceRented.Order = ServiceRented.hasOne(Order, {
        foreignKey: 'orderId',
        as: 'order'
      });
    }
}
