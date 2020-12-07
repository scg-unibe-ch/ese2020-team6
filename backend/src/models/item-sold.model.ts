import { Sequelize, DataTypes, Association, Optional, BelongsToGetAssociationMixin } from 'sequelize';
import { Order } from './order.model';
import { Address } from './address.model';
import { OrderSubType, OrderSubTypeAttributes } from '../interfaces/order-sub-type.interface';

export interface ItemSoldAttributes extends OrderSubTypeAttributes {
    itemSoldId: number;
    shippingAddressId: number;
}

export interface ItemSoldCreationAttributes extends Optional<ItemSoldAttributes, 'itemSoldId'> {

}

export class ItemSold extends OrderSubType<ItemSoldAttributes, ItemSoldCreationAttributes>
implements ItemSoldAttributes {

    public static associations: {
      order: Association<ItemSold, Order>,
      shippingAddress: Association<ItemSold, Address>
    };

    public getOrder!: BelongsToGetAssociationMixin<Order>;
    public getShippingAddress!: BelongsToGetAssociationMixin<Address>;

    itemSoldId!: number;
    orderId!: number;
    paymentMethod!: string;
    shippingAddressId!: number;

    public static initialize(sequelize: Sequelize) {
        ItemSold.init({
            itemSoldId: {
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
            shippingAddressId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
            {
                sequelize,
                tableName: 'itemssold'
            }
        );
    }

    public static createAssociations(): void {
      ItemSold.belongsTo(Order, {
        foreignKey: 'orderId',
        as: 'order'
      });

      ItemSold.belongsTo(Address, {
        targetKey: 'addressId',
        foreignKey: 'shippingAddressId',
        as: 'shippingAddress'
      });
    }
    public getHours: () => number = () => 1;
    public getSubTypeName: () => string = () => 'ItemSold';
}
