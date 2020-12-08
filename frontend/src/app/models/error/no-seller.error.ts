export class NoSellerError extends Error {
  constructor() {
    super('No seller was supplied, needs to have a seller!');
  }
}
