import { Optional, Model, Sequelize, DataTypes, Association } from 'sequelize';
import { Order } from './order.model';
import { Address } from './address.model';

export interface ItemSoldAttributes {
    itemsoldId: number;
    orderId: number;
    shippingAddressId: number;
}

export interface ItemSoldCreationAttributes extends Optional<ItemSoldAttributes, 'itemsoldId'> {

}

export class ItemSold extends Model<ItemSoldAttributes, ItemSoldCreationAttributes> implements ItemSoldAttributes {
    public static Order: Association;
    public static ShippingAddress: Association;
    itemsoldId!: number;
    orderId!: number;
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
            shippingAddressId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

        },
            {
                sequelize,
                tableName: 'itemssold'
            }
        );
    }

    public static createAssociations(): void {
      ItemSold.Order = ItemSold.belongsTo(Order, {
        foreignKey: 'orderId',
        as: 'order'
      });

      ItemSold.ShippingAddress = ItemSold.belongsTo(Address, {
        foreignKey: 'shippingAddressId',
        as: 'shippingaddress'
      });
    }
}
