export class CreateAccountForm {
  constructor(
    public firstName: String,
    public lastName: String,
    public userName: String,
    public email: String,
    public password: String,
    public repeatPassword: String,
    public phonenumber: Number,
    public plz: Number,
    public city: String,
    public street: String,
    public houseNumber: String,
    public gender: String
  ) {}
}
