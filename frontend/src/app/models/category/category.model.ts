import { SubcategoryModel, Subcategory } from './subcategory.model';

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

  public toString = (): string => {
    return this.category;
  }
}
