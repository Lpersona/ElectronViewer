import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { ViewerService } from './viewer.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private ipc: IpcRenderer;

  constructor(private viewerService: ViewerService) {
    if ((window as any).require) {
      this.ipc = (window as any).require('electron').ipcRenderer;
    }
  }

  public getFile() {
    this.ipc.send('getFiles');
    this.ipc.once('getFileResponse', (event: any, url, port) => {
      console.log(event);
      console.log(port);
      console.log(url);

      const viewer = this.viewerService.getViewer();
      const tileset = viewer.scene.primitives.add(
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
          // debugShowBoundingVolume: true
          refineToVisible: false
        })
      );

      tileset.readyPromise.then((tileset: any) => {
        viewer.camera.flyToBoundingSphere(tileset.boundingSphere);
      });
    });
  }
}
