import { Optional, Model, Sequelize, DataTypes, Association } from 'sequelize';
import { Order } from './order.model';
import { Address } from './address.model';

export interface ItemRentedAttributes {
    orderId: number;
    shippingAddressId: number;
    hours: number;
}

export interface ItemRentedCreationAttributes extends Optional<ItemRentedAttributes, 'orderId'> {

}

export class ItemRented extends Model<ItemRentedAttributes, ItemRentedCreationAttributes> implements ItemRentedAttributes {
    public static Order: Association;
    public static ShippingAddress: Association;
    orderId!: number;
    shippingAddressId!: number;
    hours!: number;

    public static initialize(sequelize: Sequelize) {
        ItemRented.init({
            orderId: {
                type: DataTypes.INTEGER,
                primaryKey: true
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
      ItemRented.Order = ItemRented.belongsTo(Order, {
        foreignKey: 'orderId',
        as: 'order'
      });

      ItemRented.ShippingAddress = ItemRented.belongsTo(Address, {
        foreignKey: 'shippingAddressId',
        as: 'shippingaddress'
      });
    }
}
