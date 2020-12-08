import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { PostProductResponseModel } from 'src/app/models/response/response.module';
import { PostProductRequestBuilder } from 'src/app/models/request/request.module';
import { environment } from 'src/environments/environment';
import { transformAddress } from 'src/app/models/operator/address.operator';

@Injectable({
  providedIn: 'root'
})
export class PostProductService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  public postProduct(requestBuilder: PostProductRequestBuilder): Observable<PostProductResponseModel> {
    return this.httpClient.post<PostProductResponseModel>(
      environment.endpointURL + 'product/post', requestBuilder.buildPostProductRequest()).pipe(transformAddress());
  }
}
