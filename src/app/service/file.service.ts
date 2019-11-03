import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private ipc: IpcRenderer;

  constructor() {
    if ((window as any).require) {
      this.ipc = (window as any).require('electron').ipcRenderer;
    }
  }

  public getFile() {
    this.ipc.send('getFiles');
    this.ipc.on('getFileResponse', (event: any, res, url) => {
      console.log(event);
      console.log(res);
      console.log(url);
    });
  }
}
