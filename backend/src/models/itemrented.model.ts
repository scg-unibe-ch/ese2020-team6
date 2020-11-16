import { Optional, Model, Sequelize, DataTypes, Association } from 'sequelize';
import { Order } from './order.model';

export interface ItemRentedAttributes {
    orderId: number;
    shipping: string;
    hours: number;
}

export interface ItemRentedCreationAttributes extends Optional<ItemRentedAttributes, 'orderId'> {

}

export class ItemRented extends Model<ItemRentedAttributes, ItemRentedCreationAttributes> implements ItemRentedAttributes {
    public static Order: Association;
    orderId!: number;
    shipping!: string;
    hours!: number;

    public static initialize(sequelize: Sequelize) {
        ItemRented.init({
            orderId: {
                type: DataTypes.NUMBER,
                primaryKey: true,
                allowNull: false,
                unique: true
            },
            shipping: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hours: {
                type: DataTypes.NUMBER,
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
      ItemRented.Order = ItemRented.hasOne(Order, {
        foreignKey: 'orderId',
        as: 'order'
      });
    }
}
