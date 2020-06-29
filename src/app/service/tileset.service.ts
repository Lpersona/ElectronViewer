import { Injectable } from "@angular/core";
import { ViewerService } from "./viewer.service";
import { IpcRenderer } from "electron";
import * as Cesium from "cesium";

export type tileListItem = {
	tile: Cesium.Cesium3DTileset;
	portNumber: number;
	name: string;
	show: boolean;
};

@Injectable({
	providedIn: "root",
})
export class TilesetService {
	public tilelist: Array<tileListItem>;
	public viewer: Cesium.Viewer;
	private ipc: IpcRenderer;

	constructor(private viewerService: ViewerService) {
		if ((window as any).require) {
			this.ipc = (window as any).require("electron").ipcRenderer;
		}

		this.tilelist = [];
	}

	public loadTileset(url: string, name: string, portNumber?: number) {
		if (!this.viewer) {
			this.viewer = this.viewerService.getViewer();
		}
		const tileset: Cesium.Cesium3DTileset = this.viewer.scene.primitives.add(
			new Cesium.Cesium3DTileset({
				url,
				skipLevelOfDetail: true,
				maximumNumberOfLoadedTiles: 500,
				maximumMemoryUsage: 512,
				baseScreenSpaceError: 1024,
				skipScreenSpaceErrorFactor: 16,
				skipLevels: 1,
				immediatelyLoadDesiredLevelOfDetail: false,
				loadSiblings: false,
				maximumScreenSpaceError: 1,
				cullWithChildrenBounds: true,
			}),
		);

		tileset.readyPromise.then((tile: Cesium.Cesium3DTileset) => {
			this.viewer.camera.flyToBoundingSphere(tile.boundingSphere);

			this.tilelist.push({
				tile,
				portNumber: portNumber || NaN,
				name,
				show: true,
			});
		});
	}

	public removeTileset(tileset: tileListItem) {
		if (!this.viewer) {
			this.viewer = this.viewerService.getViewer();
		}

		if (tileset) {
			const { tile, portNumber } = tileset;
			this.viewer.scene.primitives.remove(tile);
			this.deleteItemFromArray(tileset, this.tilelist);

			// 非本地开启的服务，不需要主进程关闭
			if (isNaN(portNumber)) {
				this.ipc.send("closePort", portNumber);
			}
		}
	}

	public toggleTileset(tileset: tileListItem) {
		if (tileset) {
			const { tile } = tileset;
			tile.show = !tile.show;
			tileset.show = tile.show;
		}
	}

	public flyToTileset(tileset: tileListItem) {
		if (tileset && tileset.tile) {
			this.viewer.camera.flyToBoundingSphere(tileset.tile.boundingSphere);
		}
	}

	private deleteItemFromArray(item: tileListItem, array: Array<tileListItem>) {
		for (let i = 0; i < array.length; i++) {
			if (array[i] === item) {
				array.splice(i, 1);
				break;
			}
		}
	}
}
