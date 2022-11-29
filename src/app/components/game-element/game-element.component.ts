import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-element',
  templateUrl: './game-element.component.html',
  styleUrls: ['./game-element.component.css'],
})
export class GameElementComponent {
  @Input() public myShape!: string | number;
}
