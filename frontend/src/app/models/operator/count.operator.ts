import { OperatorFunction} from 'rxjs';
import { transformator } from './transformator';
import { CountResponseModel, CountResponse } from '../response/response.module';
import { Count } from '../count/count.model';

export function transformCount<T, S>(): OperatorFunction<any, any> {
  return transformator<CountResponseModel<S>, T>(Count.buildFromCountResponseModel, CountResponse.isCopuntResponseModel);
}
