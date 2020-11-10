import { Categories, CategoriesAttributes } from '../models/categories.model';
import { Subcategories, SubcategoriesAttributes } from '../models/subcategories.model';

const { Op } = require('sequelize');

export class CategoriesService {

    public getAllCategories(): Promise<Array<Categories>>{
        return Categories.findAll();
    }

    public getAllSubcategories(): Promise<Array<Subcategories>>{
        return Subcategories.findAll();
    }
}