import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css'],
})
export class PlayButtonComponent {
  clickedButton() {
    location.reload();
  }
}
