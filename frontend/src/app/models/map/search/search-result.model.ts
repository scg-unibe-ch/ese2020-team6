import * as Leaflet from 'leaflet';
import { Location, LocationModel } from '../location/location.model';

export abstract class SearchResultModel<T> {
  abstract text: string;
  abstract bounds: Leaflet.LatLngBounds;
  abstract latlng: Leaflet.LatLng;
  abstract properties: T;
  abstract score: number;

  public static transformResultToLocation(searchResult: SearchResultModel<any>, map: Leaflet.Map): LocationModel {
    let latlng: Leaflet.LatLng = searchResult.latlng;
    let bounds: Leaflet.LatLngBounds = searchResult.bounds;
    let zoom: number = map.getBoundsZoom(bounds);

    return new Location(latlng, zoom);
  }
}
