import { ElementRef } from '@angular/core';

import * as Esri from 'esri-leaflet';
import * as Geocoder from 'esri-leaflet-geocoder';
import * as Leaflet from 'leaflet';
import { Map } from './map';

export class Locations extends Map {

  private locations: Array<{lat: number, lang: number}> = new Array<{lat: number, lang: number}>();
  private location;

  constructor(
    baseLayer: string,
    options: { center: Array<number>, zoom: number },
  ) {
    super(baseLayer, options);
  }

  public build(): Leaflet.Map {
    super.build();
    this.addLocation();
    return this._map;
  }

  private addLocation(): Locations {
    this.location = Leaflet.layerGroup().addTo(this._map);
    return this;
  }

  public pushLocations(locations: Array<{lat: number, lang: number}>): void {
    this.locations = this.locations.concat(locations);
  }

  public pushLocation(location: {lat: number, lang: number}): void {
    this.locations.push(location);
  }

  public clearLocations(): void {
    this.locations = [];
    this.location.clearLayers();
  }

  public showLocations(): void {
    this.locations.forEach((location) => {
      this.location.addLayer(Leaflet.marker(location));
    });
  }
}
