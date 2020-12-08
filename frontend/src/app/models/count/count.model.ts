import { Is } from '../compare/is'
import { CountResponseModel } from '../response/response.module';

export interface CountModel<T> {
  counts: Array<CountModel<T>> | number;
  total: number;
  data: T;
}

export class Count<T> implements CountModel<T> {


  constructor();
  constructor(counts: Array<Count<T>> | number, data?: T);
  constructor(counts?: Array<Count<T>> | number, data?: T) {
    if (counts) {
      if (Array.isArray(counts)) {
        this.counts = counts;
        this.total = Count.getTotal(counts);
      } else {
        this.counts = counts;
        this.total = counts as number;
        this.isNumber = true;
      }
    } else {
      this.counts = new Array<Count<T>>();
      this.total = 0;
    }
    this.data = data;
  }

  public data: T;
  public counts: Array<Count<T>> | number;
  public total: number;
  public isNumber = false;

  static getTotal<T>(counts: Array<Count<T>>): number {
    let total = 0;
    counts.forEach((count: Count<T>) => {
        total += count.getTotal();
    });
    return total;
  }

  public setData(data: T): void {
    this.data = data;
  }

  public addCount(count: Count<T>): void {
    if (!this.isNumber) {
      (this.counts as Array<Count<T>>).push(count);
      this.total += count.total;
    } else {
      (this.counts as number) += count.total;
      this.total += count.total;
    }
  }

  public getTotal(): number {
    if (this.isNumber) {
      return this.total;
    } else {
      let total = 0;
      (this.counts as Array<Count<T>>).forEach((count: Count<T>) => {
          total += count.getTotal();
      });
      return total;
    }
  }

  public static buildFromCountResponseModel<T>(count: CountResponseModel<T>): Count<T> {
    let counts: Array<Count<T>> | number;
    if (Array.isArray(count.counts)) {
      counts = new Array<Count<T>>();
      (count.counts as Array<CountResponseModel<T>>).forEach((count: CountResponseModel<T>) => {
        (counts as Array<Count<T>>).push(Count.buildFromCountResponseModel(count))
      });
    } else (counts as number) = count.counts as number;
    return new Count<T>(counts, count.data);
  }

  public static isCountModel<T>(count: CountModel<T>): count is CountModel<T> {
    let countCheck: boolean;
    if (typeof count.counts === 'number') {
      countCheck = (count.counts !== undefined &&
        count.counts != undefined &&
        count.counts !== null &&
        count.counts != null) ? true : false;
    } else if (Array.isArray(count.counts)) {
      countCheck = !(count.counts as Array<CountModel<T>>).map((count: CountModel<T>) => {
        return Count.isCountModel(count) ;
      }).includes(false)
    }
    return Is.is(count, ['total']) && countCheck;
  }
}
