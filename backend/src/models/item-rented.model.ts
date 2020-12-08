import { Sequelize, DataTypes, Association, Optional, BelongsToGetAssociationMixin } from 'sequelize';
import { Order } from './order.model';
import { Address } from './address.model';
import { OrderSubType, OrderSubTypeAttributes } from '../interfaces/order-sub-type.interface';

export interface ItemRentedAttributes extends OrderSubTypeAttributes {
    itemRentedId: number;
    shippingAddressId: number;
    hours: number;
}

export interface ItemRentedCreationAttributes extends Optional<ItemRentedAttributes, 'itemRentedId'> {}

export class ItemRented extends OrderSubType<ItemRentedAttributes, ItemRentedCreationAttributes>
implements ItemRentedAttributes {

    public static associations: {
      order: Association<ItemRented, Order>,
      shippingAddress: Association<ItemRented, Address>
    };

    public getOrder!: BelongsToGetAssociationMixin<Order>;
    public getShippingAddress!: BelongsToGetAssociationMixin<Address>;

    itemRentedId!: number;
    orderId!: number;
    paymentMethod!: string;
    shippingAddressId!: number;
    hours!: number;

    public static initialize(sequelize: Sequelize) {
        ItemRented.init({
            itemRentedId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            paymentMethod: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            shippingAddressId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            hours: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

        },
            {
                sequelize,
                tableName: 'itemsrented'
            }
        );
    }

    public static createAssociations(): void {
      ItemRented.belongsTo(Order, {
        foreignKey: 'orderId',
        as: 'order'
      });

      ItemRented.belongsTo(Address, {
        foreignKey: 'shippingAddressId',
        as: 'shippingAddress'
      });
    }
    public getHours: () => number = () => this.hours;
    public getSubTypeName: () => string = () => 'ItemRented';
}
