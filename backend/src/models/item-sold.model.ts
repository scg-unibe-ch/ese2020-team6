import { Optional, Model, Sequelize, DataTypes, Association } from 'sequelize';
import { Order } from './order.model';

export interface ItemSoldAttributes {
    itemsoldId: number;
    orderId: number;
    shipping: string;
}

export interface ItemSoldCreationAttributes extends Optional<ItemSoldAttributes, 'itemsoldId'> {

}

export class ItemSold extends Model<ItemSoldAttributes, ItemSoldCreationAttributes> implements ItemSoldAttributes {
    public static Order: Association;
    itemsoldId!: number;
    orderId!: number;
    shipping!: string;

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
