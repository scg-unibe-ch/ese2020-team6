import { Component, ElementRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR} from '@angular/forms';
import * as Leaflet from 'leaflet';
import { ValueAccessorBase } from '../value-accessor-base';
import { ThemeService } from '../../../services/theme/theme.service';

import { MapSearch } from '../../map/map-search';
import { SearchResultsModel, SearchResultModel } from '../../../models/map/search/search-model.module';
import { Address, AddressModel, SearchAddressModel } from '../../../models/map/address/address.model';
import { Location } from '../../../models/map/location/location.model';

@Component({
  selector: 'map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: MapSearchComponent, multi: true}
  ]
})
export class MapSearchComponent extends ValueAccessorBase<Address> {

  private map: MapSearch;
  private handleSearchResults: (searchResults: SearchResultsModel<SearchAddressModel>) => void = (searchResults: SearchResultsModel<SearchAddressModel>): void => {
    let addresses: Array<AddressModel> = searchResults.results.map((searchResult: SearchResultModel<SearchAddressModel>) => {
      return Address.buildFromMapSearchResults(searchResult);
    })
    this.touch();
    this.value = addresses[0];
  }

  private _mapContainer: ElementRef;
  @ViewChild('map')
  set mapContainer(mapContainer: ElementRef) {
    this._mapContainer = mapContainer;
    this.map.setContainer(mapContainer)
    this.map.build();
  }
  get mapContainer(): ElementRef {
    return this._mapContainer;
  }

  constructor(
    themeService: ThemeService
  ) {
    super(themeService);
    this.map = new MapSearch('Topographic', new Location(new Leaflet.LatLng(46.947922, 7.440390), 6));
    this.map.addResultSubscriber(this.handleSearchResults);
  }

  public writeValue(value: Address) {
    super.writeValue(value);
    if (value && this.mapContainer) {
      this.map.clearLocations();
      this.map.pushLocationByAddress(value, 1);
      this.dirty = true;
      this.onChange(value);
    }
  }
}
