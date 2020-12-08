import { SubcategoryModel, Subcategory } from './subcategory.model';
import { Is } from '../compare/is';
import { CategoryResponseModel, SubcategoryResponseModel } from '../response/response.module';

export interface CategoryModel {
    categoryId: number;
    category: string;
    subcategories: Array<SubcategoryModel>
}

export class Category implements CategoryModel {

  constructor(
    public categoryId: number,
    public category: string,
    public subcategories: Array<Subcategory>
  ) {}

  public static buildFromCategoryModel(categoryModel: CategoryModel): Category {
    let subcategoryArray: Array<Subcategory> = new Array<Subcategory>();
    categoryModel.subcategories.forEach((subcategoryModel: SubcategoryModel) => {
      subcategoryArray.push(new Subcategory(
        subcategoryModel.subcategoryId,
        subcategoryModel.categoryId,
        subcategoryModel.subcategory)
      )
    });

    return new Category(
      categoryModel.categoryId,
      categoryModel.category,
      subcategoryArray
    );
  }

  public static buildFromCategoryResponseModel(category: CategoryResponseModel): Category {
    if (!(category instanceof Category)) {
      return new Category(
        category.categoryId,
        category.category,
        Category.buildSucategoriesArray(category.subcategories)
      )
    } else return category;
  }

  private static buildSucategoriesArray(subcategories: Array<SubcategoryResponseModel>): Array<Subcategory> {
    return subcategories.map((subcategory: SubcategoryResponseModel) => Subcategory.buildFromSubcategoryResponseModel(subcategory));
  }

  static isCategoryModel(categoryModel: CategoryModel): categoryModel is CategoryModel {
    if (Array.isArray(categoryModel.subcategories)) {

      let subcategoriesCheck = categoryModel.subcategories.map(
        (subcategoryModel: SubcategoryModel) => {
          return Subcategory.isSubcategoryModel(subcategoryModel)
        }
      )

      return Is.is(categoryModel, [
        'categoryId', 'category'
      ]) && !(subcategoriesCheck.includes(false));
    } else return false;
  }

  public toString = (): string => {
    return this.category;
  }
}
