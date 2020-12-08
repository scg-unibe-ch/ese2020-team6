import {
    Sequelize,
    Model,
    DataTypes,
    Association,
    Optional,
    BelongsToGetAssociationMixin
  } from 'sequelize';

  import { User } from './user.model';
  import { MessageThread } from './messageThread.model';

  export interface MessageThreadParticipantsAttributes {
    messageThreadParticipantId: number;
    messageThreadId: number;
    participantId: number;
    isSeller: boolean;
  }

  export interface MessageThreadParticipantsCreationAttributes extends Optional<MessageThreadParticipantsAttributes, 'messageThreadParticipantId'> { }

  export class MessageThreadParticipants extends Model<MessageThreadParticipantsAttributes, MessageThreadParticipantsCreationAttributes>
    implements MessageThreadParticipantsAttributes {

    public static associations: {
      user: Association<MessageThreadParticipants, User>,
      thread: Association<MessageThreadParticipants, MessageThread>,
    };

    public getThread!: BelongsToGetAssociationMixin<MessageThread>;
    public getUser!: BelongsToGetAssociationMixin<User>;

    messageThreadParticipantId!: number;
    messageThreadId!: number;
    participantId!: number;
    isSeller!: boolean;

      public static initialize(sequelize: Sequelize) {
          MessageThreadParticipants.init({
              messageThreadParticipantId: {
                  type: DataTypes.INTEGER,
                  primaryKey: true,
                  autoIncrement: true
              },
              messageThreadId: {
                  type: DataTypes.INTEGER,
                  allowNull: false
              },
              participantId: {
                  type: DataTypes.INTEGER,
                  allowNull: false
              },
              isSeller: {
                  type: DataTypes.BOOLEAN,
                  allowNull: false,
                  defaultValue: false
              }
          },
              {
                  sequelize,
                  tableName: 'messagethreadparticipants'
              }
          );
      }
      public static createAssociations() {

         MessageThreadParticipants.belongsTo(User, {
           targetKey: 'userId',
           foreignKey: 'participantId',
           as: 'user'
         });

         MessageThreadParticipants.belongsTo(MessageThread, {
          foreignKey: 'messageThreadId',
          as: 'thread'
        });
    }}
