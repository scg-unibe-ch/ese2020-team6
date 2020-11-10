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
        Categories.build({ categoryId: 11, category: 'STOVES' });
    }

    public static setUpSubcategories() {
        Subcategories.build({ subcategoryId: 1, categoryId: 1, subcategory: 'Case'});
        Subcategories.build({ subcategoryId: 2, categoryId: 1, subcategory: 'Server'});
        Subcategories.build({ subcategoryId: 3, categoryId: 1, subcategory: 'PC'});
        Subcategories.build({ subcategoryId: 4, categoryId: 1, subcategory: 'Mouse'});
        Subcategories.build({ subcategoryId: 5, categoryId: 1, subcategory: 'Keyboard'});
        Subcategories.build({ subcategoryId: 6, categoryId: 1, subcategory: 'Monitor'});
        Subcategories.build({ subcategoryId: 7, categoryId: 1, subcategory: 'Other'});

        Subcategories.build({ subcategoryId: 8, categoryId: 2, subcategory: 'Smartphone'});
        Subcategories.build({ subcategoryId: 9, categoryId: 2, subcategory: 'Console'});
        Subcategories.build({ subcategoryId: 10, categoryId: 2, subcategory: 'Stereo'});
        Subcategories.build({ subcategoryId: 11, categoryId: 2, subcategory: 'Camera'});
        Subcategories.build({ subcategoryId: 12, categoryId: 2, subcategory: 'Other'});

        Subcategories.build({ subcategoryId: 13, categoryId: 3, subcategory: 'Soccer'});
        Subcategories.build({ subcategoryId: 14, categoryId: 3, subcategory: 'Golf'});
        Subcategories.build({ subcategoryId: 15, categoryId: 3, subcategory: 'Floorball'});
        Subcategories.build({ subcategoryId: 16, categoryId: 3, subcategory: 'Volleyball'});
        Subcategories.build({ subcategoryId: 17, categoryId: 3, subcategory: 'Rugby'});
        Subcategories.build({ subcategoryId: 18, categoryId: 3, subcategory: 'Football'});
        Subcategories.build({ subcategoryId: 19, categoryId: 3, subcategory: 'Other'});

        Subcategories.build({ subcategoryId: 20, categoryId: 4, subcategory: 'LEGO'});
        Subcategories.build({ subcategoryId: 21, categoryId: 4, subcategory: 'Figurines'});
        Subcategories.build({ subcategoryId: 22, categoryId: 4, subcategory: 'Other'});

        Subcategories.build({ subcategoryId: 23, categoryId: 5, subcategory: 'CD'});
        Subcategories.build({ subcategoryId: 24, categoryId: 5, subcategory: 'Keyboard'});
        Subcategories.build({ subcategoryId: 25, categoryId: 5, subcategory: 'Guitar'});
        Subcategories.build({ subcategoryId: 26, categoryId: 5, subcategory: 'Piano'});
        Subcategories.build({ subcategoryId: 27, categoryId: 5, subcategory: 'Microphone'});
        Subcategories.build({ subcategoryId: 28, categoryId: 5, subcategory: 'Other'});

        Subcategories.build({ subcategoryId: 29, categoryId: 6, subcategory: 'Garage'});
        Subcategories.build({ subcategoryId: 30, categoryId: 6, subcategory: 'Loft'});
        Subcategories.build({ subcategoryId: 31, categoryId: 6, subcategory: 'Storage Room'});
        Subcategories.build({ subcategoryId: 32, categoryId: 6, subcategory: 'Studio'});
        Subcategories.build({ subcategoryId: 33, categoryId: 6, subcategory: 'Appartment'});
        Subcategories.build({ subcategoryId: 34, categoryId: 6, subcategory: 'House'});
        Subcategories.build({ subcategoryId: 35, categoryId: 6, subcategory: 'Other'});

        Subcategories.build({ subcategoryId: 36, categoryId: 7, subcategory: 'Bed'});
        Subcategories.build({ subcategoryId: 37, categoryId: 7, subcategory: 'Table'});
        Subcategories.build({ subcategoryId: 38, categoryId: 7, subcategory: 'Chair'});
        Subcategories.build({ subcategoryId: 39, categoryId: 7, subcategory: 'Sofa'});
        Subcategories.build({ subcategoryId: 40, categoryId: 7, subcategory: 'Desk'});
        Subcategories.build({ subcategoryId: 41, categoryId: 7, subcategory: 'Drawer'});
        Subcategories.build({ subcategoryId: 42, categoryId: 7, subcategory: 'Cupboard'});
        Subcategories.build({ subcategoryId: 43, categoryId: 7, subcategory: 'Other'});

        Subcategories.build({ subcategoryId: 44, categoryId: 8, subcategory: 'Cat'});
        Subcategories.build({ subcategoryId: 45, categoryId: 8, subcategory: 'Dog'});
        Subcategories.build({ subcategoryId: 46, categoryId: 8, subcategory: 'Turtles'});
        Subcategories.build({ subcategoryId: 47, categoryId: 8, subcategory: 'Hamster'});
        Subcategories.build({ subcategoryId: 48, categoryId: 8, subcategory: 'Fish'});
        Subcategories.build({ subcategoryId: 49, categoryId: 8, subcategory: 'Bird'});
        Subcategories.build({ subcategoryId: 50, categoryId: 8, subcategory: 'Other'});

        Subcategories.build({ subcategoryId: 51, categoryId: 9, subcategory: 'Car'});
        Subcategories.build({ subcategoryId: 52, categoryId: 9, subcategory: 'Motorbike'});
        Subcategories.build({ subcategoryId: 53, categoryId: 9, subcategory: 'Bike'});
        Subcategories.build({ subcategoryId: 54, categoryId: 9, subcategory: 'E-Bike'});
        Subcategories.build({ subcategoryId: 55, categoryId: 9, subcategory: 'Scooter'});
        Subcategories.build({ subcategoryId: 56, categoryId: 9, subcategory: 'Bicycle'});
        Subcategories.build({ subcategoryId: 57, categoryId: 9, subcategory: 'Other'});

        Subcategories.build({ subcategoryId: 58, categoryId: 10, subcategory: 'Plant accessories'});
        Subcategories.build({ subcategoryId: 59, categoryId: 10, subcategory: 'Tool'});
        Subcategories.build({ subcategoryId: 60, categoryId: 10, subcategory: 'Plant'});
        Subcategories.build({ subcategoryId: 61, categoryId: 10, subcategory: 'Seed'});
        Subcategories.build({ subcategoryId: 62, categoryId: 10, subcategory: 'Workspace'});
        Subcategories.build({ subcategoryId: 63, categoryId: 10, subcategory: 'Machines'});
        Subcategories.build({ subcategoryId: 64, categoryId: 10, subcategory: 'Others'});

        Subcategories.build({ subcategoryId: 65, categoryId: 11, subcategory: 'FAST Stove'});
        Subcategories.build({ subcategoryId: 66, categoryId: 11, subcategory: 'HOT Stove'});
        Subcategories.build({ subcategoryId: 67, categoryId: 11, subcategory: 'NICE Stove'});
        Subcategories.build({ subcategoryId: 68, categoryId: 11, subcategory: 'BEAUTIFUL Stove'});
        Subcategories.build({ subcategoryId: 69, categoryId: 11, subcategory: 'SEXY Stove'});
        Subcategories.build({ subcategoryId: 65, categoryId: 11, subcategory: 'SLENDER Stove'});
    }

    public getAllCategories(): Promise<Array<Categories>> {
        return Categories.findAll();
    }

    public getAllSubcategories(): Promise<Array<Subcategories>> {
        return Subcategories.findAll();
    }
}
