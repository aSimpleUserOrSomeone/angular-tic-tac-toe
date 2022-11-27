import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-game-grid',
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.css'],
  animations: [
    trigger('showBlank', [
      state(
        'start',
        style({
          left: '-310%',
          top: '-310%',
        })
      ),
      state(
        'end',
        style({
          left: '100%',
          top: '100%',
        })
      ),
      transition('start => end', [animate('1s')]),
    ]),
  ],
})
export class GameGridComponent {
  public playerSymbol: string = 'cross';
  public xTurn: boolean = true;
  public gameState: string = 'game';
  public gridValues!: Array<string>;
  public animationInProgress: boolean = false;

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.gridValues = Array(9).fill('');
    this.gameState = 'game';
    this.xTurn = true;
    this.animationInProgress = false;
  }

  get player() {
    return this.xTurn ? 'cross' : 'circle';
  }
  get ai() {
    return this.xTurn ? 'circle' : 'cross';
  }

  animationToggle() {
    this.animationInProgress = !this.animationInProgress;
    setTimeout(() => {
      this.animationInProgress = !this.animationInProgress;
    }, 1000);
  }

  get animationState() {
    return this.animationInProgress ? 'end' : 'start';
  }

  makeMove(idSquare: number) {
    if (
      this.gridValues[idSquare] == '' &&
      this.gameState == 'game' &&
      !this.animationInProgress
    ) {
      this.animationToggle();
      setTimeout(() => {
        this.gridValues.splice(idSquare, 1, this.player);
        this.xTurn = !this.xTurn;
        this.gameState = this.calculateWin(this.gridValues, this.ai);
      }, 300);
    }
  }

  minimax = (newBoard: Array<string>, nowPlaying: string): any => {
    //calculate empty squares/possibilities
    const maxDepth = newBoard.reduce((total, v) => total + Number(v == ''), 0);

    if (this.calculateWin(newBoard, this.player) == 'playerWin') {
      return { score: -10 };
    } else if (this.calculateWin(newBoard, this.ai) == 'aiWin') {
      return { score: 10 };
    } else if (maxDepth === 0) {
      return { score: 0 };
    }

    for (let i = 0; i < maxDepth; i++) {
      var move: object = {};
      //https://www.freecodecamp.org/news/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37/
    }
  };
  aiMakeMove() {
    let squareID: number = 0;
    var moves: object = {};
  }

  startAnimation() {
    this.animationInProgress = true;
    setTimeout(() => {
      this.animationInProgress = false;
    }, 1000);
  }

  calculateWin(board: Array<string>, symbol: string): string {
    //od docs z angulara
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        if (symbol == this.ai) {
          return 'aiWin';
        } else if (symbol == this.player) {
          return 'playerWin';
        }
      }
    }
    if (this.gridValues.every((v) => v != '')) {
      return 'tie';
    }
    return 'game';
  }
}
