import { Optional, Model, Sequelize, DataTypes, } from 'sequelize';

export interface CategoriesAttributes {
    categoryId: number;
    category: string;
}

export interface GoodsProductCategoires extends Optional<CategoriesAttributes, 'category'> { }

export class Categories extends Model<CategoriesAttributes, GoodsProductCategoires>
    implements CategoriesAttributes {
        categoryId!: number;
        category!: string;

    public static initialize(sequelize: Sequelize) {
         Categories.init({
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
}
