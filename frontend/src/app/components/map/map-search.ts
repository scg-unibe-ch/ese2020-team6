import { ElementRef } from '@angular/core';
import * as Esri from 'esri-leaflet';
import * as Geocoder from 'esri-leaflet-geocoder';
import * as Leaflet from 'leaflet';
import { MapLocations } from './map-locations';
import { SearchResultModel, SearchResultsModel } from '../../models/map/search/search-model.module';
import { Address, SearchAddressModel } from '../../models/map/address/address.model';
import { Location, LocationModel } from '../../models/map/location/location.model';

export class MapSearch extends MapLocations {

  protected searchResults: SearchResultsModel<SearchAddressModel>;
  protected geoSearch: Geocoder.GeoSearch;
  private searchResultsSubscribers: Array<(searchResults: SearchResultsModel<SearchAddressModel>) => void> = new Array<(searchResults: SearchResultsModel<SearchAddressModel>) => void>();


  private arcgisOnline = Geocoder.arcgisOnlineProvider({
    categories: [
      'Street Address'
    ]
  });
  private gisDay = Geocoder.featureLayerProvider({
    url: 'https://services.arcgis.com/uCXeTVveQzP4IIcx/arcgis/rest/services/GIS_Day_Final/FeatureServer/0',
    searchFields: ['Name', 'Organization'],
    label: 'GIS Day Events',
    formatSuggestion: (feature) => feature.properties.Name + ' - ' + feature.properties.Organization
  });

  constructor(
    baseLayer: string,
    location: LocationModel
  ) {
    super(baseLayer, location);
  }

  public build(basemapLayerString?: string, center?: LocationModel, container?: ElementRef): void {
    super.build(basemapLayerString, center, container);
    this.addGeoSearch()
    this.addSearchListener();
  }

  private addGeoSearch(): void {
    this.geoSearch = Geocoder.geosearch({
      providers: [this.arcgisOnline] // will geocode via ArcGIS Online and search the GIS Day feature service.
    }).addTo(this._map);
  }

  private addSearchListener(): void {
    this.geoSearch.on("results", (searchResults: SearchResultsModel<SearchAddressModel>) => {
      this.saveResults(searchResults);
      this.onSearchResults(searchResults);
    });
  }

  private saveResults(searchResults: SearchResultsModel<SearchAddressModel>): void {
    this.searchResults = searchResults;
  }

  public showResults(): void {
    this.clearLocations();
    this.pushLocationBySearchResults(this.searchResults, 1);
  }

  private onSearchResults(searchResults: SearchResultsModel<SearchAddressModel>): void {
    this.searchResultsSubscribers.forEach((subscriber: (searchResults: SearchResultsModel<SearchAddressModel>) => void) => {
      subscriber(searchResults);
    });
  };

  public addResultSubscriber(subscriber: (searchResults: SearchResultsModel<SearchAddressModel>) => void): void {
    this.searchResultsSubscribers.push(subscriber);
  }

}
