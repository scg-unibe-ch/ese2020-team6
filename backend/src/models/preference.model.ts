import { Sequelize, Model, DataTypes, Association, Optional } from 'sequelize';
import { User } from './user.model';

export interface PreferenceAttributes {
    userId: number;
    theme: string;
}
export interface PreferenceCreationAttributes extends Optional<PreferenceAttributes, 'theme'> { }

export class Preference extends Model<PreferenceAttributes, PreferenceCreationAttributes> implements PreferenceAttributes {

    public static associations: {
      user: Association<Preference, User>
    };

    userId!: number;
    theme!: string;

    public static initialize(sequelize: Sequelize) {
        Preference.init({
            userId: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            theme: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                  isIn: [['bright', 'dark']]
                },
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
        as: 'user'
      });
    }
}
