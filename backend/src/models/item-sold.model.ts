import { Sequelize, Model, DataTypes, Association, Optional } from 'sequelize';
import { Order } from './order.model';
import { Address } from './address.model';

export interface ItemSoldAttributes {
    itemsoldId: number;
    orderId: number;
    paymentMethod: string;
    shippingAddressId: number;
}

export interface ItemSoldCreationAttributes extends Optional<ItemSoldAttributes, 'itemsoldId'> {

}

export class ItemSold extends Model<ItemSoldAttributes, ItemSoldCreationAttributes> implements ItemSoldAttributes {

    public static associations: {
      order: Association<ItemSold, Order>,
      shippingAddress: Association<ItemSold, Address>
    };

    itemsoldId!: number;
    orderId!: number;
    paymentMethod!: string;
    shippingAddressId!: number;

    public static initialize(sequelize: Sequelize) {
        ItemSold.init({
            itemsoldId: {
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
}
