import { SearchModel } from './search.model';

export interface SearchRequestBuilder {
  buildSearchRequest(): SearchModel;
}
