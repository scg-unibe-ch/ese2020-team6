import { ElementRef } from '@angular/core';

import * as Geocoder from 'esri-leaflet-geocoder';
import * as Leaflet from 'leaflet';
import { Map } from './map';

import { SearchResultsModel } from '../../models/map/search/search-model.module';
import { LocationModel } from '../../models/map/location/location.model';
import { Address, NullAddress } from '../../models/map/address/address.model';

export class MapLocations extends Map {

  private locations: Array<LocationModel> = new Array<LocationModel>();
  private locationLayerGroup: Leaflet.LayerGroup;

  constructor(
    basemapLayerString: string,
    center: LocationModel,
  ) {
    super(basemapLayerString, center);
  }

  public build(basemapLayerString?: string, center?: LocationModel, container?: ElementRef): void {
    super.build(basemapLayerString, center, container);
    this.addLocationLayerGroup();
  }

  private addLocationLayerGroup(): void {
    if (this.locationLayerGroup) this.locationLayerGroup.remove();
    this.locationLayerGroup = Leaflet.layerGroup();
    this.locationLayerGroup.addTo(this._map);
  }

  public pushLocations(locations: Array<LocationModel>): void {
    this.locations = this.locations.concat(locations);
    this.showLocations();
  }

  public pushLocation(location: LocationModel): void {
    this.locations.push(location);
    this.showLocations();
  }

  public pushLocationByAddress(address: Address, maxResults?: number): void {
    if (!(address instanceof NullAddress)) this.pushLocationByText(address.toString(), maxResults);
  }

  private pushLocationByText(locationText: string, maxResults?: number): void {
    Geocoder.geocode().text(locationText).run((err, searchResults: SearchResultsModel<any>) => {
      if (err) {
        console.log(err);
        return;
      } else {
        this.pushLocationBySearchResults(searchResults, maxResults);
      }
    });
  }

  public geocodeLocationText(locationText: string, runOnResults: (err, searchResults: SearchResultsModel<any>) => void): void {
    Geocoder.geocode().text(locationText).run(runOnResults);
  }

  public pushLocationBySearchResults(searchResults: SearchResultsModel<any>, maxResults?: number): void {
    let locations: Array<LocationModel> = SearchResultsModel.transformResultsToLocations(searchResults, this._map);
    if (!maxResults) maxResults = locations.length;
    this.pushLocations(locations.slice(0, maxResults));
    this.showLocations();
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
