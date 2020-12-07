import { StatusError } from '../errors/status.error';
import jwt from 'jsonwebtoken';

export interface DecodedToken {
  userName: string;
  userId: number;
  iat: number;
  exp: number;
  token: Token;
}

export function isDecodedToken(decoded: DecodedToken): decoded is DecodedToken {
  return decoded.userName
      && decoded.userId
      && decoded.iat
      && decoded.exp
      && decoded.token
      && Token.isToken(decoded.token) ? true : false;
}

export class Token {

  get token(): string {
    return this._token;
  }

  get bearerToken(): string {
    return 'Bearer ' + this._token;
  }

  private _token: string;

  constructor(userNameOrToken: string, userId?: number) {
    if (userId) {
      const secret = process.env.JWT_SECRET;
      this._token = jwt.sign({
        userName: userNameOrToken,
        userId: userId
      }, secret, { expiresIn: '2h' });
    } else {
      this._token = userNameOrToken;
    }
  }

  public static isToken(token: Token): token is Token {
    return token.token && token.bearerToken ? true : false;
  }

  public static parse(tokenOrBearer: string) {
    if (tokenOrBearer) {
      return new Token(tokenOrBearer.replace(/Bearer /, ''));
    }
  }

  public verify(): Promise<DecodedToken> {
    const secret = process.env.JWT_SECRET;
    try {
      const decoded: DecodedToken = jwt.verify(this.token, secret) as DecodedToken;
      return Promise.resolve(Object.assign(decoded, { token: this }));
    } catch (error) {
      return Promise.reject(new StatusError('Unauthorized', 401));
    }
  }

  public toString = () => this._token;
}
