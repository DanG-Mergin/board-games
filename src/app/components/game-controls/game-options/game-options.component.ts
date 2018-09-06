import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { OthelloService } from '../../../services';

@Component({
	selector: 'app-game-options',
	templateUrl: './game-options.component.html',
	styleUrls: ['./game-options.component.scss']
})
//TODO: implement destroy to unsubscribe
export class GameOptionsComponent implements OnInit {
	gameSub: Subscription;
	public disabled = false;

	constructor(private othelloSvc: OthelloService) { 
		this.gameSub = this.othelloSvc.subGame().subscribe(game => { 
			// this.disabled = !game.running;
		});
	}

	ngOnInit() {
	}

	newGame(){
		this.othelloSvc.createGame();
	}
}

		
