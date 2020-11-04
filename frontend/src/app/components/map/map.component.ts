import { OnInit, AfterViewInit, OnChanges, Input, Component, ViewChild, ElementRef } from '@angular/core';
import * as Esri from 'esri-leaflet';
import * as Geocoder from 'esri-leaflet-geocoder';
import * as Leaflet from 'leaflet';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('map')
  private mapContainer: ElementRef;

  private map: Leaflet.Map;
  private search;
  private results;

  @Input()
  isSearch: boolean = false;

  constructor() {
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

  public ngOnInit(): void {

  }

  public ngAfterViewInit(): void {
    this.initMap()
  }


  private initMap(): void {
    if (!this.map) this.createMap().addBaseLayer();

    if (this.isSearch) this.addSearch().addResults();
    else this.removeSearch().removeResults();
  }

  public ngOnChanges(): void {

  }

  private createMap(): MapComponent {
    this.map = Leaflet.map(this.mapContainer.nativeElement).setView([47.096790, 7.598464], 12);
    return this;
  }

  private addBaseLayer(): MapComponent {
    Esri.basemapLayer('Topographic').addTo(this.map);
    return this;
  }

  private addSearch(): MapComponent {
    var arcgisOnline = Geocoder.arcgisOnlineProvider();
    var gisDay = Geocoder.featureLayerProvider({
      url: 'https://services.arcgis.com/uCXeTVveQzP4IIcx/arcgis/rest/services/GIS_Day_Final/FeatureServer/0',
      searchFields: ['Name', 'Organization'], // Search these fields for text matches
      label: 'GIS Day Events', // Group suggestions under this header
      formatSuggestion: function (feature) {
        return feature.properties.Name + ' - ' + feature.properties.Organization; // format suggestions like this.
      }
    });

    this.search = Geocoder.geosearch({
      providers: [arcgisOnline, gisDay] // will geocode via ArcGIS Online and search the GIS Day feature service.
    }).addTo(this.map)

    return this;
  }

  private removeSearch(): MapComponent {
    if (this.search) this.map.removeControl(this.search);
    return this;
  }

  private addResults(): MapComponent {
    this.results = Leaflet.layerGroup().addTo(this.map);
    this.search.on("results", (data) => {
      this.results.clearLayers();
      data.results.forEach((result) => {
        this.results.addLayer(Leaflet.marker(result.latlng));
      });
    });

    return this;
  }

  private removeResults(): MapComponent {
    if (this.results) this.map.removeLayer(this.results);
    return this;
  }

}
