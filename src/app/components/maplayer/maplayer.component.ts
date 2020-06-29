import { Component, OnInit } from "@angular/core";
import { MapService } from "src/app/service/map.service";
import * as Cesium from "cesium";

@Component({
	selector: "app-maplayer",
	templateUrl: "./maplayer.component.html",
	styleUrls: ["./maplayer.component.scss"],
})
export class MaplayerComponent implements OnInit {
	public list: Map<string, Cesium.ImageryLayer>;

	constructor(private mapService: MapService) {
		this.list = this.mapService.mapList;
	}

	ngOnInit() {}

	public deleteMap(name: string) {
		this.mapService.removeMap(name);
	}

	public toggleMap(name: string) {
		this.mapService.toggleMap(name);
	}

	public addMap() {
		this.mapService.addMap();
	}
}
