import { Subcategory } from './subcategory.model';
import { Category, CategoryModel } from './category.model';

export interface CategoriesModel {
  categories: Array<Category>;
}

export class Categories implements CategoriesModel {

  public static NullCategories: Categories = new Categories(new Array<Category>());
  public allSubcategories: Array<Subcategory> = new Array<Subcategory>();

  public categoriesIdRecord: Record<any, Category> = {};
  public categoriesNameRecord: Record<any, Category> = {};

  constructor(
    public categories: Array<Category>
  ) {
    this.build();
  }

  private build(): void {
    this.buildAllSubcategories();
    this.buildRecords();
    this.buildAllSubcategories();
  }

  private buildRecords(): void {
    this.categories.forEach((category: Category) => {
      this.categoriesIdRecord[category.categoryId] = category;
      this.categoriesNameRecord[category.category] = category;
    });
  }

  private buildAllSubcategories(): void {
    this.allSubcategories = Categories.getAllSubcategoriesOfCategories(this.categories);
  }

  public static getAllSubcategoriesOfCategories(categories: Array<Category>): Array<Subcategory> {
    return categories.reduce((result: Array<Subcategory>, category: Category) => {
      return result.concat(category.subcategories);
    }, new Array<Subcategory>());
  }

  public getSomeSubcategoriesByCategoryName(categoryNames: Array<string>): Array<Subcategory> {
    return Categories.getAllSubcategoriesOfCategories(categoryNames.map((categoryName: string) => this.categoriesNameRecord[categoryName]));
  }

  public getSomeSubcategoriesById(categoryIds: Array<number>): Array<Subcategory> {
    return Categories.getAllSubcategoriesOfCategories(categoryIds.map((categoryId: number) => this.categoriesIdRecord[categoryId]));
  }

  public getSubcategoriesByCategoryName(categoryName: string): Array<Subcategory> {
    return this.categoriesNameRecord[categoryName].subcategories;
  }

  public static buildFromCategoryModels(categoryModels: Array<CategoryModel>): Categories {
    return new Categories(categoryModels.map((categoryModel: CategoryModel) => {
      return Category.buildFromCategoryModel(categoryModel);
    }));
  }

}
