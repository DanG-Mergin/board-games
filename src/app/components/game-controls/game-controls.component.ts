import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { OthelloService, Game } from '../../services';

@Component({
  selector: 'app-game-controls',
  templateUrl: './game-controls.component.html',
  styleUrls: ['./game-controls.component.scss']
})
export class GameControlsComponent implements OnInit {
	//public players;
	gameSub: Subscription;
	public game: Game;

	constructor(private othelloSvc: OthelloService) { 
		this.gameSub = this.othelloSvc.subGame().subscribe(game => { 
			this.game = game; 
		});
	}

	ngOnInit() {
		// this.othelloSvc.createGame(8,8, ["Player1", "Player2"]);
	}

}
