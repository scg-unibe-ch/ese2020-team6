import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface ItemsSoldAttributes {
    orderId: number;
    shipping: string;
}

export interface SoldItems extends Optional<ItemsSoldAttributes, 'orderId'> {

}

export class ItemsSold extends Model<ItemsSoldAttributes, SoldItems>
    implements ItemsSoldAttributes {
        orderId!: number;
        shipping!: string;

        public static initialize(sequelize: Sequelize){
            ItemsSold.init({
                orderId:{
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
                    tableName: 'buyitems'
                }
            );
        }

    }
