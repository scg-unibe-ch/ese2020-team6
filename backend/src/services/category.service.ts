import { Transaction, Sequelize } from 'sequelize';
import { Category, CategoryAttributes } from '../models/category.model';
import { Subcategory, SubcategoryAttributes } from '../models/subcategory.model';

const { Op } = require('sequelize');

export class CategoryService {

    private static categories: Array<[string, Array<string>]> = [
      ['Computer and Network', [
        'Case',
        'Server',
        'PC',
        'Mouse',
        'Keyboard',
        'Monitor',
        'Other',
      ]],
      ['Consumer Electronics', [
        'Smartphone',
        'Console',
        'Stereo',
        'Camera',
        'Other',
      ]],
      ['Sport', [
        'Soccer',
        'Golf',
        'Floorball',
        'Volleyball',
        'Rugby',
        'Football',
        'Other',
      ]],
      ['Toys', [
        'LEGO',
        'Figurines',
        'Other',
      ]],
      ['Music and Instruments', [
        'CD',
        'Keyboard',
        'Guitar',
        'Piano',
        'Microphone',
        'Other',
      ]],
      ['Accommodation', [
        'Garage',
        'Loft',
        'Storage Room',
        'Studio',
        'Appartment',
        'House',
        'Other',
      ]],
      ['Furniture', [
        'Bed',
        'Table',
        'Chair',
        'Sofa',
        'Desk',
        'Drawer',
        'Cupboard',
        'Other',
      ]],
      ['Pet', [
        'Cat',
        'Dog',
        'Turtles',
        'Hamster',
        'Fish',
        'Bird',
        'Other',
      ]],
      ['Vehicles', [
        'Car',
        'Motorbike',
        'Bike',
        'E-Bike',
        'Scooter',
        'Bicycle',
        'Other',
      ]],
      ['Homeworker', [
        'Plant accessories',
        'Tool',
        'Plant',
        'Seed',
        'Workspace',
        'Machines',
        'Others',
      ]],
      ['STOVES', [
        'REALLY FAST Stove',
        'EXTREMELY HOT Stove',
        'HEARTWAMRINGLY NICE Stove',
        'STUNNINGLY BEAUTIFUL Stove',
        'SURPRISINGLY SEXY Stove',
        'INCREDIBLY SLENDER Stove',
      ]]
    ];

    public static getCategories(): Array<string> {
      return CategoryService.categories.map(([category, subcategories]: [string, Array<string>]) => category);
    }

    public static getAllSubcategoriesWithCategoryId(): Array<[number, string]> {
      return CategoryService.categories
      .reduce((result: Array<[number, string]>, [category, subcategories]: [string, Array<string>], index: number) => {
          subcategories.forEach((subcategory: string) => {
            result.push([index + 1, subcategory]);
          });
          return result;
      }, new Array<[number, string]>());
    }

    private static indexSubcategories(subcategories: Array<Subcategory>): Record<any, Array<Subcategory>> {
      const indexedSubcategories: Record<any, Array<Subcategory>> = {};
      subcategories.forEach((subategory: Subcategory) => {
        if (!indexedSubcategories[subategory.categoryId]) {
          indexedSubcategories[subategory.categoryId] = new Array<Subcategory>();
        }
        indexedSubcategories[subategory.categoryId].push(subategory);
      });
      return indexedSubcategories;
    }

    private static buildAssociatedCetegories(categories: Array<Category>, subcategories: Array<Subcategory>):
    Array<[Category, Array<Subcategory>]> {
      const associations: Array<[Category, Array<Subcategory>]> = new Array<[Category, Array<Subcategory>]>();
      const indexedSubcategories: Record<any, Array<Subcategory>> =
      CategoryService.indexSubcategories(subcategories);

      categories.forEach((category: Category) => {
        associations.push([
          category,
          indexedSubcategories[category.categoryId]
        ]);
      });
      return associations;
    }

    public static setUpCategories(): any {// Promise<Array<[Category, Array<Subcategory>]>> {
      return Category.sequelize.transaction().then((transaction: Transaction) => {

        const categories: Array<string> = CategoryService.getCategories();
        const allSubcategories: Array<[number, string]> = CategoryService.getAllSubcategoriesWithCategoryId();
        const creation: Promise<Array<[Category, Array<Subcategory>]>> = CategoryService.createCategories(categories, transaction)
        .then((createdCategories: Array<Category>) => {
          return CategoryService.createSubcategories(allSubcategories, transaction).then((createdSubcategories: Array<Subcategory>) => {
            const associations: Array<[Category, Array<Subcategory>]> =
            CategoryService.buildAssociatedCetegories(createdCategories, createdSubcategories);
            return Promise.resolve(associations);
          }).catch((err: any) => Promise.reject(err));
        }).catch((err: any) => Promise.reject(err));

        creation.then(() => transaction.commit()).catch(() => transaction.rollback());
        return creation;
      }).catch((err: any) => Promise.reject(err));
    }

    public static createCategories(categories: Array<string>, transaction?: Transaction): Promise<Array<Category>> {
      return Category.bulkCreate(
        categories.map((category: string) => ({
          category: category
        })),
        {
          ignoreDuplicates: true,
          transaction: transaction
        }
      );
    }

    public static createCategory(category: string, transaction?: Transaction): Promise<Category> {
      return Category.findOrCreate({
        where: {
          category: category
        },
        defaults: {
          category: category
        },
        transaction: transaction
      }).then(([createdCategory, created]: [Category, boolean]) => {
        return Promise.resolve(createdCategory);
      }).catch(err => Promise.reject(err));
    }

    public static createSubcategories(subcategories: Array<[number, string]>, transaction?: Transaction): Promise<Array<Subcategory>> {
        return Subcategory.bulkCreate(
          subcategories.map(([categoryId, subcategory]: [number, string]) => ({
            categoryId: categoryId,
            subcategory: subcategory
          })),
          {
            ignoreDuplicates: true,
            transaction: transaction
          }
        );
    }

    public static createSubcategory(category: Category, subcategory: string, transaction?: Transaction): Promise<Subcategory> {
      return Subcategory.findOrCreate({
        where: {
          subcategory: subcategory
        },
        defaults: {
          categoryId: category.categoryId,
          subcategory: subcategory
        },
        transaction: transaction
      }).then(([createdSubcategory, created]: [Subcategory, boolean]) => {
        console.log(createdSubcategory);

        return Promise.resolve(createdSubcategory);
      }).catch(err => Promise.reject(err));
    }

    public getAllCategories(): Promise<Array<Category>> {
        return Category.findAll({include: [Category.Subcategories]});
    }

    public getAllSubcategories(): Promise<Array<Subcategory>> {
        return Subcategory.findAll();
    }
}
