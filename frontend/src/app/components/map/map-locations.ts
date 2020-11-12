import { ElementRef } from '@angular/core';

import * as Esri from 'esri-leaflet';
import * as Geocoder from 'esri-leaflet-geocoder';
import * as Leaflet from 'leaflet';
import { Map } from './map';

import { SearchResultsModel } from '../../models/map/search/search-model.module';
import { LocationModel } from '../../models/map/location/location.model';
import { Address } from '../../models/map/address/address.model';

export class MapLocations extends Map {

  private locations: Array<LocationModel> = new Array<LocationModel>();
  private locationLayerGroup: Leaflet.LayerGroup;

  constructor(
    basemapLayerString: string,
    center: LocationModel,
  ) {
    super(basemapLayerString, center);
  }

  public build(basemapLayerString?: string, center?: LocationModel, container?: ElementRef): Leaflet.Map {
    super.build(basemapLayerString, center, container);
    this.addLocationLayerGroup();
    return this._map;
  }

  private addLocationLayerGroup(): void {
    if (this.locationLayerGroup) this.locationLayerGroup.remove();
    this.locationLayerGroup = Leaflet.layerGroup();
    this.locationLayerGroup.addTo(this._map);
  }

  public pushLocations(locations: Array<LocationModel>): MapLocations {
    this.locations = this.locations.concat(locations);
    this.showLocations();
    return this;
  }

  public pushLocation(location: LocationModel): MapLocations {
    this.locations.push(location);
    this.showLocations();
    return this;
  }

  public pushLocationByAddress(address: Address, maxResults?: number): MapLocations {
    console.log(address);

    this.pushLocationByText(address.toString(), maxResults);
    return this;
  }

  public pushLocationByText(locationText: string, maxResults?: number): MapLocations {
    Geocoder.geocode().text(locationText).run((err, searchResults: SearchResultsModel<any>) => {
      if (err) {
        console.log(err);
        return;
      }
      this.pushLocationBySearchResults(searchResults, maxResults);
    });
    return this;
  }

  public pushLocationBySearchResults(searchResults: SearchResultsModel<any>, maxResults?: number): MapLocations {
    let locations: Array<LocationModel> = SearchResultsModel.transformResultsToLocations(searchResults, this._map);
    if (!maxResults) maxResults = locations.length;
    this.pushLocations(locations.slice(0, maxResults));
    this.showLocations();
    return this;
  }

  public clearLocations(): MapLocations {
    this.locations = new Array<LocationModel>();
    this.locationLayerGroup.clearLayers();
    return this;
  }

  private showLocations(): void {
    this.locations.forEach((location: LocationModel) => {
      this.locationLayerGroup.addLayer(Leaflet.marker(location.latlng));
      this.setCenter(location);
      this.updateView({
        animate: true,
        pan: {
          duration: 0.5
        }
      });
    });
  }
}
