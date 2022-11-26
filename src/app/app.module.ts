import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GameGridComponent } from './components/game-grid/game-grid.component';
import { GameElementComponent } from './components/game-element/game-element.component';

@NgModule({
  declarations: [AppComponent, GameGridComponent, GameElementComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
