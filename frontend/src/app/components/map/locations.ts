import { ElementRef } from '@angular/core';

import * as Esri from 'esri-leaflet';
import * as Geocoder from 'esri-leaflet-geocoder';
import * as Leaflet from 'leaflet';
import { Map } from './map';

export class Locations extends Map {

  private locations: Array<Leaflet.LatLng> = new Array<Leaflet.LatLng>();
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

  public pushLocations(locations: Array<Leaflet.LatLng>): Locations {
    this.locations = this.locations.concat(locations);
    this.showLocations();
    return this;
  }

  public pushLocation(location: Leaflet.LatLng): Locations {
    this.locations.push(location);
    this.showLocations();
    return this;
  }

  public pushLocationByText(location: string): Locations {
    Geocoder.geocode().text(location).run((err, searchResults, response) => {
      if (err) {
        console.log(err);
        return;
      }
      let results = searchResults.results;
      this.locations.push(results[0].latlng);
      this.showLocations();
    });
    return this;
  }

  public clearLocations(): Locations {
    this.locations = [];
    this.location.clearLayers();
    return this;
  }

  private showLocations(): void {
    console.log(this.locations);

    this.locations.forEach((location) => {
      this.location.addLayer(Leaflet.marker(location));
      this._map.setView(location);
    });
  }
}
