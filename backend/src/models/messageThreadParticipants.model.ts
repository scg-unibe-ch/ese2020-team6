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
  
  export interface MessageThreadAttributes {
    messageThreadId: number;
    participantId: number;
  }
  
  export interface AddressCreationAttributes extends Optional<AddressAttributes, 'addressId'> { }
  
  export class Address extends Model<AddressAttributes, AddressCreationAttributes> implements AddressAttributes {
  
    public static associations: {
      users: Association<Address, User>,
      products: Association<Address, Product>,
      //messageThread
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
          Message.init({
                messageThreadId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
              },
              participantId: {
                  type: DataTypes.INTEGER,
                  allowNull: false
              },
              {
                  sequelize,
                  tableName: 'messagethreadparticipants'
              },
          );
      }
  
  }
  