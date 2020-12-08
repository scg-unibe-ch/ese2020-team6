import { CategoryModel } from '../../category/category.module';
import { SubcategoryResponseModel, SubcategoryResponse } from './subcategory-response.model';
import { Is } from '../../compare/is';

export interface CategoryResponseModel extends Omit<CategoryModel, 'subcategories'>{
  subcategories: Array<SubcategoryResponseModel>
}


export class CategoryResponse implements CategoryResponseModel {
  constructor(
    public categoryId: number,
    public category: string,
    public subcategories: Array<SubcategoryResponseModel>
  ) {}

  static isCategoryResponseModel(categoryModel: CategoryResponseModel): categoryModel is CategoryResponseModel {
    if (Array.isArray(categoryModel.subcategories)) {

      let subcategoriesCheck = categoryModel.subcategories.map(
        (subcategoryModel: SubcategoryResponseModel) => {
          return SubcategoryResponse.isSubcategoryResponseModel(subcategoryModel)
        }
      )

      return Is.is(categoryModel, [
        'categoryId', 'category'
      ]) && !(subcategoriesCheck.includes(false));
    } else return false;
  }
}
