import { Observable} from 'rxjs';
import { Orders, OrderModel } from '../order/order.model';

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
