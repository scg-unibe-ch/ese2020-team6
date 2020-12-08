import { SubcategoryModel, Subcategory } from '../../category/category.module';

export interface SubcategoryResponseModel extends SubcategoryModel {}

export class SubcategoryResponse implements SubcategoryResponseModel {
  constructor(
    public subcategoryId: number,
    public categoryId: number,
    public subcategory: string
  ) {}

  static isSubcategoryResponseModel(subcategoryModel: SubcategoryResponseModel): subcategoryModel is SubcategoryResponseModel {
    return Subcategory.isSubcategoryModel(subcategoryModel);
  }
}
