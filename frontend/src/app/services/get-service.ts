import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EndpointURLSegment } from '../models/endpoint/endpoint-url-segment';
import { EndpointUrlBuilder } from './endpoint-url-builder';

export class GetService extends EndpointURLSegment {

  private endpoiontURLBuilder: EndpointUrlBuilder;

  constructor(
    endpointURLSegment: string,
    private httpClient: HttpClient
  ) {
    super(endpointURLSegment);
    this.endpoiontURLBuilder = new EndpointUrlBuilder(this);
  }

  protected get<T>(endpointURLExtenstion: string): Observable<T> {
    const endpointURL: string = this.endpoiontURLBuilder.build(endpointURLExtenstion);
    return this.httpClient.get<T>(endpointURL);
  }
}
