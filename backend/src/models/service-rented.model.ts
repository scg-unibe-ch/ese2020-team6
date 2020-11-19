import { Sequelize, Model, DataTypes, Association, Optional } from 'sequelize';
import { Order } from './order.model';

export interface ServiceRentedAttributes {
    serviceRentedId: number;
    orderId: number;
    paymentMethod: string;
    hours: number;
}

export interface ServiceRentedCreationAttributes extends Optional<ServiceRentedAttributes, 'serviceRentedId'> {

}

export class ServiceRented extends Model<ServiceRentedAttributes, ServiceRentedCreationAttributes> implements ServiceRentedAttributes {

    public static associations: {
      order: Association<ServiceRented, Order>
    };

    serviceRentedId!: number;
    orderId!: number;
    paymentMethod!: string;
    hours!: number;

    public static initialize(sequelize: Sequelize) {
        ServiceRented.init({
            serviceRentedId: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true
            },
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            paymentMethod: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            hours: {
                type: DataTypes.FLOAT(3, 2),
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
      ServiceRented.belongsTo(Order, {
        foreignKey: 'orderId',
        as: 'order'
      });
    }
}
