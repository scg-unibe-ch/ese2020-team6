import { Sequelize, Model, DataTypes, Association, Optional, BelongsToGetAssociationMixin } from 'sequelize';
import { Order } from './order.model';
import { OrderSubType, OrderSubTypeAttributes } from '../interfaces/order-sub-type.interface';

export interface ServiceRentedAttributes extends OrderSubTypeAttributes {
    serviceRentedId: number;
    hours: number;
}

export interface ServiceRentedCreationAttributes extends Optional<ServiceRentedAttributes, 'serviceRentedId'> {

}

export class ServiceRented extends Model<ServiceRentedAttributes, ServiceRentedCreationAttributes>
implements ServiceRentedAttributes, OrderSubType {

    public static associations: {
      order: Association<ServiceRented, Order>
    };

    public getOrder!: BelongsToGetAssociationMixin<Order>;

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
    public isForRent: () => boolean = () => false;
    public getHours: () => number = () => this.hours;
}
