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
import { User } from './user.model';
import { Product } from './product.model';
import { ItemSold } from './item-sold.model';
import { ItemRented } from './item-rented.model';

export interface AddressAttributes {
  addressId: number;
  streetName: string;
  streetType: string;
  addressNumber: string;
  streetAddress: string;
  neighbourhood: string;
  city: string;
  region: string;
  postal: number;
  country: string;
}

export interface AddressCreationAttributes extends Optional<AddressAttributes, 'addressId'> { }

export class Address extends Model<AddressAttributes, AddressCreationAttributes> implements AddressAttributes {

  public static associations: {
    users: Association<Address, User>,
    products: Association<Address, Product>,
    itemsSold: Association<Address, ItemSold>,
    itemsRented: Association<Address, ItemRented>,
  };

  public getItemsSold!: HasManyGetAssociationsMixin<ItemSold>;
  public addItemSold!: HasManyAddAssociationMixin<ItemSold, number>;
  public hasItemsSold!: HasManyHasAssociationMixin<ItemSold, number>;
  public countItemsSold!: HasManyCountAssociationsMixin;
  public createItemSold!: HasManyCreateAssociationMixin<ItemSold>;

  public getItemsRented!: HasManyGetAssociationsMixin<ItemRented>;
  public addItemRented!: HasManyAddAssociationMixin<ItemRented, number>;
  public hasItemsRented!: HasManyHasAssociationMixin<ItemRented, number>;
  public countItemsRented!: HasManyCountAssociationsMixin;
  public createItemRented!: HasManyCreateAssociationMixin<ItemRented>;

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

  addressId!: number;
  streetName!: string;
  streetType!: string;
  addressNumber!: string;
  streetAddress!: string;
  neighbourhood!: string;
  city!: string;
  region!: string;
  postal!: number;
  country!: string;

    public static initialize(sequelize: Sequelize) {
        Address.init({
            addressId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            streetName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            streetType: {
                type: DataTypes.STRING,
                allowNull: false
            },
            addressNumber: {
                type: DataTypes.STRING,
                allowNull: false
            },
            streetAddress: {
                type: DataTypes.STRING,
                allowNull: false
            },
            neighbourhood: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: ''
            },
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            region: {
                type: DataTypes.STRING,
                allowNull: false
            },
            postal: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            country: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
            {
                sequelize,
                tableName: 'addresses'
            },
        );
    }

    public static createAssociations() {
      Address.hasMany(User, {
        foreignKey: 'addressId',
        as: 'users'
      });

      Address.hasMany(Product, {
        foreignKey: 'addressId',
        as: 'products'
      });

      Address.hasMany(ItemSold, {
        sourceKey: 'addressId',
        foreignKey: 'shippingAddressId',
        as: 'itemsSold'
      });

      Address.hasMany(ItemRented, {
        sourceKey: 'addressId',
        foreignKey: 'shippingAddressId',
        as: 'itemsRented'
      });
    }
}
