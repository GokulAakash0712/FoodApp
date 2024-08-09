import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { LocationService } from '../../../services/location.service';
import { Order } from '../../../shared/models/Order';
import { LeafletService } from '../../../services/leaflet.service';
import { LatLngTuple, LatLng } from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnChanges, AfterViewInit {
  @Input() order!: Order;
  @Input() readonly = false;
  private readonly MARKER_ZOOM_LEVEL = 16;
  private MARKER_ICON: any;
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];

  @ViewChild('map', { static: true }) mapRef!: ElementRef;
  map: any;
  currentMarker: any;

  constructor(
    private locationService: LocationService,
    private leafletService: LeafletService
  ) {}

  ngOnChanges(): void {
    if (!this.order) return;
    this.initializeMap();

    if (this.readonly && this.addressLatLng) {
      this.showLocationOnReadonlyMode();
    }
  }

  ngAfterViewInit() {
    this.initializeMap();
  }

  showLocationOnReadonlyMode() {
    this.leafletService.loadLeaflet().then(() => {
      const leaflet = this.leafletService.getLeaflet();
      if (leaflet) {
        const { icon } = leaflet;
        this.setMarker(this.addressLatLng);
        this.map.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);

        this.map.dragging.disable();
        this.map.touchZoom.disable();
        this.map.doubleClickZoom.disable();
        this.map.scrollWheelZoom.disable();
        this.map.boxZoom.disable();
        this.map.keyboard.disable();
        this.map.off('click');
        this.map.tap?.disable();
        this.currentMarker.dragging?.disable();
      }
    });
  }

  initializeMap() {
    if (this.map) return;

    this.leafletService.loadLeaflet().then((leaflet) => {
      if (leaflet) {
        const { map, tileLayer, icon } = leaflet;

        this.MARKER_ICON = icon({
          iconUrl:
            'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
          iconSize: [42, 42],
          iconAnchor: [21, 42],
        });

        this.map = map(this.mapRef.nativeElement, {
          attributionControl: false,
          center: this.DEFAULT_LATLNG,
          zoom: 1,
        });

        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
          this.map
        );

        this.map.on('click', (e: any) => {
          this.setMarker(e.latlng);
        });
      }
    });
  }

  findMyLocation() {
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        console.log('Current location:', latlng); // Log coordinates
        if (this.map) {
          this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
          this.setMarker(latlng);
        }
      },
    });
  }

  setMarker(latlng: any) {
    console.log('Setting marker at:', latlng); // Log coordinates
    this.addressLatLng = latlng as LatLng;
    if (this.currentMarker) {
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.leafletService.loadLeaflet().then(() => {
      const leaflet = this.leafletService.getLeaflet();
      if (leaflet) {
        const { marker } = leaflet;
        this.currentMarker = marker(latlng, {
          draggable: true,
          icon: this.MARKER_ICON,
        }).addTo(this.map);

        this.currentMarker.on('dragend', () => {
          this.addressLatLng = this.currentMarker.getLatLng();
        });
      }
    });
  }

  set addressLatLng(latlng: any) {
    if (!latlng.lat.toFixed) return;

    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  get addressLatLng() {
    return this.order.addressLatLng!;
  }
}
