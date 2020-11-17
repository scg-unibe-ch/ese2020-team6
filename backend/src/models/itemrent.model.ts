import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface ItemsRentAttributes {
    orderId: number;
    shipping: string;
    hours: number;
}

export interface ItemsRent extends Optional<ItemsRentAttributes, 'orderId'> {

}

export class ItemsRent extends Model<ItemsRentAttributes, ItemsRent>
    implements ItemsRentAttributes {
        orderId!: number;
        shipping!: string;
        hours!: number;

        public static initialize(sequelize: Sequelize) {
            ItemsRent.init({
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
                    tableName: 'itemsrent'
                }
            );
        }

    }
