import { Sequelize, Model, DataTypes, Association, Optional } from 'sequelize';
import { Category } from './category.model';

export interface SubcategoryAttributes {
    subcategoryId: number;
    categoryId: number;
    subcategory: string;
}

export interface SubcategoiresCreationAttributes extends Optional<SubcategoryAttributes, 'subcategoryId'> { }

export class Subcategory extends Model<SubcategoryAttributes, SubcategoiresCreationAttributes> implements SubcategoryAttributes {

    public static associations: {
      category: Association<Subcategory, Category>
    };

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
      Subcategory.belongsTo(Category, {
        foreignKey: 'categoryId',
        as: 'category'
      });
    }
}
