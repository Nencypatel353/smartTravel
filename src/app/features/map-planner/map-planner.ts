import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-planner',
  imports: [],
  templateUrl: './map-planner.html',
  styleUrl: './map-planner.scss',
})
export class MapPlanner {
  private map!: L.Map;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [20.5937, 78.9629], // Center on India by default
      zoom: 5
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    // Example: Add a marker
    const marker = L.marker([28.6139, 77.2090]).addTo(this.map);
    marker.bindPopup("<b>New Delhi</b><br>Capital of India").openPopup();

    // Optional: Click to add marker
    this.map.on('click', (e: any) => {
      const coords = e.latlng;
      L.marker([coords.lat, coords.lng]).addTo(this.map)
        .bindPopup(`Custom Destination: [${coords.lat.toFixed(2)}, ${coords.lng.toFixed(2)}]`)
        .openPopup();
    });
  }


}
