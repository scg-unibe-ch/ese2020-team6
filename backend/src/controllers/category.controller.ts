import express, { Router, Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Subcategory } from '../models/subcategory.model';
const categoryController: Router = express.Router();
const categoryService = new CategoryService();

categoryController.get('/categories',
(req: Request, res: Response) => {
    categoryService.getAllCategories()
    .then((categoires: Array<Category>) => res.send(categoires))
    .catch((err: any) => {
      console.log(err);
      res.status(500).send(err); });
});

categoryController.get('/subcategories',
(req: Request, res: Response) => {
    categoryService.getAllSubcategories()
    .then((subcategoires: Array<Subcategory>) => res.send(subcategoires))
    .catch((err: any) => res.status(500).send(err));
});

export const CategoryController: Router = categoryController;
