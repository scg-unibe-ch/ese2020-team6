import { CountModel, Count } from 'src/app/models/count/count.model';

export interface CountResponseModel<T> extends Omit<CountModel<T>, 'counts'> {
  counts: Array<CountResponseModel<T>> | number;
}

export class CountResponse<T> implements CountResponseModel<T> {
  constructor(
    public counts: Array<CountResponseModel<T>> | number,
    public total: number,
    public data: T
  ) { }

  public static isCopuntResponseModel<T>(count: CountResponseModel<T>): count is CountResponseModel<T> {
    return Count.isCountModel(count);
  }
}
