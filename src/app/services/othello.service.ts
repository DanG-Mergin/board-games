import { Injectable } from '@angular/core';

import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { OthelloGame, GameBoard, Player } from './types'


@Injectable()
export class OthelloService {
	private _game: OthelloGame;
	//TODO: this should be a clock service we can subscribe to: a single source of truth
	//and the player timer should also be listening to that...  
	private _updateTimer: any;

	private _boardSubject = new Subject<GameBoard>();
	private _gameSubject = new Subject<OthelloGame>();
	private _playerSubject = new BehaviorSubject<Player[]>([]);
	

	private numRows = 10;

	constructor() {
		// this.createGame(10,10, ["Player1", "Player2"]);
	}
	/*we would use player IDs here of course, and actual services... 
	but for the sake of brevity...*/
	createGame(rows: number = 8, cols: number= 8, playerNames: Array<string> =["Player1", "Player2"]){
		const players = [
			new Player(playerNames[0], 'heads', 2), 
			new Player(playerNames[1], 'tails', 2)
		];
		this._game = new OthelloGame(players, rows, cols);

		this._boardSubject.next(this._game.board);
		this._gameSubject.next(this._game);
		this._playerSubject.next(this._game.players);
	}
	subBoard(): Observable<GameBoard>{
		return this._boardSubject.asObservable();
	}
	subGame(): Observable<OthelloGame>{
		return this._gameSubject.asObservable();
	}
	subPlayers(): Observable<Player[]>{
		return this._playerSubject.asObservable();
	}
	playerMove(row: number, col: number){
		this._game.playerMove(row, col);
		//TODO: implement a message service and clock class
		this.stopPlayerClock();
		this._updateTimer = setInterval(()=>{    
			this._playerSubject.next(this._game.players);
		 }, 1000);
	}

	stopPlayerClock(){
		if(this._updateTimer !== undefined){
			clearInterval(this._updateTimer);
		}
	}
}
