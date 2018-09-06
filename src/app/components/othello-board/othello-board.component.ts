import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { OthelloService, IGameBoard, DisplayService, DisplaySettings } from '../../services';

@Component({
	selector: 'app-othello-board',
	templateUrl: './othello-board.component.html',
	styleUrls: ['./othello-board.component.scss']
})

export class OthelloBoardComponent implements OnInit, OnDestroy{
	public board: IGameBoard;
	boardSub: Subscription;
	positioning = {rowWidth:3.125, padding: 0};

	private settings: DisplaySettings;
	public fontSize;
	public gameboardStyle;

	settingsSub: Subscription;

	constructor(private othelloSvc: OthelloService, private displaySvc: DisplayService) { 
		this.boardSub = this.othelloSvc.subBoard().subscribe(board => { 
			this.board = board; 
		});
		this.settingsSub = this.displaySvc.subDisplay().subscribe(settings => { 
			this.settings = settings[0]; 
			this._updateDisplaySettings();
		});
	}

	ngOnInit() {
		this.othelloSvc.createGame(8,8, ["Player1", "Player2"]);
	}
	_updateDisplaySettings(){
		if(this.settings !== undefined){
			this.fontSize = this.settings.zoom;
			const prefixes = ['-webkit-transform', '-moz-transform', '-ms-transform', 'transform'];
			const buildTransforms = (prefixes) =>
				prefixes.reduce((obj, prefix) => {
					obj[prefix] = `rotateX(${this.settings.degX}deg) rotateY(${this.settings.degY}deg)`;
					return obj;
				}, {});
			this.gameboardStyle = buildTransforms(prefixes);
		}
	}
	addToken(row:number, col:number){
		this.othelloSvc.playerMove(row, col);
	}
	_getRowWidth(cols: number){
		//TODO: add logic for letting the user pick the board size... based on the base font-size
		
		//return {rowWidth: `${rowWidth}em`, padding:`${padding}em`};
	}
    ngOnDestroy() {
        this.boardSub.unsubscribe();
    }
}


