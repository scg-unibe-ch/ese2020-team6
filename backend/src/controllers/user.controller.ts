import express, { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { PreferenceController } from './preference.controller';
import { verifyToken, checkForAuth } from '../middlewares/checkAuth';
import { UserAttributes, User } from '../models/user.model';
import { AddressAttributes, Address } from '../models/address.model';

const userController: Router = express.Router();

// multer for saving image
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req: Request, file: any, cb: any) {

        cb(null, 'assets');
    },
    filename: function(req: Request, file: any, cb: any) {
        cb(null, new Date().toISOString() + file.fieldname);
    }
});
const fileFilter = (req: Request, file: any, cb: any) => {
    if (file.mimetype === 'image/jpg' ||
         file.mimetype === 'image/png' ||
         file.mimetype === 'image/jpeg') {
            cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

// extract address from form
function convertAddress(form: any): any {
    const addressObject = {
        'streetName': form.streetName,
        'streetType': form.streetType,
        'addressNumber': form.addressNumber,
        'city': form.city,
        'country': form.country,
        'neighbourhood': form.neighbourhood,
        'postal': form.postal,
        'region': form.region,
        'streetAddress': form.streetAddress
    };
    return addressObject;
}
// extract user from form
function convertUser(form: any): any {
    const data = {
        'email': form.email,
        'firstName': form.firstName,
        'lastName': form.lastName,
        'gender': form.gender,
        'password': form.password,
        'repeatPassword': form.repeatPassword,
        'phonenumber': form.phonenumber,
        'userName': form.userName
    };
    return data;
}

userController.post('/register', upload.single('picture'),
    (req: Request, res: Response) => {

      const user: UserAttributes = convertUser(req.body);
      const address: AddressAttributes = convertAddress(req.body);

        UserService.register(user, address).then((registeredUser: User) => res.send(registeredUser)).catch((err: any) => {
          if (err.status) {
            res.status(err.status);
          } else {
            res.status(500);
          }
          res.send(err);
        });
    }
);

userController.post('/login',
    (req: Request, res: Response) => {
        UserService.login(req.body).then(login => res.send(login)).catch((err: any) => res.status(500).send(err));
    }
);

userController.get('/userid/:userId', checkForAuth,
  (req: Request, res: Response, next) => {
    UserService.getUserById(parseInt(req.params.userId, 10)).then((user: UserAttributes) => {
      const tokenPayload = req.body.tokenPayload;
      if (tokenPayload) {
        if (tokenPayload.userId === user.userId) {
          res.send(user);
        } else {
          res.send(UserService.cutUserInformation(user));
        }
      } else {
        res.send(UserService.cutUserInformation(user));
      }
    }).catch((err: any) => res.status(500).send(err));
  }
);

userController.use('/preference', PreferenceController);

export const UserController: Router = userController;
