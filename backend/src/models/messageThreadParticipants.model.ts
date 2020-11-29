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
  
  export interface MessageThreadParticipantsAttributes {
    messageThreadId: number;
    participantId: number;
  }
  
  export interface MessageThreadParticipantsCreationAttributes extends Optional<MessageThreadParticipantsAttributes, 'messageThreadId'> { }
  
  export class MessageThreadParticipants extends Model<MessageThreadParticipantsAttributes, MessageThreadParticipantsCreationAttributes> implements MessageThreadParticipantsAttributes {
  
    public static associations: {
      users: Association<MessageThreadParticipants, User>,
      messageThread: Association<MessageThreadParticipants, MessageThread>,
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
  
    messageThreadId!: number;
    participantId!:number;
  
      public static initialize(sequelize: Sequelize) {
          MessageThreadParticipants.init({
                messageThreadId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,    //wrong???
                    primaryKey: true
              },
              participantId: {
                  type: DataTypes.INTEGER,
                  allowNull: false
              },
          },
              {
                  sequelize,
                  tableName: 'messagethreadparticipants'
              }
          );
      }
      public static createAssociations() {
     
         MessageThreadParticipants.belongsTo(User, {
           targetKey: 'participantId',
           foreignKey: 'userId',
           as: 'messagethreadparticipants'
         });

         MessageThreadParticipants.belongsTo(MessageThread, {
          foreignKey: 'messageThreadId',
          as: 'messagethreadparticipants'
        });
       }
    }