import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { GameGridComponent } from './components/game-grid/game-grid.component';
import { GameElementComponent } from './components/game-element/game-element.component';

@NgModule({
  declarations: [AppComponent, GameGridComponent, GameElementComponent],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
