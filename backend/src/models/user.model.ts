import { Optional, Model, Sequelize, DataTypes, IntegerDataType } from 'sequelize';
import { Preference } from './preference.model';

export interface UserAttributes {
    userId: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    phonenumber: number;
    plz: number;
    city: string;
    street: string;
    houseNumber: string;
    gender: string;
    isAdmin: boolean;
    wallet: number;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {


    public static Preference: any;
    userId!: number;
    firstName!: string;
    lastName!: string;
    userName!: string;
    email!: string;
    password!: string;
    phonenumber!: number;
    plz!: number;
    city!: string;
    street!: string;
    houseNumber!: string;
    gender!: string;
    isAdmin!: boolean;
    wallet!: number;

    public static initialize(sequelize: Sequelize) {
        User.init({
            userId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            userName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            phonenumber: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            plz: {
                type: DataTypes.NUMBER,
                allowNull: false
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            street: {
                type: DataTypes.STRING,
                allowNull: false
            },
            houseNumber: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
              type: DataTypes.STRING,
              allowNull: false
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            wallet: {
                type: DataTypes.NUMBER,
                defaultValue: 0
            }
          },
          {
              sequelize,
              tableName: 'users'
          }
        );
    }

    public static createAssociations() {
      User.Preference = User.hasOne(Preference, {
        foreignKey: 'userId',
        as: 'preference'
      });
    }
}
