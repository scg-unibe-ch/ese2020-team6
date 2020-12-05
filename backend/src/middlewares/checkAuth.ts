import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { User, UserAttributes } from '../models/user.model';
import { DecodedToken, Token } from '../interfaces/token.interface';

// this way you can just define a function and export it instead of a whole class
export function verifyToken(req: Request, res: Response, next: any) {
  try {
    verifyTokenPromise(new Token(req.headers.authorization))
    .then((decoded: DecodedToken) => {
      req.body.tokenPayload = decoded;
      next();
    }).catch((err: any) => res.status(403).send({ message: 'Unauthorized' }));
  } catch (err) {
    res.status(403).send({ message: 'Unauthorized' });
  }
}

export function verifyTokenPromise(token: Token): Promise<DecodedToken> {
  const secret = process.env.JWT_SECRET;
  try {
    const decoded: DecodedToken = jwt.verify(token.token, secret) as DecodedToken;
    return Promise.resolve(Object.assign(decoded, { token }));
  } catch (error) {
    return Promise.reject(error);
  }
}

export function refreshTokenPromise(token: Token): Promise<Token> {
  return verifyTokenPromise(token)
  .then((decoded: DecodedToken) => createTokenPromise(decoded.userName, decoded.userId));
}

export function createTokenPromise(userName: string, userId: number): Promise<Token> {
  const secret = process.env.JWT_SECRET;
  const token: Token = new Token(jwt.sign({
    userName: userName,
    userId: userId
  }, secret, { expiresIn: '2h' }));

  return Promise.resolve(token);
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
        }).catch((err: any) => res.status(403).send(err));
    } else {
        res.status(403).send({ message: 'Unauthorized' });
    }
}
