import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { GameGridComponent } from './components/game-grid/game-grid.component';
import { GameElementComponent } from './components/game-element/game-element.component';
import { PlayButtonComponent } from './components/play-button/play-button.component';

@NgModule({
  declarations: [AppComponent, GameGridComponent, GameElementComponent, PlayButtonComponent],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
