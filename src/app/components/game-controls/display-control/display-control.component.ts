import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DisplayService, DisplaySettings } from '../../../services';
@Component({
	selector: 'app-display-control',
	templateUrl: './display-control.component.html',
	styleUrls: ['./display-control.component.scss']
})
export class DisplayControlComponent implements OnInit {

	settingsSub: Subscription;
	public settings: DisplaySettings;
	private lastSliderPercent = 50;

	constructor(private displaySvc: DisplayService) { 
		this.settingsSub = this.displaySvc.subDisplay().subscribe(settings => { 
			this.settings = settings[0]; 
		});
	}
	ngOnInit() {
		
	}
	rotateX(direction: number){
		this.displaySvc.rotate(direction, 'X');
	}
	rotateY(direction: number){
		this.displaySvc.rotate(direction, 'Y');
	}

	zoomUpdate(event){
		
	}
	zoomChange(event){
		const delta = event['from_percent'] - this.lastSliderPercent;
		this.displaySvc.zoom(delta);
		this.lastSliderPercent = this.lastSliderPercent + delta;

	}
	zoomFinish(event){
		// console.log(`Finish ${event}`);
	}
	resetDisplay(){
		this.displaySvc.resetSettings();
	}

}
