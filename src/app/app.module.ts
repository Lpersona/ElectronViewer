import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatSidenavModule,
  MatDividerModule,
  MatListModule,
  MatSlideToggleModule,
  MatIconModule
} from '@angular/material';

import { HeaderComponent } from './components/header/header.component';
import { EarthComponent } from './components/earth/earth.component';
import { TilelistComponent } from './components/tilelist/tilelist.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EarthComponent,
    TilelistComponent
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
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
