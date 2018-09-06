import { GameBoard } from './game-board';
import { OthelloPiece } from './game-piece';
import { Player } from './player';


export interface IGame {
	board: GameBoard;
	rows: number;
	type: string;
	players: Player[];
	turn: number;
	activePlayerIdx: number;
	startTime: Date;
	complete: boolean;
	_id?: string;

	playerMove(row: number, col: number, player: Player);
	_initPieces();
	_startGame();
	_endGame();
	_createBoard(type: string, rows: number, cols: number, _id?: string);
}

export class Game implements IGame {
	board: GameBoard;
	rows: number;
	type: string;
	players: Player[];
	turn: number; 
	activePlayerIdx: number;
	startTime: Date;
	timeLimit: number;
	running: boolean;
	complete: boolean;
	_id?: string;

	constructor(type, players, rows, cols, _id?, startingScore?){
		this.board = this._createBoard(type, rows, cols, _id);
		this.players = players;
		this.rows = rows;
		this.turn = 0;
		this.activePlayerIdx = 0;
		this.running = false;
		this.complete = false;
		this.setTimeLimit(3600);
		
		this._id = _id;		
	}	
	_createBoard(type: string, rows: number, cols: number, _id?: string){
		return new GameBoard(rows, cols, type, _id);
	}
	_startGame(){
		this.running = true;
		this._changeTurn();
		this.startTime = new Date()
	}
	//time is in seconds
	setTimeLimit(time: number){
		this.timeLimit = time;
		for(let player of this.players){
			player.updatePlayerTimeRemaining(time);
		}
		// this._initPlayerClock(time);
	}
	// _initPlayerClock(time: number){
	// 	for(let player in this.players){
	// 		this.updatePlayerTimeRemaining(player, time);
	// 	}
	// }
	// updatePlayerTimeRemaining(playerName: string, time:number){
	// 	this.players[playerName].timeRemaining = time;
	// }
	
	playerMove(row, col, player){}

	_initPieces(){}
	_updateScores(scoreDelta: number){
		const inactiveIndex = this.activePlayerIdx > 0 ? 0: 1;
		this.players[this.activePlayerIdx].changeScore(scoreDelta + 1);//add one because they placed a tile
		this.players[inactiveIndex].changeScore(-scoreDelta);
	}
	_changeClocks(){
		//TODO: clocks should be their own class
		const inactiveIndex = this.activePlayerIdx > 0 ? 0: 1;
		this.players[this.activePlayerIdx].stopPlayerClock();
		this.players[inactiveIndex].startPlayerClock();
	}
	_changeTurn(){
		this.turn +=1;
		this.activePlayerIdx = this.turn % 2;
	}
	_endGame(){
		//when we add storage, update the highscores, etc
		this.complete = true;
	}
}

export class OthelloGame extends Game {

	constructor(players, rows, cols, _id?){
		super('othello', players, rows, cols, _id, 2);	
		this._initPieces();
	}
	playerMove(row: number, col: number){
		if(!this.running){
			super._startGame();
		}

		let team = this.players[this.activePlayerIdx].team;
		this.board.addPiece(new OthelloPiece(row, col, team));

		let scoreDelta = this._flipTiles([row, col], [-1,-1], team, 0);
		super._changeClocks();
		super._updateScores(scoreDelta);
		super._changeTurn();
	}

	_initPieces(){
		const boardCenter = this.rows / 2;

		this.board.addPieces([
			new OthelloPiece(boardCenter -1, boardCenter -1, 'heads'),
			new OthelloPiece(boardCenter -1, boardCenter, 'tails'),
			new OthelloPiece(boardCenter, boardCenter -1, 'tails'),
			new OthelloPiece(boardCenter, boardCenter, 'heads')
		]);
	}
	_flipTiles(pointer: Array<number>, dir: Array<number>, 
		pieceState: string, scoreDelta: number){
		
		if(dir[0] <=1){
			scoreDelta += this._flipInDirection(pointer, dir, pieceState, 0);
			// console.log(`score delta in flip is ${scoreDelta}`);
			if(!(dir[0] === 1 && dir[1] === 1)){
				dir[1] += 1;
				if(!dir[1] && !dir[0]){ //0, 0
					dir[1] = 1;
				}else if(dir[1] >= 2){ 
					dir[0] += 1;
					dir[1] = -1;
				}

				return this._flipTiles(pointer, dir, pieceState, scoreDelta);
			}
		} 
		return scoreDelta;
	} 

	_flipInDirection(pointer: Array<number>, dir: Array<number>, 
		pieceState: string, scoreDelta: number){
		let ptCln = pointer.slice(0);

		let bookend = false; //is there a piece of the same type bookending?
		let piecesToChange = []; 

		while((ptCln[0]>=0 || ptCln[1]>=0) 
			&& (ptCln[0]<=this.rows || ptCln[1]<=this.rows)){

			ptCln[0] += dir[0];
			ptCln[1] += dir[1];

			let tileState = this.board.getState(ptCln[0], ptCln[1]);
			let nextTileState = this.board.getState(ptCln[0] + dir[0], ptCln[1] + dir[1]);
			
			if(tileState){
				if(tileState !== pieceState){
					console.log(tileState, pieceState);
					if(nextTileState){
						piecesToChange.push(ptCln.slice(0));
						scoreDelta+=1;
					}
				}else if(piecesToChange.length){
					bookend = true;

					break;
				}
			} else {
				//we've reached the end of this direction
				break;
			}
		}
		if(bookend && piecesToChange.length){
			this.board.updatePieces(piecesToChange, pieceState);
		}
		return scoreDelta;
	}

}

// _flipInDirection(pointer: Array<number>, dir: Array<number>, 
// 		pieceState: string){
// 		let ptCln = pointer.slice(0);
// 		let bookend = false;
// 		let scoreDelta = 0;

// 		while((ptCln[0]>=0 || ptCln[1]>=0) 
// 			&& (ptCln[0]<=this.rows || ptCln[1]<=this.rows)){

// 			ptCln[0] += dir[0];
// 			ptCln[1] += dir[1];
// 			// console.log(this.board.tiles[ptCln[0]][ptCln[1]]);
// 			let tileState = this.board.getState(ptCln[0], ptCln[1]);
// 			if( tileState &&
// 				tileState !== pieceState){

// 				this.board.setState(ptCln[0],ptCln[1], pieceState);
// 				scoreDelta += 1;
// 			} else {
// 				//we've reached the end of this dir
// 				break;
// 			}
// 		}
// 		return scoreDelta;
// 	}