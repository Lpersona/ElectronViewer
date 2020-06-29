import { Component, OnInit } from "@angular/core";
import { TilesetService, tileListItem } from "src/app/service/tileset.service";

@Component({
	selector: "app-tilelist",
	templateUrl: "./tilelist.component.html",
	styleUrls: ["./tilelist.component.scss"],
})
export class TilelistComponent implements OnInit {
	public list: tileListItem[];
	constructor(private tilesetService: TilesetService) {
		this.list = tilesetService.tilelist;
	}

	ngOnInit() {}

	public deleteTile(tileset: tileListItem) {
		this.tilesetService.removeTileset(tileset);
	}

	public toggleTile(tileset: tileListItem) {
		this.tilesetService.toggleTileset(tileset);
	}

	public flyToTile(tilelist: tileListItem) {
		this.tilesetService.flyToTileset(tilelist);
	}
}
