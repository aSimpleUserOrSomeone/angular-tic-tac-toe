import { Component, Output, Input } from '@angular/core';

@Component({
  selector: 'app-game-grid',
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.css'],
})
export class GameGridComponent {
  public gridValues = new Array(9);
}
