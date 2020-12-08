import { CategoryResponseModel, CategoryResponse } from './category-response.model';

export interface CategoriesResponseModel extends Array<CategoryResponseModel>{}


export class CategoriesResponse extends Array<CategoryResponse> implements CategoriesResponseModel {

  static isCategoriesResponseModel(categoriesModel: CategoriesResponseModel): categoriesModel is CategoriesResponseModel {
    if (Array.isArray(categoriesModel)) {

      let categoriesCheck = categoriesModel.map(
        (categoryModel: CategoryResponseModel) => {
          return CategoryResponse.isCategoryResponseModel(categoryModel)
        }
      )

      return !(categoriesCheck.includes(false));
    } else return false;
  }
}
