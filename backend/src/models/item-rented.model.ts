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
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            shipping: {
                type: DataTypes.STRING,
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
    }
}
