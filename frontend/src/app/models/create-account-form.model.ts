export class CreateAccountForm {

  constructor(
    public firstName: String = "",
    public lastName: String = "",
    public userName: String = "",
    public email: String = "",
    public password: String = "",
    public phonenumber: Number = -1,
    public plz: Number = -1,
    public city: String = "",
    public street: String = "",
    public houseNumber: String = "",
    public gender: String = ""
  ) {}
}
