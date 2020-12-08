import {
    Sequelize,
    Model,
    DataTypes,
    Association,
    Optional,
    HasManyGetAssociationsMixin,
    HasManyCreateAssociationMixin,
    Transaction,
    BelongsToGetAssociationMixin
  } from 'sequelize';

  import { Product } from './product.model';
  import { MessageThreadParticipants } from './messageThreadParticipants.model';
  import { Message } from './message.model';
import { User } from './user.model';
import { UserDoesNotBelongToThreadError } from '../errors/user-does-not-belong-to-thread.error';
import { Count } from '../interfaces/count.interface';

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
    public getProduct!: BelongsToGetAssociationMixin<Product>;
    public getMessages!: HasManyGetAssociationsMixin<Message>;

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

    public getUnreadCount(senderId: number): Promise<Count<MessageThread>> {
      return this.getMessages().then((messages: Array<Message>) => {
        let count = 0;
        messages.forEach((message: Message) => {
          if (message.senderId !== senderId && !message.readStatus) {  count++; }
        });
        return Promise.resolve(new Count(count, this));
      });
    }

    public setToRead(participantId: number): Promise<MessageThread> {
      return this.getMessages()
      .then((messages: Array<Message>) => Promise.all(
        messages.map((message: Message) => {
          if (message.senderId !== participantId) {
            return message.setToRead();
          } else {
            return Promise.resolve();
          }
        })
      )).then(() => Promise.resolve(this));
    }

    public insert(body: string, sender: User, transaction: Transaction): Promise<Message> {
      return this.updateIsAccepted(sender, transaction)
      .then(() => this.createMessage({
        body: body, senderId: sender.userId, readStatus: false
      }, { transaction: transaction }));
    }

    private updateIsAccepted(sender: User, transaction: Transaction): Promise<void> {
      if (this.isAccepted) { return Promise.resolve(); }
      return this.getProduct().then((product: Product) => product.getSeller())
      .then((seller: User) => {
        if (this.isSenderSeller(sender, seller)) {
          return this.setAccepted(transaction);
        } else { return Promise.resolve(); }
      });
    }

    private isSenderSeller(sender: User, seller: User): boolean {
      return sender.userId === seller.userId;
    }

    private setAccepted(transaction: Transaction): Promise<void> {
      return this.update({ isAccepted: true}, { transaction: transaction })
      .then(() => Promise.resolve());
    }

    public isParticipant(user: User): Promise<void> {
      return this.getParticipants().then((participants: Array<MessageThreadParticipants>) => {
        return Promise.all(participants.map((participant: MessageThreadParticipants) => {
          return participant.getUser();
        }));
      }).then((participants: Array<User>) => {
        const userCheck = participants.map((participant: User) => {
            return user.userId === participant.userId;
        }).includes(true);
        if (userCheck) {
          return Promise.resolve();
        } else {
          return Promise.reject(new UserDoesNotBelongToThreadError(this.messageThreadId));
        }
      });
    }
  }
