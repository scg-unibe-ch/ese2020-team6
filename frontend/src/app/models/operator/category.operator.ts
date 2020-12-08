import { Observable} from 'rxjs';
import { Categories, CategoryModel } from '../category/category.module';

export function transformCategory(source: Observable<Array<CategoryModel>>): Observable<Categories> {
  return new Observable(subscriber => {
    const subscription = source.subscribe({
      next(categoryModels: Array<CategoryModel>) {
        let categories: Categories = Categories.buildFromCategoryModels(categoryModels);
        subscriber.next(categories);
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
