import express, { Router, Request, Response } from 'express';
import { verifyToken, checkForAuth } from '../middlewares/checkAuth';
const preferenceController: Router = express.Router();

preferenceController.get('/get', verifyToken, (req: Request, res: Response) => {
  console.log('hi');
});

preferenceController.get('/put', verifyToken, (req: Request, res: Response) => {
  console.log('hii');
});


export const PreferenceController: Router = preferenceController;
