import { Component, OnInit } from "@angular/core";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { MapType } from "src/app/type";
import { MapService } from "src/app/service/map.service";
import { SnackbarComponent } from "../snackbar/snackbar.component";

const MAP_TYPES = [
	{
		name: "WMTS",
		value: MapType.WMTS,
	},
	{
		name: "ARCGIS",
		value: MapType.ARCGIS,
	},
	{
		name: "NORMAL",
		value: MapType.NORMAL,
	},
];

@Component({
	selector: "app-map-dialog",
	templateUrl: "./map-dialog.component.html",
	styleUrls: ["./map-dialog.component.scss"],
})
export class MapDialogComponent implements OnInit {
	public name: string;
	public serviceUrl: string;
	public type: MapType;
	public types: Array<{ name: string; value: MapType }>;

	constructor(
		public dialogRef: MatDialogRef<MapDialogComponent>,
		public mapService: MapService,
		public snackBar: MatSnackBar,
	) {
		this.name = "";
		this.serviceUrl = "";
		this.type = MapType.NORMAL;
		this.types = MAP_TYPES;
	}

	ngOnInit() {}

	closeDialog() {
		if (!(this.name && this.serviceUrl)) {
			this.snackBar.openFromComponent(SnackbarComponent, {
				duration: 500,
				data: {
					message: "请输入名称和服务地址",
				},
			});
			return;
		}

		if (this.mapService.checkName(this.name)) {
			this.snackBar.openFromComponent(SnackbarComponent, {
				duration: 500,
				data: {
					message: "地图名称重复",
				},
			});
			return;
		}

		const returnData = {
			name: this.name,
			type: this.type,
			serviceUrl: this.serviceUrl,
		};

		this.dialogRef.close(returnData);
	}
}
