import { environment } from '../../environments/environment';
import { EndpointURLSegment } from '../models/endpoint/endpoint-url-segment';

export class EndpointUrlBuilder {

  private endpointURLSegment: EndpointURLSegment;

  constructor(
    endpointURLSegment: EndpointURLSegment
  ) {
    this.endpointURLSegment = endpointURLSegment;
  }

  public build(endpointURLExtenstion: string): string {
    return environment.endpointURL + this.endpointURLSegment + endpointURLExtenstion;
  }

}
