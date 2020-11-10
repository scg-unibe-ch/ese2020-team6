import { Categories, CategoriesAttributes } from '../models/categories.model';
import { Subcategories, SubcategoriesAttributes } from '../models/subcategories.model';

const { Op } = require('sequelize');

export class CategoriesService {

    public static setUpCategories() {
        Categories.build({ categoryId: 1, category: 'Computer and Network' });
        Categories.build({ categoryId: 2, category: 'Consumer Electronics' });
        Categories.build({ categoryId: 3, category: 'Sport' });
        Categories.build({ categoryId: 4, category: 'Toys' });
        Categories.build({ categoryId: 5, category: 'Music and Instruments' });
        Categories.build({ categoryId: 6, category: 'Accommodation' });
        Categories.build({ categoryId: 7, category: 'Furniture' });
        Categories.build({ categoryId: 8, category: 'Pet' });
        Categories.build({ categoryId: 9, category: 'Vehicles' });
        Categories.build({ categoryId: 10, category: 'Homeworker' });
    }

    public static setUpSubcategories() {
        Subcategories.build({ subcategoryId: 1, categoryId: 1, subcategory: 'Case'});
        Subcategories.build({ subcategoryId: 2, categoryId: 1, subcategory: 'Server'});
        Subcategories.build({ subcategoryId: 3, categoryId: 1, subcategory: 'PC'});
        Subcategories.build({ subcategoryId: 4, categoryId: 1, subcategory: 'Mouse'});
        Subcategories.build({ subcategoryId: 5, categoryId: 1, subcategory: 'Keyboard'});
        Subcategories.build({ subcategoryId: 6, categoryId: 1, subcategory: 'Monitor'});
        Subcategories.build({ subcategoryId: 7, categoryId: 1, subcategory: 'Other'});
    }

    public getAllCategories(): Promise<Array<Categories>> {
        return Categories.findAll();
    }

    public getAllSubcategories(): Promise<Array<Subcategories>> {
        return Subcategories.findAll();
    }
}
