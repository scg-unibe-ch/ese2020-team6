export class DuplicateItentifierError extends Error {
  constructor(identifierOne: string, identifierTwo: string) {
    super('You cannot declate both \'' + identifierOne + '\' and \'' + identifierTwo + '\'!');
  }
}
