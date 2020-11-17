import { Optional, Model, Sequelize, DataTypes, Association } from 'sequelize';
import { Order } from './order.model';

export interface ItemSoldAttributes {
    orderId: number;
    shipping: string;
}

export interface ItemSoldCreationAttributes extends Optional<ItemSoldAttributes, 'orderId'> {

}

export class ItemSold extends Model<ItemSoldAttributes, ItemSoldCreationAttributes> implements ItemSoldAttributes {
    public static Order: Association;
    orderId!: number;
    shipping!: string;

    public static initialize(sequelize: Sequelize) {
        ItemSold.init({
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
    }
}
