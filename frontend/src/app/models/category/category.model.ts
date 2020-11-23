export interface CategoryModel {
    categoryId: number;
    category: string;
    subcategories: Array<SubcategoryModel>
}

export interface SubcategoryModel {
  subcategoryId: number;
  categoryId: number;
  subcategory: string;
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

  public toString = () : string => {
    return this.category;
  }
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

  public toString = () : string => {
    return this.subcategory;
  }
}

export class Categories {

  public static NullCategories: Categories = new Categories(new Array<Category>());
  public allSubcategories: Array<Subcategory> = new Array<Subcategory>();

  public categoriesIdRecord: Record<any, Category> = {};
  public categoriesNameRecord: Record<any, Category> = {};

  constructor(
    public allCategories: Array<Category>
  ) {
    this.build();
  }

  private build(): void {
    this.buildAllSubcategories();
    this.buildRecords();
    this.buildAllSubcategories();
  }

  private buildRecords(): void {
    this.allCategories.forEach((category: Category) => {
      this.categoriesIdRecord[category.categoryId] = category;
      this.categoriesNameRecord[category.category] = category;
    });
  }

  private buildAllSubcategories(): void {
    this.allSubcategories = Categories.getAllSubcategoriesOfCategories(this.allCategories);
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
