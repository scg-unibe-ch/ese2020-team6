export interface RequestBuilder<T, S> {
  requestInformation: T;

  build(): S;
}
