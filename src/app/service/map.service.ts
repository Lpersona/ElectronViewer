import { Injectable } from "@angular/core";
import { ViewerService } from "./viewer.service";
import { MapType } from "../type";
import * as Cesium from "cesium";

@Injectable({
	providedIn: "root",
})
export class MapService {
	public mapList = new Map<string, Cesium.ImageryLayer>();

	constructor(private viewerService: ViewerService) {}

	public addMapFromLink(url: string, type: MapType, name: string): void {
		const viewer = this.viewerService.getViewer();
		let layer: Cesium.ImageryLayer | undefined;

		switch (type) {
			case MapType.NORMAL:
				layer = viewer.imageryLayers.addImageryProvider(
					new Cesium.TileMapServiceImageryProvider({
						url,
					}),
				);
				break;
			case MapType.WMTS:
				layer = viewer.imageryLayers.addImageryProvider(
					new Cesium.UrlTemplateImageryProvider({
						url: `${url}/{z}/{x}/{y}.png`,
						tilingScheme: new Cesium.WebMercatorTilingScheme(),
					}),
				);
				break;
			case MapType.ARCGIS:
				layer = viewer.imageryLayers.addImageryProvider(
					new Cesium.ArcGisMapServerImageryProvider({
						url: url,
					}),
				);
				break;
			default:
				break;
		}

		if (layer) {
			this.mapList.set(name, layer);
		}
	}

	public removeMap(name: string): void {
		const viewer = this.viewerService.getViewer();
		if (this.mapList.has(name)) {
			viewer.imageryLayers.remove(this.mapList.get(name));
			this.mapList.delete(name);
		}
	}
}
