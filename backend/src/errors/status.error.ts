import { Response } from 'express';

export class StatusError extends Error {

  private _status: number;
  get status(): number {
    return this._status;
  }
  set status(status: number) {
    if (new RegExp(/^\d{3}$/).test(status.toString())) {
      this._status = status;
    } else {
      throw new Error('Status has to bee a three digit integer!');
    }
  }

  constructor(message: string, status?: number) {
    super(message);
    if (status) {
      this.status = status;
    }

    Object.setPrototypeOf(this, StatusError.prototype);
  }
}

export function handleError(err: any, res: Response): void {
  if (err instanceof Error) {
    if (err instanceof StatusError) {
      res.status(err.status);
    } else {
      res.status(500);
    }
    res.send({ message: err.message });
  } else {
    res.status(500).send(err);
  }
}
