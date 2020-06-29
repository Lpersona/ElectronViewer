import { Injectable } from "@angular/core";
import { ViewerService } from "./viewer.service";
import { MapType } from "../type";
import * as Cesium from "cesium";
import { MatDialog } from "@angular/material";
import { MapDialogComponent } from "../components/map-dialog/map-dialog.component";

interface DialogResult {
	name: string;
	serviceUrl: string;
	type: MapType;
}

@Injectable({
	providedIn: "root",
})
export class MapService {
	public mapList = new Map<string, Cesium.ImageryLayer>();

	constructor(private viewerService: ViewerService, private dialog: MatDialog) {}

	public addMap() {
		const dialogRef = this.dialog.open(MapDialogComponent, {
			ariaDescribedBy: "setMap",
			width: "400px",
		});

		dialogRef.afterClosed().subscribe((result: DialogResult) => {
			const { name, type, serviceUrl } = result;

			if (name && type && serviceUrl) {
				this._addMapFromLink(serviceUrl, type, name);
			}
		});
	}

	private _addMapFromLink(url: string, type: MapType, name: string): void {
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

	public checkName(name: string): boolean {
		return this.mapList.has(name);
	}

	public removeMap(name: string): void {
		const viewer = this.viewerService.getViewer();
		if (this.mapList.has(name)) {
			viewer.imageryLayers.remove(this.mapList.get(name));
			this.mapList.delete(name);
		}
	}

	public toggleMap(name: string): void {
		if (this.mapList.has(name)) {
			const layer = this.mapList.get(name);
			if (layer.show) {
				layer.show = false;
			} else {
				layer.show = true;
				const viewer = this.viewerService.getViewer();
				viewer.imageryLayers.raiseToTop(layer);
			}
		}
	}
}
