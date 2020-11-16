import { Categories, CategoriesAttributes } from '../models/categories.model';
import { Subcategories, SubcategoriesAttributes } from '../models/subcategories.model';

const { Op } = require('sequelize');

export class CategoriesService {

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
        Subcategories.create({ categoryId: 0, subcategory: 'Case'});
        Subcategories.create({ categoryId: 1, subcategory: 'Server'});
        Subcategories.create({ categoryId: 1, subcategory: 'PC'});
        Subcategories.create({ categoryId: 1, subcategory: 'Mouse'});
        Subcategories.create({ categoryId: 1, subcategory: 'Keyboard'});
        Subcategories.create({ categoryId: 1, subcategory: 'Monitor'});
        Subcategories.create({ categoryId: 1, subcategory: 'Other'});

        Subcategories.create({ categoryId: 2, subcategory: 'Smartphone'});
        Subcategories.create({ categoryId: 2, subcategory: 'Console'});
        Subcategories.create({ categoryId: 2, subcategory: 'Stereo'});
        Subcategories.create({ categoryId: 2, subcategory: 'Camera'});
        Subcategories.create({ categoryId: 2, subcategory: 'Other'});

        Subcategories.create({ categoryId: 3, subcategory: 'Soccer'});
        Subcategories.create({ categoryId: 3, subcategory: 'Golf'});
        Subcategories.create({ categoryId: 3, subcategory: 'Floorball'});
        Subcategories.create({ categoryId: 3, subcategory: 'Volleyball'});
        Subcategories.create({ categoryId: 3, subcategory: 'Rugby'});
        Subcategories.create({ categoryId: 3, subcategory: 'Football'});
        Subcategories.create({ categoryId: 3, subcategory: 'Other'});

        Subcategories.create({ categoryId: 4, subcategory: 'LEGO'});
        Subcategories.create({ categoryId: 4, subcategory: 'Figurines'});
        Subcategories.create({ categoryId: 4, subcategory: 'Other'});

        Subcategories.create({ categoryId: 5, subcategory: 'CD'});
        Subcategories.create({ categoryId: 5, subcategory: 'Keyboard'});
        Subcategories.create({ categoryId: 5, subcategory: 'Guitar'});
        Subcategories.create({ categoryId: 5, subcategory: 'Piano'});
        Subcategories.create({ categoryId: 5, subcategory: 'Microphone'});
        Subcategories.create({ categoryId: 5, subcategory: 'Other'});

        Subcategories.create({ categoryId: 6, subcategory: 'Garage'});
        Subcategories.create({ categoryId: 6, subcategory: 'Loft'});
        Subcategories.create({ categoryId: 6, subcategory: 'Storage Room'});
        Subcategories.create({ categoryId: 6, subcategory: 'Studio'});
        Subcategories.create({ categoryId: 6, subcategory: 'Appartment'});
        Subcategories.create({ categoryId: 6, subcategory: 'House'});
        Subcategories.create({ categoryId: 6, subcategory: 'Other'});

        Subcategories.create({ categoryId: 7, subcategory: 'Bed'});
        Subcategories.create({ categoryId: 7, subcategory: 'Table'});
        Subcategories.create({ categoryId: 7, subcategory: 'Chair'});
        Subcategories.create({ categoryId: 7, subcategory: 'Sofa'});
        Subcategories.create({ categoryId: 7, subcategory: 'Desk'});
        Subcategories.create({ categoryId: 7, subcategory: 'Drawer'});
        Subcategories.create({ categoryId: 7, subcategory: 'Cupboard'});
        Subcategories.create({ categoryId: 7, subcategory: 'Other'});

        Subcategories.create({ categoryId: 8, subcategory: 'Cat'});
        Subcategories.create({ categoryId: 8, subcategory: 'Dog'});
        Subcategories.create({ categoryId: 8, subcategory: 'Turtles'});
        Subcategories.create({ categoryId: 8, subcategory: 'Hamster'});
        Subcategories.create({ categoryId: 8, subcategory: 'Fish'});
        Subcategories.create({ categoryId: 8, subcategory: 'Bird'});
        Subcategories.create({ categoryId: 8, subcategory: 'Other'});

        Subcategories.create({ categoryId: 9, subcategory: 'Car'});
        Subcategories.create({ categoryId: 9, subcategory: 'Motorbike'});
        Subcategories.create({ categoryId: 9, subcategory: 'Bike'});
        Subcategories.create({ categoryId: 9, subcategory: 'E-Bike'});
        Subcategories.create({ categoryId: 9, subcategory: 'Scooter'});
        Subcategories.create({ categoryId: 9, subcategory: 'Bicycle'});
        Subcategories.create({ categoryId: 9, subcategory: 'Other'});

        Subcategories.create({ categoryId: 10, subcategory: 'Plant accessories'});
        Subcategories.create({ categoryId: 10, subcategory: 'Tool'});
        Subcategories.create({ categoryId: 10, subcategory: 'Plant'});
        Subcategories.create({ categoryId: 10, subcategory: 'Seed'});
        Subcategories.create({ categoryId: 10, subcategory: 'Workspace'});
        Subcategories.create({ categoryId: 10, subcategory: 'Machines'});
        Subcategories.create({ categoryId: 10, subcategory: 'Others'});

        Subcategories.create({ categoryId: 11, subcategory: 'REALLY FAST Stove'});
        Subcategories.create({ categoryId: 11, subcategory: 'EXTREMELY HOT Stove'});
        Subcategories.create({ categoryId: 11, subcategory: 'HEARTWAMRINGLY NICE Stove'});
        Subcategories.create({ categoryId: 11, subcategory: 'STUNNINGLY BEAUTIFUL Stove'});
        Subcategories.create({ categoryId: 11, subcategory: 'SURPRISINGLY SEXY Stove'});
        Subcategories.create({ categoryId: 11, subcategory: 'INCREDIBLY SLENDER Stove'});
    }

    public getAllCategories(): Promise<Array<Categories>> {
        return Categories.findAll();
    }

    public getAllSubcategories(): Promise<Array<Subcategories>> {
        return Subcategories.findAll();
    }
}
