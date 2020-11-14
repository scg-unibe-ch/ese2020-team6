import { Optional, Model, Sequelize, DataTypes, IntegerDataType, Association } from 'sequelize';
import { Preference } from './preference.model';
import { Address, AddressAttributes } from './address.model';

export interface UserAttributes {
    userId: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    phonenumber: number;
    addressId: number;
    gender: string;
    isAdmin: boolean;
    wallet: number;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {


    public static Preference: Association;
    public static Address: Association;
    userId!: number;
    firstName!: string;
    lastName!: string;
    userName!: string;
    email!: string;
    password!: string;
    phonenumber!: number;
    addressId!: number;
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
                type: DataTypes.INTEGER,
                allowNull: false
            },
            addressId: {
                type: DataTypes.INTEGER,
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
                type: DataTypes.INTEGER,
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

      User.Address = User.belongsTo(Address, {
        foreignKey: 'addressId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        as: 'address'
      });
    }
}
