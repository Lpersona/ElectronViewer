import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViewerService {
  public viewer: any;

  constructor() {}
  public init(id: string) {
    this.viewer = new Cesium.Viewer('map', {
      animation: false, // 是否显示动画控件(左下方那个)
      baseLayerPicker: false, // 是否显示图层选择控件
      fullscreenButton: false,
      geocoder: false, // 是否显示地名查找控件
      timeline: false, // 是否显示时间线控件
      sceneModePicker: false, // 是否显示投影方式控件
      navigationHelpButton: false, // 是否显示帮助信息控件
      infoBox: false, // 是否显示点击要素之后显示的信息
      //   imageryProvider: false, // 地图提供器
      homeButton: false, // 主页按钮
      selectionIndicator: false,
      shadows: false
    });

    // 隐藏cesium_logo
    this.viewer._cesiumWidget._creditContainer.style.display = 'none';
    // 修改球体颜色
    this.viewer.scene.globe.baseColor = Cesium.Color.BLACK;
    return this.viewer;
  }

  public getViewer() {
    return this.viewer || void 0;
  }
}
