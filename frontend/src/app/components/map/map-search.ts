import * as Esri from 'esri-leaflet';
import * as Geocoder from 'esri-leaflet-geocoder';
import * as Leaflet from 'leaflet';
import { MapLocations } from './map-locations';
import { SearchResultModel, SearchResultsModel } from '../../models/map/search/search-model.module';
import { Address, SearchAddressModel } from '../../models/map/address/address.model';
import { Location, LocationModel } from '../../models/map/location/location.model';

export abstract class MapSearch extends MapLocations {

  protected searchResults: SearchResultsModel<SearchAddressModel>;
  protected geoSearch: Geocoder.GeoSearch;


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

  public build(): Leaflet.Map {
    super.build();
    this.addGeoSearch()
    this.addSearchListener();
    return this._map;
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
      this.showResults();
    });
  }

  private saveResults(searchResults: SearchResultsModel<SearchAddressModel>): void {
    this.searchResults = searchResults;
  }

  private showResults(): void {
    this.clearLocations().pushLocationBySearchResults(this.searchResults, 1);
  }

  protected abstract onSearchResults(searchResults: SearchResultsModel<SearchAddressModel>): void;

}
