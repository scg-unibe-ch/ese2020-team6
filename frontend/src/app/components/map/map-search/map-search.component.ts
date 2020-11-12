import { AfterViewInit, Output, Input, Component, ElementRef, ViewChild, EventEmitter } from '@angular/core';

import { MapSearch } from '../map-search';
import * as Esri from 'esri-leaflet';
import * as Geocoder from 'esri-leaflet-geocoder';
import * as Leaflet from 'leaflet';
import { SearchResultsModel, SearchResultModel } from '../../../models/map/search/search-model.module';
import { SearchAddressModel, AddressModel, Address } from '../../../models/map/address/address.model';
import { Location } from '../../../models/map/location/location.model';

@Component({
  selector: 'map-search',
  templateUrl: '../map.component.html',
  styleUrls: ['../map.component.scss']
})
export class MapSearchComponent extends MapSearch implements AfterViewInit {

  private _initLocationText: string;

  @Input()
  set initLocationText(value: any) {
    this._initLocationText = value;
    this.updateLocation();
  };

  private _initAddress: AddressModel;

  @Input()
  set initAddress(value: any) {
    this._initAddress = value;
    this.updateLocation();
  };

  @Output()
  searchResultsEmitter: EventEmitter<Array<AddressModel>> = new EventEmitter<Array<AddressModel>>();

  @ViewChild('map')
  private mapContainer: ElementRef;

  constructor() {
    super(
      'Topographic',
      new Location(new Leaflet.LatLng(46.947922, 7.440390), 6)
    )
  }

  public ngAfterViewInit(): void {
    this.setContainer(this.mapContainer).build();
    this.updateLocation()
  }

  private updateLocation(): void {
    if (this._initLocationText && this.mapContainer) {
      this.clearLocations().pushLocationByText(this._initLocationText, 1);
    } else if (this._initAddress && this.mapContainer) {
      this.clearLocations().pushLocationByAddress(this._initAddress, 1);
    }
  }

  protected onSearchResults(searchResults: SearchResultsModel<SearchAddressModel>): void {
    let adresses: Array<AddressModel> = searchResults.results.map((searchResult: SearchResultModel<SearchAddressModel>) => {
      return Address.buildFromMapSearchResults(searchResult);
    })
    this.searchResultsEmitter.emit(adresses);
  }
}
