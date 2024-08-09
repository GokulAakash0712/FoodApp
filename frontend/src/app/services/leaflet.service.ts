import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LeafletService {
  private leaflet: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  loadLeaflet() {
    if (isPlatformBrowser(this.platformId)) {
      return import('leaflet').then((module) => {
        this.leaflet = module;
        return module;
      });
    }
    return Promise.resolve(null);
  }

  getLeaflet() {
    return this.leaflet;
  }
}
