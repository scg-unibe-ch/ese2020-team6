import { AfterViewInit, Output, Input, Component, ElementRef, ViewChild, EventEmitter } from '@angular/core';

import { Locations } from './locations';
import * as Esri from 'esri-leaflet';
import * as Geocoder from 'esri-leaflet-geocoder';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends Locations implements AfterViewInit {

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
      {
        center: [46.947922, 7.440390],
        zoom: 6
      }
    )
  }

  public ngAfterViewInit(): void {
    this.setContainer(this.mapContainer).build();
    this.updateLocation()
  }

  private updateLocation(): void {
    if (this._initLocation && this.mapContainer) {
      this.clearLocations().pushLocationByText(this._initLocation, 1);
    }
  }
}
