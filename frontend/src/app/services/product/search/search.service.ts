import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
// Models
import { ProductModel } from '../../../models/product/product.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(
    private httpClient: HttpClient
  ) { }


  public getSearchedProducts(criteria: any): Observable<Array<ProductModel>> {
    console.log('somebody here in httprequest??????');
    let params = new HttpParams();
    params = params.append('category', criteria.category);
    params = params.append('subcategory', criteria.subcategory);
    params = params.append('price', criteria.price);
    params = params.append('location', criteria.location);
    params = params.append('isDeliverable', criteria.deliverable);
    params = params.append('status', criteria.status);
    console.log(params, 'params good?');
    return this.httpClient.get<Array<ProductModel>>(
      environment.endpointURL + 'product/search/', {params});
  }
}
