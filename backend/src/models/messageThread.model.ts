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
    productId: number;
    isAccepted: boolean; 
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
    productId!:number;
    isAccepted!: boolean; 
  
      public static initialize(sequelize: Sequelize) {
          Message.init({
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
          
              {
                  sequelize,
                  tableName: 'messagethreads'
              },
          );
      }
  
      public static createAssociations() {
        Address.hasMany(ItemRented, {   //messageThreadParticipants
          sourceKey: 'addressId',
          foreignKey: 'shippingAddressId',
          as: 'itemsRented'
        });
      }
  }
  