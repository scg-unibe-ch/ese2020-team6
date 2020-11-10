import { Optional, Model, Sequelize, DataTypes, IntegerDataType } from 'sequelize';
import { User } from './user.model';

export interface PreferenceAttributes {
    userId: number;
    theme: string;
}
export interface PreferenceCreationAttributes extends Optional<PreferenceAttributes, 'theme'> { }

export class Preference extends Model<PreferenceAttributes, PreferenceCreationAttributes> implements PreferenceAttributes {
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
      Preference.belongsTo(User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
}
