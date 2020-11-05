import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

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

  public ngOnInit(): void {

  }

  public ngAfterViewInit(): void {
    this.setContainer(this.mapContainer).build();
  }

  protected onSearchResults(data): void {

  }
}
