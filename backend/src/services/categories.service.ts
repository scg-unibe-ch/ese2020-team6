import { Categories, CategoriesAttributes } from '../models/categories.model';
import { Subcategories, SubcategoriesAttributes } from '../models/subcategories.model';

const { Op } = require('sequelize');

export class CategoriesService {

    // db erstellen
    // admin einträge verwalten
    public static setUpCategories() {
        Categories.create({ categoryId: 1, category: 'Computer and Network' });
        Categories.create({ categoryId: 2, category: 'Consumer Electronics' });
        Categories.create({ categoryId: 3, category: 'Sport' });
        Categories.create({ categoryId: 4, category: 'Toys' });
        Categories.create({ categoryId: 5, category: 'Music and Instruments' });
        Categories.create({ categoryId: 6, category: 'Accommodation' });
        Categories.create({ categoryId: 7, category: 'Furniture' });
        Categories.create({ categoryId: 8, category: 'Pet' });
        Categories.create({ categoryId: 9, category: 'Vehicles' });
        Categories.create({ categoryId: 10, category: 'Homeworker' });
        Categories.create({ categoryId: 11, category: 'STOVES' });
    }

    public static setUpSubcategories() {
        Subcategories.create({ subcategoryId: 1, categoryId: 1, subcategory: 'Case'});
        Subcategories.create({ subcategoryId: 2, categoryId: 1, subcategory: 'Server'});
        Subcategories.create({ subcategoryId: 3, categoryId: 1, subcategory: 'PC'});
        Subcategories.create({ subcategoryId: 4, categoryId: 1, subcategory: 'Mouse'});
        Subcategories.create({ subcategoryId: 5, categoryId: 1, subcategory: 'Keyboard'});
        Subcategories.create({ subcategoryId: 6, categoryId: 1, subcategory: 'Monitor'});
        Subcategories.create({ subcategoryId: 7, categoryId: 1, subcategory: 'Other'});

        Subcategories.create({ subcategoryId: 8, categoryId: 2, subcategory: 'Smartphone'});
        Subcategories.create({ subcategoryId: 9, categoryId: 2, subcategory: 'Console'});
        Subcategories.create({ subcategoryId: 10, categoryId: 2, subcategory: 'Stereo'});
        Subcategories.create({ subcategoryId: 11, categoryId: 2, subcategory: 'Camera'});
        Subcategories.create({ subcategoryId: 12, categoryId: 2, subcategory: 'Other'});

        Subcategories.create({ subcategoryId: 13, categoryId: 3, subcategory: 'Soccer'});
        Subcategories.create({ subcategoryId: 14, categoryId: 3, subcategory: 'Golf'});
        Subcategories.create({ subcategoryId: 15, categoryId: 3, subcategory: 'Floorball'});
        Subcategories.create({ subcategoryId: 16, categoryId: 3, subcategory: 'Volleyball'});
        Subcategories.create({ subcategoryId: 17, categoryId: 3, subcategory: 'Rugby'});
        Subcategories.create({ subcategoryId: 18, categoryId: 3, subcategory: 'Football'});
        Subcategories.create({ subcategoryId: 19, categoryId: 3, subcategory: 'Other'});

        Subcategories.create({ subcategoryId: 20, categoryId: 4, subcategory: 'LEGO'});
        Subcategories.create({ subcategoryId: 21, categoryId: 4, subcategory: 'Figurines'});
        Subcategories.create({ subcategoryId: 22, categoryId: 4, subcategory: 'Other'});

        Subcategories.create({ subcategoryId: 23, categoryId: 5, subcategory: 'CD'});
        Subcategories.create({ subcategoryId: 24, categoryId: 5, subcategory: 'Keyboard'});
        Subcategories.create({ subcategoryId: 25, categoryId: 5, subcategory: 'Guitar'});
        Subcategories.create({ subcategoryId: 26, categoryId: 5, subcategory: 'Piano'});
        Subcategories.create({ subcategoryId: 27, categoryId: 5, subcategory: 'Microphone'});
        Subcategories.create({ subcategoryId: 28, categoryId: 5, subcategory: 'Other'});

        Subcategories.create({ subcategoryId: 29, categoryId: 6, subcategory: 'Garage'});
        Subcategories.create({ subcategoryId: 30, categoryId: 6, subcategory: 'Loft'});
        Subcategories.create({ subcategoryId: 31, categoryId: 6, subcategory: 'Storage Room'});
        Subcategories.create({ subcategoryId: 32, categoryId: 6, subcategory: 'Studio'});
        Subcategories.create({ subcategoryId: 33, categoryId: 6, subcategory: 'Appartment'});
        Subcategories.create({ subcategoryId: 34, categoryId: 6, subcategory: 'House'});
        Subcategories.create({ subcategoryId: 35, categoryId: 6, subcategory: 'Other'});

        Subcategories.create({ subcategoryId: 36, categoryId: 7, subcategory: 'Bed'});
        Subcategories.create({ subcategoryId: 37, categoryId: 7, subcategory: 'Table'});
        Subcategories.create({ subcategoryId: 38, categoryId: 7, subcategory: 'Chair'});
        Subcategories.create({ subcategoryId: 39, categoryId: 7, subcategory: 'Sofa'});
        Subcategories.create({ subcategoryId: 40, categoryId: 7, subcategory: 'Desk'});
        Subcategories.create({ subcategoryId: 41, categoryId: 7, subcategory: 'Drawer'});
        Subcategories.create({ subcategoryId: 42, categoryId: 7, subcategory: 'Cupboard'});
        Subcategories.create({ subcategoryId: 43, categoryId: 7, subcategory: 'Other'});

        Subcategories.create({ subcategoryId: 44, categoryId: 8, subcategory: 'Cat'});
        Subcategories.create({ subcategoryId: 45, categoryId: 8, subcategory: 'Dog'});
        Subcategories.create({ subcategoryId: 46, categoryId: 8, subcategory: 'Turtles'});
        Subcategories.create({ subcategoryId: 47, categoryId: 8, subcategory: 'Hamster'});
        Subcategories.create({ subcategoryId: 48, categoryId: 8, subcategory: 'Fish'});
        Subcategories.create({ subcategoryId: 49, categoryId: 8, subcategory: 'Bird'});
        Subcategories.create({ subcategoryId: 50, categoryId: 8, subcategory: 'Other'});

        Subcategories.create({ subcategoryId: 51, categoryId: 9, subcategory: 'Car'});
        Subcategories.create({ subcategoryId: 52, categoryId: 9, subcategory: 'Motorbike'});
        Subcategories.create({ subcategoryId: 53, categoryId: 9, subcategory: 'Bike'});
        Subcategories.create({ subcategoryId: 54, categoryId: 9, subcategory: 'E-Bike'});
        Subcategories.create({ subcategoryId: 55, categoryId: 9, subcategory: 'Scooter'});
        Subcategories.create({ subcategoryId: 56, categoryId: 9, subcategory: 'Bicycle'});
        Subcategories.create({ subcategoryId: 57, categoryId: 9, subcategory: 'Other'});

        Subcategories.create({ subcategoryId: 58, categoryId: 10, subcategory: 'Plant accessories'});
        Subcategories.create({ subcategoryId: 59, categoryId: 10, subcategory: 'Tool'});
        Subcategories.create({ subcategoryId: 60, categoryId: 10, subcategory: 'Plant'});
        Subcategories.create({ subcategoryId: 61, categoryId: 10, subcategory: 'Seed'});
        Subcategories.create({ subcategoryId: 62, categoryId: 10, subcategory: 'Workspace'});
        Subcategories.create({ subcategoryId: 63, categoryId: 10, subcategory: 'Machines'});
        Subcategories.create({ subcategoryId: 64, categoryId: 10, subcategory: 'Others'});

        Subcategories.create({ subcategoryId: 65, categoryId: 11, subcategory: 'REALLY FAST Stove'});
        Subcategories.create({ subcategoryId: 66, categoryId: 11, subcategory: 'EXTREMELY HOT Stove'});
        Subcategories.create({ subcategoryId: 67, categoryId: 11, subcategory: 'HEARTWAMRINGLY NICE Stove'});
        Subcategories.create({ subcategoryId: 68, categoryId: 11, subcategory: 'STUNNINGLY BEAUTIFUL Stove'});
        Subcategories.create({ subcategoryId: 69, categoryId: 11, subcategory: 'SURPRISINGLY SEXY Stove'});
        Subcategories.create({ subcategoryId: 65, categoryId: 11, subcategory: 'INCREDIBLY SLENDER Stove'});
    }

    public getAllCategories(): Promise<Array<Categories>> {
        return Categories.findAll();
    }

    public getAllSubcategories(): Promise<Array<Subcategories>> {
        return Subcategories.findAll();
    }
}
