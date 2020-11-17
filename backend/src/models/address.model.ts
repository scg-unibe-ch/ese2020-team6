import { Optional, Model, Sequelize, DataTypes, IntegerDataType, Association } from 'sequelize';
import { User } from './user.model';
import { Product } from './product.model';

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

  public static Users: Association;
  public static Products: Association;
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
      Address.Users = Address.hasMany(User, {
        foreignKey: 'addressId',
        as: 'users'
      });

      Address.Products = Address.hasMany(Product, {
        foreignKey: 'addressId',
        as: 'products'
      });
    }
}
