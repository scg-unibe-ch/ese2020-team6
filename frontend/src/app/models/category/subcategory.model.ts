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

  public toString = (): string => {
    return this.subcategory;
  }
}
