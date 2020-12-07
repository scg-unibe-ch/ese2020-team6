import {
    Sequelize,
    Model,
    DataTypes,
    Association,
    Optional,
    HasManyGetAssociationsMixin,
    HasManyCreateAssociationMixin
  } from 'sequelize';

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
      messages: Association<MessageThread, Message>,
      product: Association<MessageThread, Product>,
      participants: Association<MessageThread, MessageThreadParticipants>
    };

    public getParticipants!: HasManyGetAssociationsMixin<MessageThreadParticipants>;
    public createParticipant!: HasManyCreateAssociationMixin<MessageThreadParticipants>;
    public createMessage!: HasManyCreateAssociationMixin<Message>;

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
          foreignKey: 'productId',
          as: 'product'
        });

        MessageThread.hasMany(MessageThreadParticipants, {
          foreignKey: 'messageThreadId',
          as: 'participants'
        });

        MessageThread.hasMany(Message, {
          foreignKey: 'messageThreadId',
          as: 'messages'
        });
      }
  }
