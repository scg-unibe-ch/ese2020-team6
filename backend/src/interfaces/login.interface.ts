import { User } from '../models/user.model';
import { Token } from '../interfaces/token.interface';

export interface LoginResponse {
  user: User;
  token: string;
}

export type LoginRequest = LoginWithToken | LoginWithUsernameEmail;

export interface LoginWithUsernameEmail {
  userName?: string;
  email?: string;
  password: string;
}

export interface LoginWithToken {
  userId: number;
  token: Token;
}

export function isLoginWithUserNameEmail(loginRequest: LoginWithUsernameEmail): loginRequest is LoginWithUsernameEmail {
  return (loginRequest.userName
      || loginRequest.email)
      && loginRequest.password.length > 0 ? true : false;
}

export function isLoginWithToken(loginRequest: LoginWithToken): loginRequest is LoginWithToken {
  return loginRequest.userId
      && loginRequest.token
      && Token.isToken(loginRequest.token) ? true : false;
}
