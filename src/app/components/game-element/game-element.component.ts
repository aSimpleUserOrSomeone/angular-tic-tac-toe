import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-element',
  templateUrl: './game-element.component.html',
  styleUrls: ['./game-element.component.css'],
})
export class GameElementComponent {
  public isCircle: boolean = false;
  @Output() public childClick = new EventEmitter();
  elementClasses = {
    isCross: !this.isCircle,
  };

  onClick() {
    console.log('CLICK');
  }
}
