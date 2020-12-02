import { ElementRef } from '@angular/core';

import * as Esri from 'esri-leaflet';
import * as Leaflet from 'leaflet';
import { LocationModel } from '../../models/map/location/location.model';


export class Map {

  protected _map: Leaflet.Map;
  private basemapLayer: Leaflet.Layer;
  private basemapLayerString: string;
  private center: LocationModel;
  protected container: ElementRef;

  constructor(
    basemapLayerString?: string,
    center?: LocationModel
  ) {

    if (basemapLayerString) this.setBasemapLayerString(basemapLayerString);
    if (center) this.setCenter(center);

    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = Leaflet.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Leaflet.Marker.prototype.options.icon = iconDefault;
  }

  public setBasemapLayerString(basemapLayerString: string) : void{
    this.basemapLayerString = basemapLayerString;
  }

  public setCenter(center: LocationModel): void {
    this.center = center;
  }

  public setContainer(container: ElementRef): void {
    this.container = container;
  }

  public build(basemapLayerString?: string, center?: LocationModel, container?: ElementRef): void {
    if (basemapLayerString) this.setBasemapLayerString(basemapLayerString);
    if (center) this.setCenter(center);
    if (container) this.setContainer(container);

    if (!this.container) throw 'No container set!';
    else this.createMap();
    if (!this.basemapLayerString) throw 'No base map layer set!';
    else this.setBaseLayer();
    if (!this.center) throw 'No center set!';
    else this.updateView();
  }

  private createMap(): void {
    this._map = Leaflet.map(this.container.nativeElement);
  }

  private setBaseLayer(): void {
    if (this.basemapLayer) this.basemapLayer.remove();
    this.basemapLayer = Esri.basemapLayer(this.basemapLayerString);
    this.basemapLayer.addTo(this._map);
  }

  protected updateView(options?: Object): void {
    this._map.setView(this.center.latlng, this.center.zoom, options);
    setTimeout(() => {
      this._map.invalidateSize(true);
    }, 0);
  }

  get map(): Leaflet.Map {
    if (this._map) return this._map;
    else return this.build();
  }
}
