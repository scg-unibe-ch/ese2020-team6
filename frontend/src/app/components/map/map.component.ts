import { AfterViewInit, Input, Component, ElementRef, ViewChild } from '@angular/core';

import { MapLocations } from './map-locations';
import * as Leaflet from 'leaflet';
import { Address, NullAddress } from '../../models/map/address/address.model';
import { Location } from '../../models/map/location/location.model';


@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent extends MapLocations implements AfterViewInit {

  private _initAddress: Address = NullAddress.instance();
  @Input()
  set initAddress(value: Address) {
    this._initAddress = value;
    this.updateAdress();
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
    if (!(this._initAddress instanceof NullAddress)) {
      this.updateAdress();
    }
  }

  private updateAdress(): void {
    if (this.mapContainer) {
      this.clearLocations();
      this.pushLocationByAddress(this._initAddress, 1);
    }
  }
}
