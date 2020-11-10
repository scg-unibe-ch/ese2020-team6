import express, { Router, Request, Response } from 'express';
import { verifyToken, verifyIsAdmin } from '../middlewares/checkAuth';
import { CategoriesService } from '../services/categories.service';
import { Categories, CategoriesAttributes } from '../models/categories.model';
import { Subcategories, SubcategoriesAttributes } from '../models/subcategories.model';
const categoriesController: Router = express.Router();
const categoriesService = new CategoriesService();

categoriesController.get('/categories', verifyToken,
(req: Request, res: Response) => {
    categoriesService.getAllCategories()
    .then((categoires: Array<Categories>) => res.send(categoires))
    .catch((err: any) => res.status(500).send(err));
});

categoriesController.get('/subcategories', verifyToken,
(req: Request, res: Response) => {
    categoriesService.getAllSubcategories()
    .then((subcategoires: Array<Subcategories>) => res.send(subcategoires))
    .catch((err: any) => res.status(500).send(err));
});
