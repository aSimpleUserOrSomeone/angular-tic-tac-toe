import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.css'],
})
export class PlayButtonComponent {
  @Output() buttonEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Input() importedGameState: string = 'game';

  clickedButton() {
    this.buttonEmitter.emit('playButtonClicked');
  }
}
