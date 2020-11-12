import * as Leaflet from 'leaflet';

export interface LocationModel {
  latlng: Leaflet.LatLng;
  zoom: number;
}

export class Location implements LocationModel {
  constructor(
    public latlng: Leaflet.LatLng,
    public zoom: number
  ) { }
}
