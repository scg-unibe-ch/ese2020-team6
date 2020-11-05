import * as Esri from 'esri-leaflet';
import * as Geocoder from 'esri-leaflet-geocoder';
import * as Leaflet from 'leaflet';
import { Locations } from './locations';

export abstract class Search extends Locations {

  protected _searchResults;
  protected search;


  private arcgisOnline = Geocoder.arcgisOnlineProvider();
  private gisDay = Geocoder.featureLayerProvider({
    url: 'https://services.arcgis.com/uCXeTVveQzP4IIcx/arcgis/rest/services/GIS_Day_Final/FeatureServer/0',
    searchFields: ['Name', 'Organization'],
    label: 'GIS Day Events',
    formatSuggestion: (feature) => feature.properties.Name + ' - ' + feature.properties.Organization
  });

  constructor(
    baseLayer: string,
    options: { center: Array<number>, zoom: number }
  ) {
    super(baseLayer, options);
  }

  public build(): Leaflet.Map {
    super.build();
    this.addSearch().addSearchListener();
    return this._map;
  }

  private addSearch(): Search {
    this.search = Geocoder.geosearch({
      providers: [this.arcgisOnline, this.gisDay] // will geocode via ArcGIS Online and search the GIS Day feature service.
    }).addTo(this._map)

    return this;
  }

  private addSearchListener(): Search {
    this.search.on("results", (data) => {
      this.saveResults(data);
      this.onSearchResults(data);
      this.showResults();
    });
    return this;
  }

  private saveResults(data): void {
    this._searchResults = data;
  }

  private showResults(): void {
    let locations = this._searchResults.results.map(result => result.latlng);
    this.clearLocations();
    this.pushLocations(locations);
    this.showLocations();
  }

  protected abstract onSearchResults(data): void;

  get searchResults() {
    return this._searchResults;
  }

}
