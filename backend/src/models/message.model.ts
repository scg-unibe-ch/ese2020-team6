import {
    Sequelize,
    Model,
    DataTypes,
    Association,
    Optional,
    Transaction
  } from 'sequelize';


  import { User } from './user.model';
  import { MessageThread } from './messageThread.model';

  export interface MessageAttributes {
    messageId: number;
    messageThreadId: number;
    senderId: number;
    body: string;
    readStatus: boolean;
  }

 export interface MessageCreationAttributes extends Optional<MessageAttributes, 'messageId'> { }

  export class Message extends Model<MessageAttributes, MessageCreationAttributes> implements MessageAttributes {

    public static associations: {
      sender: Association<Message, User>,
      thread: Association<Message, MessageThread>,
    };

    messageId!: number;
    messageThreadId!: number;
    senderId!: number;
    body!: string;
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
              },
              senderId: {
                  type: DataTypes.INTEGER,
                  allowNull: false
              },
              body: {
                  type: DataTypes.STRING,
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
          foreignKey: 'senderId',
          targetKey: 'userId',
          as: 'sender'
        });

        Message.belongsTo(MessageThread, {
          foreignKey: 'messageThreadId',
          as: 'thread'
        });
      }

      public setToRead(transaction?: Transaction): Promise<void> {
        return this.update({ readStatus: true }, { transaction: transaction })
        .then(() => Promise.resolve());
      }
  }
