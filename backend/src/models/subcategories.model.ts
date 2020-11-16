import { Optional, Model, Sequelize, DataTypes, } from 'sequelize';

export interface SubcategoriesAttributes {
    categoryId: number;
    subcategory: string;

}

export interface GoodsProductSubcategoires extends Optional<SubcategoriesAttributes, 'subcategory'> { }

export class Subcategories extends Model<SubcategoriesAttributes, GoodsProductSubcategoires>
    implements Subcategories {
        categoryId!: number;
        subcategory!: string;

    public static initialize(sequelize: Sequelize) {
         Subcategories.init({
             categoryId: {
                 type: DataTypes.NUMBER,
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
