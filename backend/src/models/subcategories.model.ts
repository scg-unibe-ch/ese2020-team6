import { Optional, Model, Sequelize, DataTypes, } from 'sequelize';

export interface SubcategoriesAttributes {
    subcategoryId: number;
    categoryId: number;
    subcategory: string;

}

export interface GoodsProductSubcategoires extends Optional<SubcategoriesAttributes, 'subcategory'> { }

export class Subcategories extends Model<SubcategoriesAttributes, GoodsProductSubcategoires>
    implements Subcategories {
        subcategoryId!: number;
        categoryId!: number;
        subcategory!: string;

    public static initialize(sequelize: Sequelize) {
         Subcategories.init({
             subcategoryId: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
             },
             categoryId: {
                 type: DataTypes.INTEGER,
                 unique: false,
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
}
