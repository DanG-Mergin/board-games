import { IGamePiece } from '.';

export interface IGameBoard {
	rows: number;
	cols: number;
	type: string;
	_id?: string;
	tiles: Array<IBoardTile[]>;
}

interface IBoardTile {
	piece?: IGamePiece;
}

export class GameBoard implements IGameBoard {
	rows: number;
	cols: number;
	type: string;
	_id?: string;
	tiles: Array<IBoardTile[]>;

	constructor(rows, cols, type, _id?){
		this.rows = rows;
		this.cols = cols;
		this._id = _id;
		this.tiles = GameBoard._createTiles(rows, cols);		
	}	

	static _createTiles(rows, cols): Array<IBoardTile[]>{
		let tiles = [];

		for(let r=0;r<rows;r++){
			let row = [];
			for(let c=0;c<cols;c++){
				row.push({});
			}
			tiles.push(row);
		}

		return tiles;
	}
	getState(row, col){
		if(row >= 0 && row < this.tiles.length &&
			col >= 0 && col < this.tiles[row].length){
			if(this.tiles[row][col]['piece'] && this.tiles[row][col]['piece']['state']){
				return this.tiles[row][col]['piece'].getState();
			}
		}
		return false;
	}
	setState(row, col, state){
		if(row >= 0 && row < this.tiles.length &&
			col >= 0 && col < this.tiles[row].length){
			if(this.tiles[row][col]['piece'] && this.tiles[row][col]['piece']){
				return this.tiles[row][col]['piece'].setState(state);
			}
		}
		return false;
	}
	addPiece(piece: IGamePiece){
		if(!this.tiles[piece.row][piece.col]['piece']){
			this.tiles[piece.row][piece.col]['piece'] = piece;
		}
	}
	addPieces(pieces: Array<IGamePiece>){
		if(pieces.length){
			for(let i=0, len = pieces.length; i<len; i++){
				this.addPiece(pieces[i]);
			}
		}
	}
	updatePieces(indices: Array<number[]>, state: string){
		if(indices.length){
			for(let i=0, len = indices.length; i<len; i++){
				this.setState(indices[i][0], indices[i][1], state);
			}
		}
		// if(pieces.length){
		// 	for(let piece of pieces){
		// 		this._updatePiece(piece);
		// 	}
		// }
	}
	// _updatePiece(piece: IGamePiece, state: string){
	// 	// this.tiles[piece.row][piece.col]['piece'] = piece;

	// }
}

// export class OthelloBoard extends GameBoard {
	
// }