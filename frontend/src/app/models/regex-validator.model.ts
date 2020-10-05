export class RegexValidator {

  constructor(
    public regex: RegExp,
    public name: String,
    public errorMessage: String
  ) {}
}
