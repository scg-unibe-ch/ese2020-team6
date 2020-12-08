export class NoBuyerError extends Error {
  constructor() {
    super('No buyers were supplied, must have at least one buyer!')
  }
}
