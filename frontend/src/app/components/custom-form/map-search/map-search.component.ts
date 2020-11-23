import { Component, ElementRef, ViewChild, Optional, Inject, Input } from '@angular/core';
import { NgModel, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as Leaflet from 'leaflet';
import { ValueAccessorValidatorBase } from '../value-accessor-validator-base';
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
export class MapSearchComponent extends ValueAccessorValidatorBase<Address> {

  @Input()
  public placeholder: String;

  private fullScreen: boolean = false;

  @ViewChild(NgModel)
  public model: NgModel;

  private map: MapSearch;
  private handleSearchResults: (searchResults: SearchResultsModel<SearchAddressModel>) => void = (searchResults: SearchResultsModel<SearchAddressModel>): void => {
    let addresses: Array<AddressModel> = searchResults.results.map((searchResult: SearchResultModel<SearchAddressModel>) => {
      return Address.buildFromMapSearchResults(searchResult);
    })
    this.touch();
    this.value = addresses[0];
  }

  private handleGeocodeSearchResults: (err, searchResults: SearchResultsModel<SearchAddressModel>) => void = (err, searchResults: SearchResultsModel<SearchAddressModel>): void => {
    this.handleSearchResults(searchResults);
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
    themeService: ThemeService,
    private route: ActivatedRoute,
    @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
    @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>
  ) {
    super(validators, asyncValidators, themeService);

    this.map = new MapSearch('Topographic', new Location(new Leaflet.LatLng(46.947922, 7.440390), 6));
    this.map.addResultSubscriber(this.handleSearchResults);

    this.route.params.subscribe((params: {address: string}) => {
      if (params.address) {
        this.fullScreen = true
        this.map.geocodeLocationText(params.address, this.handleGeocodeSearchResults);
      }
    })
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

  get classes(): Array<string> {
    let classes: Array<string> = new Array<string>();
    classes.push(this.touched ? 'touched' : 'untouched');
    classes.push(this.dirty ? 'dirty' : 'pristine');
    classes.push(this.theme);
    classes.push(this.invalid ? 'invalid' : 'valid');
    classes.push(this.placeholder ? 'full-height' : '');
    classes.push(this.fullScreen ? 'full-screen' : '')
    return classes;
  }

}
