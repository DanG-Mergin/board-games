export interface IDisplaySettings {
	zoom: number;
	degX: number;
	degY: number;
	delta: number;
}

export class DisplaySettings implements IDisplaySettings {
	zoom: number;
	initialZoom: number;
	degX: number;
	degY: number;
	delta: number;

	constructor(zoom, rotateX, rotateY){
		this.zoom = zoom;
		this.initialZoom = zoom;
		this.degX = rotateX;
		this.degY = rotateY;
		this.delta = 10;
	}
	rotate(direction: number, axis: string){
		axis = axis.toUpperCase();
		
		if(direction && axis.length && (axis==='Y' || axis==='X')){
			const rotAxis = 'deg' + axis;
			this[rotAxis] += direction * this.delta;
		}
	}
	zoomView(percentChange: number){
		if(percentChange){
			// percentChange = percentChange/100;
			this.zoom = this.zoom + (this.initialZoom * (percentChange/100));
		}
	}

}