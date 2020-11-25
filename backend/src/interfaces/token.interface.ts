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

  constructor(private tokenOrBearer: string) {
    if (tokenOrBearer) { this._token = tokenOrBearer.replace(/Bearer /, ''); }
  }
  private _token: string;

  public static isToken(token: Token): token is Token {
    return token.token && token.bearerToken ? true : false;
  }

  public toString = () => this._token;
}
