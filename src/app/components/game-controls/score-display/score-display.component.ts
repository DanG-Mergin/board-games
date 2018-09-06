import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { Player, OthelloService } from '../../../services';

@Component({
	selector: 'app-score-display',
	templateUrl: './score-display.component.html',
	styleUrls: ['./score-display.component.scss']
})
export class ScoreDisplayComponent implements OnInit {
	playerSub: Subscription;
	public players: Player[];
	timeRemaining: string[] = [];

	constructor(private othelloSvc: OthelloService) { 
		this.playerSub = this.othelloSvc.subPlayers().subscribe(players => { 
			this.playersChanged(players);
		});
	}
 
	ngOnInit() {
		
	}
	
	playersChanged(players){
		this.players = players; 
		this._updateTime();
	}

	_updateTime(){
		this.timeRemaining = this.players.map(player =>{
			const seconds = player.secondsRemaining;
			return `${this._timeToString(Math.trunc(seconds / 60))}:${this._timeToString(seconds % 60)}`;
		});
	}
	_timeToString(num: number){
		if(num < 10){
			return `0${num}`;
		}
		return `${num}`;
	}

}
