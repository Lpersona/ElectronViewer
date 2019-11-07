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
      this.ipc = (window as any).require('electron').ipcRenderer;
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
        name,
        show: true
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
      this.deleteItemFromArray(tileset, this.tilelist);
      this.ipc.send('closePort', portNumber);
    }
  }

  public toggleTileset(tileset: any) {
    if (tileset) {
      const { tile } = tileset;
      tile.show = !tile.show;
      tileset.show = tile.show;
    }
  }

  public flyToTileset(tileset: any) {
    if (tileset && tileset.tile) {
      this.viewer.camera.flyToBoundingSphere(tileset.tile.boundingSphere);
    }
  }

  private deleteItemFromArray(item: any, array: any[]) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === item) {
        array.splice(i, 1);
        break;
      }
    }
  }
}
