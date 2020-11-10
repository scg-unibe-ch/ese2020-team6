import { EndpointUrlBuilder } from './endpoint-url-builder';

describe('EndpointUrlBuilder', () => {
  it('should create an instance', () => {
    expect(new EndpointUrlBuilder()).toBeTruthy();
  });
});
