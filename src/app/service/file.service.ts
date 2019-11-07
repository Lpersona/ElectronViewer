import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { TilesetService } from './tileset.service';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private ipc: IpcRenderer;

  constructor(
    private tilesetService: TilesetService,
    private dialog: MatDialog
  ) {
    if ((window as any).require) {
      this.ipc = (window as any).require('electron').ipcRenderer;
    }
  }

  public getFile() {
    this.ipc.send('getFiles');
    this.ipc.once('getFileResponse', (event: any, url, portNumber) => {
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '250px',
        data: { info: '请输入场景名称' }
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.tilesetService.loadTileset(url, portNumber, result);
      });
    });
  }
}
