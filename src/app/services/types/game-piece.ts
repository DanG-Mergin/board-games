export interface IGamePiece {
	row: number;
	col: number;
	state: string;

	setState(state: string);
	getState();
}


export class OthelloPiece implements IGamePiece {
	row: number;
	col: number;
	state: string;

	//static so that each instance doesn't get the states
	static _states: string[] = ['flipped heads', 'flipped tails', 'tails', 'heads'];

	constructor(row: number, col: number, state?: string){
		this.row = row;
		this.col = col;
		this.state = state || '';
	}	

	setState(state: string){
		if(OthelloPiece._states.indexOf(state) > -1){
			this.state = state;
		}
	}
	getState(){
		return this.state;
	}
}