import { Injectable } from '@angular/core';
import { ViewerService } from './viewer.service';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class TilesetService {
  public tilelist: any[];
  public viewer: any;
  private ipc: IpcRenderer;

  constructor(private viewerService: ViewerService) {
    if ((window as any).require) {
      this.ipc = (window as any).require('electron').ipcRender;
    }

    this.tilelist = [];
  }

  public loadTileset(url: string, portNumber: number, name: string) {
    if (!this.viewer) {
      this.viewer = this.viewerService.getViewer();
    }
    const tileset = this.viewer.scene.primitives.add(
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
        refineToVisible: false
      })
    );

    tileset.readyPromise.then((tile: any) => {
      this.viewer.camera.flyToBoundingSphere(tile.boundingSphere);

      this.tilelist.push({
        tile,
        portNumber,
        name
      });
    });
  }

  public removeTileset(tileset: any) {
    if (!this.viewer) {
      this.viewer = this.viewerService.getViewer();
    }

    if (tileset) {
      const { tile, portNumber } = tileset;
      this.viewer.scene.primitives.remove(tile);
      this.ipc.send('closePort', portNumber);
    }
  }

  public toggleTileset(tileset: any) {
    if (tileset) {
      const { tile } = tileset;
      tile.show = !tile.show;
    }
  }
}
