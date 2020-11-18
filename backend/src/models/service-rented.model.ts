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
                type: DataTypes.INTEGER,
                primaryKey: true
            },

            hours: {
                type: DataTypes.INTEGER,
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
      ServiceRented.Order = ServiceRented.belongsTo(Order, {
        foreignKey: 'orderId',
        as: 'order'
      });
    }
}
