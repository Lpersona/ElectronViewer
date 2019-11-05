import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TilesetService {
  public tilelist: any[];
  constructor() {}

  public loadTileset(url: string) {
    this.tilelist.push();
  }

  public removeTileset(tileset: any) {}

  public toggleTileset(tileset: any) {}
}
