import { Component, OnInit } from '@angular/core';
import { Station } from 'src/app/models/station.model';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-map-page',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  public stations: Station[] = [];

  constructor(public mapService: MapService) {}

  ngOnInit() {}

  public toggleFirstLayer() {
    const newState = !this.mapService.state.layers[0].active;
    this.mapService.state.layers[0].active = newState;
    if (newState) {
      this.getStations();
    } else {
      this.stations = [];
    }
  }

  private async getStations() {
    const countryCode = 'ZMB';
    const currentPrev = 'Current';
    const leadTime = '3-day';
    this.stations = await this.mapService.getStations(
      countryCode,
      currentPrev,
      leadTime,
    );
  }
}