import { Optional, Model, Sequelize, DataTypes, IntegerDataType, Association } from 'sequelize';
import { User } from './user.model';

export interface PreferenceAttributes {
    userId: number;
    theme: string;
}
export interface PreferenceCreationAttributes extends Optional<PreferenceAttributes, 'theme'> { }

export class Preference extends Model<PreferenceAttributes, PreferenceCreationAttributes> implements PreferenceAttributes {


    public static User: Association;
    userId!: number;
    theme!: string;

    public static initialize(sequelize: Sequelize) {
        Preference.init({
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            theme: {
                type: DataTypes.ENUM('bright', 'dark'),
                defaultValue: 'bright'
            }
        },
            {
                sequelize,
                tableName: 'preferences'
            }
        );
    }

    public static createAssociations() {
      Preference.User = Preference.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user'
      });
    }
}
