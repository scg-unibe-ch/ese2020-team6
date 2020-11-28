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
  
  export interface MessageThreadAttributes {
    messageThreadId: number;
    productId: number;
    isAccepted: boolean; 
  }
  
  export interface MessageThreadCreationAttributes extends Optional<MessageThreadAttributes, 'messageThreadId'> { }
  
  export class MessageThread extends Model<MessageThreadAttributes, MessageThreadCreationAttributes> implements MessageThreadAttributes {
  
    public static associations: {
      users: Association<Address, User>,
      products: Association<Address, Product>,
      //messageThread
    };
    //for message thread
  
    messageThreadId!: number;
    productId!:number;
    isAccepted!: boolean; 
  
      public static initialize(sequelize: Sequelize) {
          MessageThread.init({
                messageThreadId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
              },
              productId: {
                  type: DataTypes.INTEGER,
                  allowNull: false
              },
              isAccepted: {
                  type: DataTypes.BOOLEAN,
                  allowNull: false,
                  defaultValue: false
              },
          },
          
              {
                  sequelize,
                  tableName: 'messagethreads'
              }
          );
      }
  
      public static createAssociations() {
        MessageThread.hasMany(MessageThreadParticipant, {   //messageThreadParticipants
          sourceKey: 'messageThreadId',
          foreignKey: 'messageThreadParticipantId',
          as: 'messagethreads'
        });
      }
  }
  