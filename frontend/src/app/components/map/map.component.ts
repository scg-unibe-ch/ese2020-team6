import { AfterViewInit, Output, Input, Component, ElementRef, ViewChild, EventEmitter } from '@angular/core';

import { MapLocations } from './map-locations';
import * as Esri from 'esri-leaflet';
import * as Geocoder from 'esri-leaflet-geocoder';
import * as Leaflet from 'leaflet';
import { SearchResultModel, SearchResultsModel } from '../../models/map/search/search-model.module';
import { Address, SearchAddressModel } from '../../models/map/address/address.model';
import { Location, LocationModel } from '../../models/map/location/location.model';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends MapLocations implements AfterViewInit {

  private _initLocation: string;

  @Input()
  set initLocation(value: any) {
    this._initLocation = value;
    this.updateLocation();
  };

  @ViewChild('map')
  private mapContainer: ElementRef;

  constructor() {
    super(
      'Topographic',
      new Location(new Leaflet.LatLng(46.947922, 7.440390), 6)
    )
  }

  public ngAfterViewInit(): void {
    this.setContainer(this.mapContainer);
    this.build();
    this.updateLocation()
  }

  private updateLocation(): void {
    if (this._initLocation && this.mapContainer) {
      this.clearLocations();
      this.pushLocationByText(this._initLocation, 1);
    }
  }
}
