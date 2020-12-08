import { Is } from '../compare/is';
import { SubcategoryResponseModel } from '../response/response.module';

export interface SubcategoryModel {
  subcategoryId: number;
  categoryId: number;
  subcategory: string;
}

export class Subcategory implements SubcategoryModel {

  constructor(
    public subcategoryId: number,
    public categoryId: number,
    public subcategory: string
  ) {}

  public static buildFromSubcategoryModel(subcategoryModel: SubcategoryModel): Subcategory {
    return new Subcategory(subcategoryModel.subcategoryId, subcategoryModel.categoryId, subcategoryModel.subcategory);
  }

  static isSubcategoryModel(subcategoryModel: SubcategoryModel): subcategoryModel is SubcategoryModel {
    return Is.is(subcategoryModel, [
      'subcategoryId', 'categoryId', 'subcategory'
    ]);
  }

  public static buildFromSubcategoryResponseModel(subcategory: SubcategoryResponseModel): Subcategory {
    if (!(subcategory instanceof Subcategory)) {
      return new Subcategory(
        subcategory.subcategoryId,
        subcategory.categoryId,
        subcategory.subcategory
      )
    } else return subcategory;
  }

  public toString = (): string => {
    return this.subcategory;
  }
}
