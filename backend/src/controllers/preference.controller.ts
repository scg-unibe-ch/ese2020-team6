import express, { Router, Request, Response } from 'express';
import { verifyToken } from '../middlewares/checkAuth';
import { PreferenceService } from '../services/preference.service';
import { PreferenceAttributes } from '../models/preference.model';

const preferenceController: Router = express.Router();
const preferenceService: PreferenceService = new PreferenceService();

preferenceController.use(verifyToken);

preferenceController.get('/get', (req: Request, res: Response) => {
  const userId: number = req.body.tokenPayload.userId;
  preferenceService.getPreferences(userId)
  .then((preferences: PreferenceAttributes) => res.send(preferences))
  .catch((err: any) => res.status(500).send(err));
});

preferenceController.put('/set', (req: Request, res: Response) => {
  const userId: number = req.body.tokenPayload.userId;
  const newPreferences: PreferenceAttributes = req.body;
  preferenceService.setPreferences(userId, newPreferences)
  .then((preferences: PreferenceAttributes) => res.send(preferences))
  .catch((err: any) => res.status(500).send(err));
});


export const PreferenceController: Router = preferenceController;
