import { Request, Response } from 'express';
import { DecodedToken, Token } from '../interfaces/token.interface';
import { handleError } from '../errors/status.error';
import { UserService } from '../services/user.service';
import connect from 'connect';

export function combineMiddlewares(...middlewares: any[]) {
  const chain = connect();
  middlewares.forEach((middleware) => {
    chain.use(middleware);
  });
  return chain;
}

// this way you can just define a function and export it instead of a whole class
export function verifyToken(req: Request, res: Response, next: any) {
  Token.parse(req.headers.authorization).verify()
  .then((decoded: DecodedToken) => {
    req.body.tokenPayload = decoded;
    next();
  }).catch((err: any) => res.status(401).send({ message: 'Unauthorized' }));
}

export function checkForAuth(req: Request, res: Response, next: any) {
    const auth = req.headers.authorization;
    if (auth) { verifyToken(req, res, next); } else { next(); }
}

export function verifyIsAdmin(req: Request, res: Response, next: any) {
    combineMiddlewares(verifyToken, (_req: Request, _res: Response, _next: any) => {
      const currentUserId: number = _req.body.tokenPayload.userId;
      UserService.isAdmin(currentUserId).then(() => {
        _req.body.tokenPayload.isAdmin = true;
        _next();
      }).catch((err: any) => handleError(err, res));
    })(req, res, next);
}
