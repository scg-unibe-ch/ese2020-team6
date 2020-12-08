export interface ICount<T> {
  counts: Array<ICount<T>> | number;
  total: number;
  data: T;
}

export class Count<T> implements ICount<T> {


  constructor();
  constructor(counts: Array<Count<T>> | number, data?: T);
  constructor(counts?: Array<Count<T>> | number, data?: T) {
    if (Array.isArray(counts)) {
      this.counts = counts as Array<Count<T>>;
      this.total = Count.getTotal(counts);
    } else {
      this.counts = counts as number;
      this.total = counts as number;
      this.isNumber = true;
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
}
