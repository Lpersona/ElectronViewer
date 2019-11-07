import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

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
  MatFormFieldModule
} from '@angular/material';

import { HeaderComponent } from './components/header/header.component';
import { EarthComponent } from './components/earth/earth.component';
import { TilelistComponent } from './components/tilelist/tilelist.component';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EarthComponent,
    TilelistComponent,
    DialogComponent
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
    MatFormFieldModule,
    FormsModule
  ],
  entryComponents: [DialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
