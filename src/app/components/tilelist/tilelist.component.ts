import { Component, OnInit } from '@angular/core';
import { TilesetService } from 'src/app/service/tileset.service';

@Component({
  selector: 'app-tilelist',
  templateUrl: './tilelist.component.html',
  styleUrls: ['./tilelist.component.scss']
})
export class TilelistComponent implements OnInit {
  public list: any[];
  constructor(private tilesetService: TilesetService) {
    this.list = tilesetService.tilelist;
  }

  ngOnInit() {}

  public deleteTile(tileset: any) {
    this.tilesetService.removeTileset(tileset);
  }

  public toggleTile(tileset: any) {
    this.tilesetService.toggleTileset(tileset);
  }

  public flyToTile(tilelist: any) {
    this.tilesetService.flyToTileset(tilelist);
  }
}
