import { Optional, Model, Sequelize, DataTypes, Association } from 'sequelize';
import { Category } from './category.model';
import { CategoryService } from '../services/category.service';

export interface SubcategoryAttributes {
    subcategoryId: number;
    categoryId: number;
    subcategory: string;
}

export interface SubcategoiresCreationAttributes extends Optional<SubcategoryAttributes, 'subcategoryId'> { }

export class Subcategory extends Model<SubcategoryAttributes, SubcategoiresCreationAttributes> implements SubcategoryAttributes {
    public static Category: Association;
    subcategoryId!: number;
    categoryId!: number;
    subcategory!: string;

    public static initialize(sequelize: Sequelize) {
         Subcategory.init({
             subcategoryId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
             },
             categoryId: {
                 type: DataTypes.INTEGER,
                 allowNull: false
             },
             subcategory: {
                  type: DataTypes.STRING,
                  unique: true,
                  allowNull: false
                },
            },
           {
                sequelize,
                tableName: 'subcategories'
            }
        );
    }

    public static createAssociations(): void {
      Subcategory.Category = Subcategory.belongsTo(Category, {
        foreignKey: 'categoryId',
        as: 'category'
      });
    }
}
