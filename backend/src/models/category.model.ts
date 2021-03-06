import { Sequelize, Model, DataTypes, Association, Optional } from 'sequelize';
import { Subcategory } from './subcategory.model';
import { CategoryService } from '../services/category.service';

export interface CategoryAttributes {
    categoryId: number;
    category: string;
}

export interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'categoryId'> { }

export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {

    public static associations: {
      subcategories: Association<Category, Subcategory>
    };

    categoryId!: number;
    category!: string;

    public static initialize(sequelize: Sequelize): void {
         Category.init({
             categoryId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
             },
             category: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
              },
            },
           {
                sequelize,
                tableName: 'categories'
            }
        );
    }

    public static createAssociations(): void {
      Category.hasMany(Subcategory, {
        foreignKey: 'categoryId',
        as: 'subcategories'
      });
    }

    public static createCategories(): void {
      CategoryService.setUpCategories();
    }
}
