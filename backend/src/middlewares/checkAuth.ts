import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { User, UserAttributes } from '../models/user.model';

// this way you can just define a function and export it instead of a whole class
export function verifyToken(req: Request, res: Response, next: any) {
    try {
        // get secret key from environment (defined in nodemon.json)
        const secret = process.env.JWT_SECRET;
        // since the Authorizationheader consists of "Bearer <token>" where <token> is a JWT token
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, secret);
        if (decoded == null) {
            res.status(403).send({ message: 'Unauthorized' });
        }
        // adds the field "tokenPayload" to the request enabling following functions to use data from the token
        req.body.tokenPayload = decoded;
        console.log(decoded);
        next();
    } catch (err) {
        res.status(403).send({ message: 'Unauthorized' });
    }
}

export function checkForAuth(req: Request, res: Response, next: any) {
    const auth = req.headers.authorization;
    if (auth) { verifyToken(req, res, next); } else { next(); }
}

export function verifyIsAdmin(req: Request, res: Response, next: any) {
    if (req.body.tokenPayload) {
        const currentUserId: number = req.body.tokenPayload.userId;
        User.findOne({
            where: {
                userId: currentUserId,
            }
        }).then((user: UserAttributes) => {
            if (user.isAdmin) {
                req.body.tokenPayload.isAdmin = true;
                next();
            } else {
                res.status(403).send({ message: 'Unauthorized' });
            }
        }).catch((err: any) => {
            res.status(403).send(err); });
    } else {
        res.status(403).send({ message: 'Unauthorized' });
    }
}
