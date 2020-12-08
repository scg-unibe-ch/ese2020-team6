import {
  Sequelize,
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional
} from 'sequelize';
import { Order } from './order.model';
import { Product } from './product.model';
import { Preference } from './preference.model';
import { Address } from './address.model';
import { CutUser } from '../interfaces/cut-user.interface';
import { Associations } from '../interfaces/associations.interface';
import { Message } from './message.model';
import { MessageThreadParticipants } from './messageThreadParticipants.model';

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
    picture: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'userId'> { }

export class User extends Associations<UserAttributes, UserCreationAttributes> implements UserAttributes {

    public static associations: {
      purchases: Association<User, Order>,
      sold: Association<User, Order>,
      products: Association<User, Product>,
      preference: Association<User, Preference>,
      address: Association<User, Address>,
      messages: Association<User, Message>,
      threads: Association<User, MessageThreadParticipants>
    };

    public getOrdersSold!: HasManyGetAssociationsMixin<Order>;
    public addOrderSold!: HasManyAddAssociationMixin<Order, number>;
    public hasOrdersSold!: HasManyHasAssociationMixin<Order, number>;
    public countOrdersSold!: HasManyCountAssociationsMixin;
    public createOrderSold!: HasManyCreateAssociationMixin<Order>;

    public getOrdersPurchased!: HasManyGetAssociationsMixin<Order>;
    public addOrderPurchased!: HasManyAddAssociationMixin<Order, number>;
    public hasOrdersPurchased!: HasManyHasAssociationMixin<Order, number>;
    public countOrdersPurchased!: HasManyCountAssociationsMixin;
    public createOrderPurchased!: HasManyCreateAssociationMixin<Order>;

    public getProducts!: HasManyGetAssociationsMixin<Order>;
    public addProduct!: HasManyAddAssociationMixin<Order, number>;
    public hasProducts!: HasManyHasAssociationMixin<Order, number>;
    public countProducts!: HasManyCountAssociationsMixin;
    public createProduct!: HasManyCreateAssociationMixin<Order>;

    public getMessages!: HasManyGetAssociationsMixin<Message>;
    public getThreads!: HasManyGetAssociationsMixin<MessageThreadParticipants>;

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
    picture: string;

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
                defaultValue: false,
                allowNull: false
            },
            picture: {
              type: DataTypes.STRING,
              allowNull: true
            },
            wallet: {
                type: DataTypes.FLOAT(5, 2),
                defaultValue: 100,
                allowNull: false,
                validate: {
                  isGreaterThanZero(value: number) {
                    if (value < 0) {
                      throw new Error('Your budget is too low.');
                    }
                  }
                }
            }
          },
          {
              sequelize,
              tableName: 'users'
          }
        );
    }

    public static createAssociations(): void {
      User.hasOne(Preference, {
        foreignKey: 'userId',
        as: 'preference'
      });

      User.belongsTo(Address, {
        foreignKey: 'addressId',
        as: 'address'
      });

      User.hasMany(Product, {
        sourceKey: 'userId',
        foreignKey: 'sellerId',
        as: 'products'
      });

      User.hasMany(Order, {
        foreignKey: 'buyerId',
        as: 'purchases'
      });

      User.hasMany(Order, {
        foreignKey: 'sellerId',
        as: 'sold'
      });

      User.hasMany(Message, {
        foreignKey: 'senderId',
        as: 'messages'
      });

      User.hasMany(MessageThreadParticipants, {
        foreignKey: 'participantId',
        as: 'threads'
      });
    }

    /*
      Removes all information about a user, except for userName, email and userId.
    */
    public cutUserInformation(): CutUser {
      return {
        userName: this.userName,
        email: this.email,
        userId: this.userId
      };
    }
}
