import * as Leaflet from 'leaflet';
import { SearchResultModel } from './search-result.model';
import { Location, LocationModel } from '../location/location.model';

export abstract class SearchResultsModel<T> {
  abstract bounds: Leaflet.LatLngBounds;
  abstract latlng: Leaflet.LatLng;
  abstract text: string;
  abstract results: Array<SearchResultModel<T>>;


    public static transformResultsToLocations(searchResults: SearchResultsModel<any>, map: Leaflet.Map): Array<LocationModel> {
      let results: Array<SearchResultModel<any>> = searchResults.results;
      return results.map((searchResult: SearchResultModel<any>) => {
        return SearchResultModel.transformResultToLocation(searchResult, map);
      });
    }
}
