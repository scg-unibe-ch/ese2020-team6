export interface CategoryModel {
    id: number;
    category: string;
}

export class Category implements CategoryModel {

  constructor(
    public id: number,
    public category: string
  ) {}

  public static buildFromCategoryModel(categoryModel: CategoryModel): Category {
    return new Category(categoryModel.id, categoryModel.category);
  }

  public toString = () : string => {
    return this.category;
  }
}

export class Categories {

  public static NullCategories: Categories = new Categories(new Array<Category>(), new Array<Category>());

  public categoriesStrings: Array<string> = new Array<string>();
  public subcategoriesStrings: Array<string> = new Array<string>();

  public catIdModSubCatRecord: Record<any, { category: CategoryModel, subcategories: Array<CategoryModel> }> = {};
  public catIdSubCatNameRecord: Record<any, Array<string>> = {};
  public catNameSubCatNameRecord: Record<any, Array<string>> = {};

  constructor(
    private categories: Array<Category>,
    private subcategories: Array<Category>
  ) {
    this.build();
  }

  private build(): void {
    this.buildRecords();
    this.buildCategoriesStrings();
    this.buildSubcategoriesStrings();
  }

  private buildSubcategoriesAfterId(): Record<any, Array<CategoryModel>> {
    let subcategoriesAfterId: Record<any, Array<CategoryModel>> = {};
    this.subcategories.forEach((subcategory: CategoryModel) => {
      if (!subcategoriesAfterId[subcategory.id]) {
        subcategoriesAfterId[subcategory.id] = new Array<CategoryModel>();
      }
      subcategoriesAfterId[subcategory.id].push(subcategory);
    });
    return subcategoriesAfterId;
  }

  private buildRecords(): void {
    let subcategoriesAfterId: Record<any, Array<CategoryModel>> = this.buildSubcategoriesAfterId();

    this.categories.forEach((category: CategoryModel) => {
      this.catIdModSubCatRecord[category.id] = {
        category: category,
        subcategories: subcategoriesAfterId[category.id]
      }
      this.catNameSubCatNameRecord[category.category] = subcategoriesAfterId[category.id].map((subcategory: CategoryModel) => {
        return subcategory.category;
      })
      this.catIdSubCatNameRecord[category.id] = subcategoriesAfterId[category.id].map((subcategory: CategoryModel) => {
        return subcategory.category;
      })
    });
  }

  private buildCategoriesStrings(): Array<string> {
    return this.categoriesStrings = this.categories.map((category: CategoryModel) => {
      return category.category;
    });
  }

  private buildSubcategoriesStrings(): Array<string> {
    return this.subcategoriesStrings = this.subcategories.map((subcategory: CategoryModel) => {
      return subcategory.category;
    });
  }

  public getSomeSubcategories(categories: Array<CategoryModel>): Array<string> {
    return this.reduce(categories.map((category: CategoryModel) => {
      if (Object.keys(this.catIdSubCatNameRecord).includes(category.id.toString())) {
        return this.catIdSubCatNameRecord[category.id];
      }
    }));
  }

  public getSomeSubcategoriesByName(categoriesNames: Array<string>): Array<string> {
    return this.reduce(categoriesNames.map((categoryName: string) => {
      if (Object.keys(this.catNameSubCatNameRecord).includes(categoryName)) {
        return this.catNameSubCatNameRecord[categoryName];
      }
    }));
  }

  public getSomeSubcategoriesById(categoriesIds: Array<number>): Array<string> {
    return this.reduce(categoriesIds.map((categoryId: number) => {
      if (Object.keys(this.catIdSubCatNameRecord).includes(categoryId.toString())) {
        return this.catIdSubCatNameRecord[categoryId];
      }
    }));
  }

  private reduce(subcategoriesArray: Array<Array<string>>): Array<string> {
    return subcategoriesArray.reduce((result: Array<string>, subcategories: Array<string>) => {
      return result.concat(subcategories);
    }, new Array<string>());
  }

  public getSubcategoriesByName(categoryName: string): Array<string> {
    if (Object.keys(this.catNameSubCatNameRecord).includes(categoryName)) {
      return this.catNameSubCatNameRecord[categoryName];
    }
    return new Array<string>();
  }


}
