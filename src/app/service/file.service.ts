import { Injectable } from "@angular/core";
import { MatDialog, MatSnackBar } from "@angular/material";
import { IpcRenderer } from "electron";
import { DialogComponent } from "../components/dialog/dialog.component";
import { TilesetService } from "./tileset.service";

interface DialogResult {
	name: string;
	serviceUrl: string;
}
@Injectable({
	providedIn: "root",
})
export class FileService {
	private ipc: IpcRenderer;

	constructor(
		private tilesetService: TilesetService,
		private dialog: MatDialog,
		public snackBar: MatSnackBar,
	) {
		if ((window as any).require) {
			this.ipc = (window as any).require("electron").ipcRenderer;
		}
	}

	public getFile() {
		this.ipc.send("getFiles");
		this.ipc.once(
			"getFileResponse",
			(event: Electron.IpcRendererEvent, url: string, portNumber: number) => {
				const dialogRef = this.dialog.open(DialogComponent, {
					ariaDescribedBy: "useFile",
					width: "250px",
					data: { info: "请输入场景名称" },
				});
				dialogRef.afterClosed().subscribe((result: DialogResult | undefined) => {
					if (result) {
						const { name } = result;
						this.tilesetService.loadTileset(url, name, portNumber);
					}
				});
			},
		);
	}

	public loadUrl() {
		const dialogRef = this.dialog.open(DialogComponent, {
			ariaDescribedBy: "useUrl",
			width: "250px",
			data: { info: "请输入服务地址", url: true },
		});

		dialogRef.afterClosed().subscribe((result: DialogResult | undefined) => {
			if (result) {
				const { name, serviceUrl } = result;
				this.tilesetService.loadTileset(serviceUrl, name);
			}
		});
	}
}
