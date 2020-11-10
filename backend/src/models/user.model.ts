import { Optional, Model, Sequelize, DataTypes, IntegerDataType } from 'sequelize';

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
    colorScheme: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
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
    colorScheme!: string;

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
            },
            colorScheme: {
                type: DataTypes.STRING,
                defaultValue: 'standard'
            },    

                },
            {
                sequelize,
                tableName: 'users'
            },
        );
    }
}
