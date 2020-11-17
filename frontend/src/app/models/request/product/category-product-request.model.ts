export class CategoryModel {
    id: number;
    category: string = null;
}

export class SubCategoryModel {
    id: number;
    categoryId: number;
    category: string = null;
}
