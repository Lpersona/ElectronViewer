import { Injectable } from "@angular/core";
import * as Cesium from "cesium";
import { MapService } from "./map.service";

@Injectable({
	providedIn: "root",
})
export class ViewerService {
	public viewer: Cesium.Viewer;

	constructor(private mapService: MapService) {}
	public init(id: string) {
		this.viewer = new Cesium.Viewer("map", {
			animation: false, // 是否显示动画控件(左下方那个)
			baseLayerPicker: false, // 是否显示图层选择控件
			fullscreenButton: false,
			geocoder: false, // 是否显示地名查找控件
			timeline: false, // 是否显示时间线控件
			sceneModePicker: false, // 是否显示投影方式控件
			navigationHelpButton: false, // 是否显示帮助信息控件
			infoBox: false, // 是否显示点击要素之后显示的信息
			homeButton: false, // 主页按钮
			selectionIndicator: false,
			shadows: false,
		});

		// 隐藏cesium_logo
		this.viewer.cesiumWidget.creditContainer.setAttribute("style", "display: none");
		// 修改球体颜色
		this.viewer.scene.globe.baseColor = Cesium.Color.BLACK;
		this.viewer.imageryLayers.removeAll();

		this.viewer.imageryLayers.addImageryProvider(
			new Cesium.OpenStreetMapImageryProvider({
				url: "https://a.tile.openstreetmap.org/",
			}),
		);

		this.mapService.loadLayer();
		return this.viewer;
	}

	public getViewer() {
		return this.viewer || void 0;
	}
}
