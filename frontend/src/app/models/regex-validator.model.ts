export class RegexValidator {
  constructor(
    public regex: RegExp,
    public name: string,
    public errorMessage: string
  ) {}
}
