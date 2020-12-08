export class NoMessageThreadIdError extends Error {
  constructor(productId: number) {
    super('No messageThreadId set for thread with productId \'' + productId + '\'!');
  }
}
