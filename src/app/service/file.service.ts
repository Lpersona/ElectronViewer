import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { TilesetService } from './tileset.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private ipc: IpcRenderer;

  constructor(private tilesetService: TilesetService) {
    if ((window as any).require) {
      this.ipc = (window as any).require('electron').ipcRenderer;
    }
  }

  public getFile() {
    this.ipc.send('getFiles');
    this.ipc.once('getFileResponse', (event: any, url, port) => {
      this.tilesetService.loadTileset(url, port, name);
    });
  }
}
