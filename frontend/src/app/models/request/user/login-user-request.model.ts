export type LoginUserRequestModel = LoginWithToken | LoginWithUsernameEmail;


export interface LoginWithToken {
  userId: number;
}

export interface LoginWithUsernameEmail {
  userName: string,
  email: string,
  password: string
}
