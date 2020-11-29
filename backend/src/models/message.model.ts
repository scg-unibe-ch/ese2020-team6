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

  //check imports

  import { User } from './user.model';
  import { Product } from './product.model';
  import { ItemSold } from './item-sold.model';
  import { ItemRented } from './item-rented.model';
import { MessageThread } from './messageThread.model';
  
  export interface MessageAttributes {
    messageId: number;
    messageThreadId: number;
    senderId: number;
    body: string; //check
    createdAt: Date;
    readStatus: boolean; 
  }
  
 export interface MessageCreationAttributes extends Optional<MessageAttributes, 'messageId'> { }
  
  export class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {
  
    public static associations: {
      users: Association<Message, User>,
      messageThread: Association<Message, MessageThread>,
  
    };
    //for message thread
    public getProducts!: HasManyGetAssociationsMixin<Product>;
    public addProduct!: HasManyAddAssociationMixin<Product, number>;
    public hasProducts!: HasManyHasAssociationMixin<Product, number>;
    public countProducts!: HasManyCountAssociationsMixin;
    public createProduct!: HasManyCreateAssociationMixin<Product>;
  
    public getUsers!: HasManyGetAssociationsMixin<User>;
    public addUser!: HasManyAddAssociationMixin<User, number>;
    public hasUsers!: HasManyHasAssociationMixin<User, number>;
    public countUsers!: HasManyCountAssociationsMixin;
    public createUser!: HasManyCreateAssociationMixin<User>;
  
    messageId!: number;
    messageThreadId!: number;
    senderId!: number;
    body!: string; //check
    createdAt!: Date;
    readStatus!: boolean; 
  
      public static initialize(sequelize: Sequelize) {
          Message.init({
              messageId: {
                  type: DataTypes.INTEGER,
                  autoIncrement: true,
                  primaryKey: true
              },
                messageThreadId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,    //wrong????
                    primaryKey: true
              },
              senderId: {
                  type: DataTypes.INTEGER,
                  allowNull: false
              },
              body: {
                  type: DataTypes.STRING,
                  allowNull: false
              },
              createdAt: {
                  type: DataTypes.DATE,
                  allowNull: false
              },
              readStatus: {
                  type: DataTypes.BOOLEAN,
                  allowNull: false,
                  defaultValue: false
              }
            },
          
              {
                  sequelize,
                  tableName: 'messages'
              }
          );
      }
  
      public static createAssociations() {
        Message.belongsTo(User, {
          foreignKey: 'userId',
          as: 'messages'
        });

        Message.belongsTo(MessageThread, {
          foreignKey: 'messageThreadId',
          as: 'messages'
        });
      }
  }