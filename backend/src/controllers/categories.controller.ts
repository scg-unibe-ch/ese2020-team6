import express, { Router, Request, Response } from 'express';
import { verifyToken } from '../middlewares/checkAuth';
import { CategoriesService } from '../services/categories.service';
import { Categories } from '../models/categories.model';
import { Subcategories } from '../models/subcategories.model';

const categoriesController: Router = express.Router();
const categoriesService = new CategoriesService();

// categoriesController.get('/categories', verifyToken,
// (req: Request, res: Response) => {
//     categoriesService.getAllCategories()
//     .then((categoires: Array<Categories>) => res.send(categoires))
//     .catch((err: any) => res.status(500).send(err));
// });

<<<<<<< HEAD:backend/src/controllers/categories.controller.ts
categoriesController.get('/subcategories', verifyToken,
(req: Request, res: Response) => {
    categoriesService.getAllSubcategories()
    .then((subcategoires: Array<Subcategories>) => res.send(subcategoires))
    .catch((err: any) => res.status(500).send(err));
});

export const CategoriesController: Router = categoriesController;
=======
// categoriesController.get('/subcategories', verifyToken,
// (req: Request, res: Response) => {
//     categoriesService.getAllSubcategories()
//     .then((subcategoires: Array<Subcategories>) => res.send(subcategoires))
//     .catch((err: any) => res.status(500).send(err));
// });
>>>>>>> 186e7739059bec7fe6c0a96404af00c1b8982979:backend/src/controllers/categories.controllers.ts
