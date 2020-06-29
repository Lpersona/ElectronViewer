import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";

import {
	MatToolbarModule,
	MatMenuModule,
	MatButtonModule,
	MatSidenavModule,
	MatDividerModule,
	MatListModule,
	MatSlideToggleModule,
	MatIconModule,
	MatDialogModule,
	MatInputModule,
	MatFormFieldModule,
	MatSnackBarModule,
	MatRadioModule,
} from "@angular/material";

import { HeaderComponent } from "./components/header/header.component";
import { EarthComponent } from "./components/earth/earth.component";
import { TilelistComponent } from "./components/tilelist/tilelist.component";
import { DialogComponent } from "./components/dialog/dialog.component";
import { SnackbarComponent } from "./components/snackbar/snackbar.component";
import { MaplayerComponent } from "./components/maplayer/maplayer.component";
import { MapDialogComponent } from "./components/map-dialog/map-dialog.component";

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		EarthComponent,
		TilelistComponent,
		DialogComponent,
		SnackbarComponent,
		MaplayerComponent,
		MapDialogComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatMenuModule,
		MatButtonModule,
		MatSidenavModule,
		MatDividerModule,
		MatListModule,
		MatSlideToggleModule,
		MatIconModule,
		MatDialogModule,
		MatInputModule,
		FormsModule,
		MatFormFieldModule,
		MatSnackBarModule,
		MatRadioModule,
	],
	entryComponents: [DialogComponent, MapDialogComponent, SnackbarComponent],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
