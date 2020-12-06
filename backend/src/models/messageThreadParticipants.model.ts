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
    messageThreadId: number;
    participantId: number;
  }

  export interface MessageThreadParticipantsCreationAttributes extends Optional<MessageThreadParticipantsAttributes, 'messageThreadId'> { }

  export class MessageThreadParticipants extends Model<MessageThreadParticipantsAttributes, MessageThreadParticipantsCreationAttributes>
    implements MessageThreadParticipantsAttributes {

    public static associations: {
      users: Association<MessageThreadParticipants, User>,
      messageThread: Association<MessageThreadParticipants, MessageThread>,
    };

    public getMessageThread!: BelongsToGetAssociationMixin<MessageThread>;

    messageThreadId!: number;
    participantId!: number;

      public static initialize(sequelize: Sequelize) {
          MessageThreadParticipants.init({
                messageThreadId: {
                    type: DataTypes.INTEGER,
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
           targetKey: 'userId',
           foreignKey: 'userId',
           as: 'messagethreadparticipantids'
         });

         MessageThreadParticipants.belongsTo(MessageThread, {
          foreignKey: 'messageThreadId',
          as: 'messagethreadparticipants'
        });
    }}
