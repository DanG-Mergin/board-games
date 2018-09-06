import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { OthelloService, OthelloPiece } from '../../services';

@Component({
  selector: 'app-othello-piece',
  templateUrl: './othello-piece.component.html',
  styleUrls: ['./othello-piece.component.scss']
})
export class OthelloPieceComponent implements OnInit, OnDestroy {
	@Input() piece: OthelloPiece;

	constructor() { }

	ngOnInit() {
		console.log(this.piece);
	}

	ngOnDestroy(){

	}

} 
