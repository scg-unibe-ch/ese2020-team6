import { ElementRef } from '@angular/core';

import * as Esri from 'esri-leaflet';
import * as Geocoder from 'esri-leaflet-geocoder';
import * as Leaflet from 'leaflet';

export class Map {

  protected _map: Leaflet.Map;
  protected container: ElementRef;

  constructor(
    private baseLayer: string,
    private options: { center: Array<number>, zoom: number }
  ) {
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

  public setContainer(container: ElementRef): Map {
    this.container = container;
    return this;
  }

  public build(): Leaflet.Map {
    if (!this.container) throw 'No container set!';
    if (!this._map) this.createMap().addBaseLayer();
    return this._map;
  }

  public setBaseLayerOptions(baseLayer: string, options: { center: Array<number>, zoom: number }): void {
    this.baseLayer = baseLayer;
    this.options = options;
  }

  private createMap(): Map {
    this._map = Leaflet.map(this.container.nativeElement).setView(this.options.center, this.options.zoom);
    setTimeout(() => {
      this._map.invalidateSize(true);
    }, 0);
    return this;
  }

  private addBaseLayer(): Map {
    Esri.basemapLayer(this.baseLayer).addTo(this._map);
    return this;
  }

  get map(): Leaflet.Map {
    if (this._map) return this._map;
    else return this.build();
  }
}
