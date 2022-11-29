import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

interface M {
  index?: number;
  score?: number;
}

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
  public playerSymbol!: string;
  public xTurn: boolean = true;
  public gameState: string = 'game';
  public gridValues!: Array<string | number>;
  public animationInProgress: boolean = false;

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.playerSymbol = 'cross';
    this.gridValues = Array(9);
    for (let i = 0; i < this.gridValues.length; i++) {
      this.gridValues[i] = i;
    }
    this.gameState = 'game';
    this.xTurn = true;
    this.animationInProgress = false;
  }

  get player() {
    return this.playerSymbol;
  }
  get ai() {
    return this.playerSymbol == 'cross' ? 'circle' : 'cross';
  }
  get getGradientClass(): string {
    if (this.gameState == 'game') {
      return 'blue-gradient';
    } else if (this.gameState == 'aiWin') {
      return 'red-gradient';
    } else if (this.gameState == 'tie') {
      return 'gray-gradient';
    }

    return '';
  }
  get animationState() {
    return this.animationInProgress ? 'end' : 'start';
  }
  animationToggle() {
    this.animationInProgress = !this.animationInProgress;
    setTimeout(() => {
      this.animationInProgress = !this.animationInProgress;
      // this.aiMakeMove();
    }, 1000);
  }

  checkBoardState(board: Array<string | number>): string {
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
        if (board[a] == this.ai) {
          return 'aiWin';
        } else if (board[a] == this.player) {
          return 'playerWin';
        }
      }
    }
    if (this.gridValues.every((v) => typeof v != 'number')) {
      return 'tie';
    }
    return 'game';
  }

  makeMove(idSquare: number) {
    if (
      this.gridValues[idSquare] != 'circle' &&
      this.gridValues[idSquare] != 'square' &&
      this.gameState == 'game' &&
      !this.animationInProgress
    ) {
      this.animationToggle();
      setTimeout(() => {
        this.gridValues.splice(idSquare, 1, this.player);
        this.xTurn = !this.xTurn;
        this.gameState = this.checkBoardState(this.gridValues);
        console.log(this.gameState);
      }, 300);
    }
  }

  getEmptySquareIndexes(oldArray: Array<string | number>): Array<number> {
    const a: Array<number> = oldArray.filter(
      (e) => typeof e == 'number'
    ) as Array<number>;

    return a;
  }

  minimax = (newBoard: Array<string | number>, nowPlaying: string): any => {
    //calculate empty squares/possibilities
    var emptySquares: Array<number> = this.getEmptySquareIndexes(newBoard);

    if (this.checkBoardState(newBoard) == 'playerWin') {
      return { score: -10 };
    } else if (this.checkBoardState(newBoard) == 'aiWin') {
      return { score: 10 };
    } else if (emptySquares.length === 0) {
      return { score: 0 };
    }

    var moves = [];
    for (let i = 0; i < emptySquares.length; i++) {
      var move: M = {};
      move.index = emptySquares[i];
      newBoard[emptySquares[i]] = nowPlaying;

      if (nowPlaying == this.ai) {
        var res = this.minimax(newBoard, this.player);
        move.score = res.score;
      } else {
        var res = this.minimax(newBoard, this.ai);
        move.score = res.score;
      }

      newBoard[emptySquares[i]] = emptySquares[i];

      moves.push(move);
    }

    var bestMove!: M;
    if (nowPlaying == this.ai) {
      var bestScore = -1000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score! > bestScore) {
          bestScore = moves[i].score as number;
          bestMove = moves[i];
        }
      }
    } else {
      var bestScore: number = 1000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score! < bestScore) {
          bestScore = moves[i].score as number;
          bestMove = moves[i];
        }
      }
    }

    return bestMove;
  };

  aiMakeMove() {
    let squareID: number = this.minimax(this.gridValues, this.ai).index;
    const squareAiClick: HTMLElement = document.querySelector(
      `square${squareID}`
    ) as HTMLElement;
  }
}
