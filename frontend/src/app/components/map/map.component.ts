import { AfterViewInit, Output, Input, Component, ElementRef, ViewChild, EventEmitter } from '@angular/core';

import { Search } from './search';
import * as Esri from 'esri-leaflet';
import * as Geocoder from 'esri-leaflet-geocoder';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends Search implements AfterViewInit {

  private _initLocation: string;

  @Input()
  set initLocation(value: any) {
    this._initLocation = value;
    this.updateLocation();
  };

  @Output()
  searchResultsEmitter: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('map')
  private mapContainer: ElementRef;

  constructor() {
    super(
      'Topographic',
      {
        center: [47.096790, 7.598464],
        zoom: 12
      }
    )
  }

  public ngAfterViewInit(): void {
    this.setContainer(this.mapContainer).build();
    this.updateLocation()
  }

  private updateLocation(): void {
    if (this._initLocation && this.mapContainer) {
      this.clearLocations().pushLocationByText(this._initLocation);
    }
  }

  protected onSearchResults(data): void {
    this.searchResultsEmitter.emit(data);
  }
}
