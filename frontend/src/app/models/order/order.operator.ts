import { Observable, Subscription} from 'rxjs';
import { map } from 'rxjs/operators';
import { Orders, OrderModel } from './order.model';

export function transformOrder(source: Observable<Array<OrderModel>>): Observable<Orders> {
  return new Observable(subscriber => {
    const subscription = source.subscribe({
      next(orderModels: Array<OrderModel>) {
        let orders: Orders = Orders.buildFromOrderModels(orderModels);
        subscriber.next(orders);
      },
      error(error) {
        subscriber.error(error);
      },
      complete() {
        subscriber.complete();
      }
    });
    return () => subscription.unsubscribe();
  });
}
