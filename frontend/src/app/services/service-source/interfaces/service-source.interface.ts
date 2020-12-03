import { Observable } from 'rxjs';

export interface IServiceSource<T> {
  getSource(): Observable<T>;
  setSource(source: Observable<T>): Promise<Observable<T>>;
  resetSource(): Promise<void>;
}
