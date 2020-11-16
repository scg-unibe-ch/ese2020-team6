export class EndpointURLSegment {
  private _segment: string;

  constructor(
    segment: string 
  ) {
    this._segment = segment;
  }

  public toString: () => string = (): string => {
    return this._segment;
  }
}
