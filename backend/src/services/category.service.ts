import { Transaction, Sequelize, Op } from 'sequelize';
import { Category, CategoryAttributes } from '../models/category.model';
import { Subcategory, SubcategoryAttributes } from '../models/subcategory.model';
import { StatusError } from '../errors/status.error';
import { InstanceDoesNotExistError } from '../errors/instance-does-not-exist.error';
import { InstanceDoesAlreadyExistError } from '../errors/instance-does-already-exist.error';


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
    Promise<Array<[Category, Array<Subcategory>]>> {
      const associations: Array<[Category, Array<Subcategory>]> = new Array<[Category, Array<Subcategory>]>();
      const indexedSubcategories: Record<any, Array<Subcategory>> = CategoryService.indexSubcategories(subcategories);

      categories.forEach((category: Category) => {
        associations.push([
          category,
          indexedSubcategories[category.categoryId]
        ]);
      });
      return Promise.resolve(associations);
    }

    public static setUpCategories(): Promise<Array<[Category, Array<Subcategory>]>> {
      return Category.sequelize.transaction((transaction: Transaction) => {
        const categories: Array<string> = CategoryService.getCategories();
        const allSubcategories: Array<[number, string]> = CategoryService.getAllSubcategoriesWithCategoryId();

        return Promise.all([
          CategoryService.findOrCreateCategories(categories, transaction),
          CategoryService.findOrCreateSubcategories(allSubcategories, transaction)
        ])
        .then(([createdCategories, createdSubcategories]: [Array<Category>, Array<Subcategory>]) => {
          return CategoryService.buildAssociatedCetegories(createdCategories, createdSubcategories);
        });
      });
    }

    /************************************************
      Categories creation
    ************************************************/

    public static categoriesDoNotExist(categories: Array<string>, transaction?: Transaction): Promise<void> {
      return Promise.all(categories.map((category: string) => this.categoryDoesNotExist(category, transaction)))
      .then(() => Promise.resolve());
    }

    public static categoriesDoExist(categories: Array<string>, transaction?: Transaction): Promise<Array<Category>> {
      return Promise.all(categories.map((category: string) => this.categoryDoesExist(category, transaction)));
    }


    public static findOrCreateCategories(categories: Array<string>, transaction?: Transaction): Promise<Array<Category>> {
      return this.categoriesDoExist(categories, transaction)
      .catch((err: any) => {
        if (err instanceof InstanceDoesNotExistError) {
          return Category.bulkCreate(
            categories.map((category: string) => ({
              category: category
            })),
            {
              ignoreDuplicates: true,
              transaction: transaction
            }
          );
        } else {
          return Promise.reject(err);
        }
      });
    }

    /************************************************
      Category creation
    ************************************************/

    public static categoryDoesNotExist(category: string, transaction?: Transaction): Promise<void> {
      return this.categoryDoesExist(category, transaction)
      .then(() => {
        Promise.reject(new InstanceDoesAlreadyExistError(Category.getTableName()));
      })
      .catch((err: any) => {
        if (err instanceof InstanceDoesNotExistError) {
          return Promise.resolve();
        } else {
          return Promise.reject(err);
        }
      });
    }

    public static categoryDoesExist(category: string, transaction?: Transaction): Promise<Category> {
      if (!category) {
        return Promise.reject(new InstanceDoesNotExistError(Category.getTableName()));
      }

      return Category.findOne({
        where: {
          category: category
        },
        transaction: transaction,
        rejectOnEmpty: new InstanceDoesNotExistError(Category.getTableName())
      });
    }

    public static findOrCreateCategory(category: string, transaction?: Transaction): Promise<Category> {
      return this.categoryDoesExist(category, transaction)
      .catch((err: any) => {
        if (err instanceof InstanceDoesNotExistError) {
          return Category.create({ category: category }, { transaction: transaction });
        } else {
          return Promise.reject(err);
        }
      });
    }

    /************************************************
      Subcategories creation
    ************************************************/

    public static subcategoriesDoNotExist(subcategories: Array<[number, string]>, transaction?: Transaction): Promise<void> {
      return Promise.all(subcategories.map((subcategory: [number, string]) => this.subcategoryDoesNotExist(subcategory, transaction)))
      .then(() => Promise.resolve());
    }

    public static subcategoriesDoExist(subcategories: Array<[number, string]>, transaction?: Transaction): Promise<Array<Subcategory>> {
      return Promise.all(subcategories.map((subcategory: [number, string]) => this.subcategoryDoesExist(subcategory, transaction)));
    }

    public static findOrCreateSubcategories(
      subcategories: Array<[number, string]>, transaction?: Transaction
    ): Promise<Array<Subcategory>> {
      return this.subcategoriesDoExist(subcategories, transaction)
      .catch((err: any) => {
        if (err instanceof InstanceDoesNotExistError) {
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
        } else {
          return Promise.reject(err);
        }
      });
    }

    /************************************************
      Subcategory creation
    ************************************************/

    public static subcategoryDoesNotExist(subcategory: [number, string], transaction?: Transaction): Promise<void> {
      return this.subcategoryDoesExist(subcategory, transaction)
      .then(() => {
        Promise.reject(new InstanceDoesAlreadyExistError(Subcategory.getTableName()));
      })
      .catch((err: any) => {
        if (err instanceof InstanceDoesNotExistError) {
          return Promise.resolve();
        } else {
          return Promise.reject(err);
        }
      });
    }

    public static subcategoryDoesExist([categoryId, subcategory]: [number, string], transaction?: Transaction): Promise<Subcategory> {
      if (!subcategory || !categoryId) {
        return Promise.reject(new InstanceDoesNotExistError(Subcategory.getTableName()));
      }

      return Subcategory.findOne({
        where: {
          categoryId: categoryId,
          subcategory: subcategory
        },
        transaction: transaction,
        rejectOnEmpty: new InstanceDoesNotExistError(Subcategory.getTableName())
      });
    }

    public static findOrCreateSubcategory([categoryId, subcategory]: [number, string], transaction?: Transaction): Promise<Subcategory> {
      return this.subcategoryDoesExist([categoryId, subcategory], transaction)
      .catch((err: any) => {
        if (err instanceof InstanceDoesNotExistError) {
          return Subcategory.create({ categoryId: categoryId, subcategory: subcategory }, { transaction: transaction });
        } else {
          return Promise.reject(err);
        }
      });
    }

    /************************************************
      Getters
    ************************************************/

    public getAllCategories(): Promise<Array<Category>> {
        return Category.findAll({include: [Category.associations.subcategories]});
    }

    public getAllSubcategories(): Promise<Array<Subcategory>> {
        return Subcategory.findAll();
    }
}
