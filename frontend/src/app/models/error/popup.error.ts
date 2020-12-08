export class PopupNotClosedError extends Error {
  constructor(){ super('Popup is not closed yet!') }
}

export class PopupStillOpenError extends Error {
  constructor(){ super('Popup is still open!') }
}
