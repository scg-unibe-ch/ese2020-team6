export class RegisterUser {

  constructor(
    public firstName: String = "",
    public lastName: String = "",
    public username: String = "",
    public email: String = "",
    public password: String = "",
    public repeatPassword: String = "",
    public phonenumber: String = "",
    public plz: String = "",
    public city: String = "",
    public street: String = "",
    public houseNumber: String = "",
    public gender: String = ""
  ) {}
}
