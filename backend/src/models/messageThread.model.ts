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

  // check imports

  import { User } from './user.model';
  import { Product } from './product.model';
  import { MessageThreadParticipants } from './messageThreadParticipants.model';
  import { Message } from './message.model';

  export interface MessageThreadAttributes {
    messageThreadId: number;
    productId: number;
    isAccepted: boolean;
  }

  export interface MessageThreadCreationAttributes extends Optional<MessageThreadAttributes, 'messageThreadId'> { }

  export class MessageThread extends Model<MessageThreadAttributes, MessageThreadCreationAttributes> implements MessageThreadAttributes {

    public static associations: {
      message: Association<MessageThread, Message>,
      products: Association<MessageThread, Product>,
      messageThreadParticipants: Association<MessageThread, MessageThreadParticipants>
    };

    messageThreadId!: number;
    productId!: number;
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

        MessageThread.belongsTo(Product, {
          targetKey: 'productId',
          as: 'messagethreads'
        });

        MessageThread.hasMany(MessageThreadParticipants, {
          sourceKey: 'messageThreadId',
          foreignKey: 'messageThreatParticipantId',
          as: 'messagethreads'
        });

        MessageThread.hasMany(Message, {
          foreignKey: 'messageThreadId',
          as: 'messagethreads'
        });
      }
  }
