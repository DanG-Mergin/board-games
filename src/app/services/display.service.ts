import { Injectable } from '@angular/core';

import { Observable, Subject, BehaviorSubject } from 'rxjs';

import { DisplaySettings } from './types'

@Injectable()
export class DisplayService {
	private _defaults: DisplaySettings;
	private _currentSettings: DisplaySettings;

	private _displaySubject = new BehaviorSubject<DisplaySettings[]>([]);

	constructor() { 
		this._defaults = this._getDefaults();
		this._currentSettings = this._getDefaults();
		this._displaySubject.next([this._currentSettings]);
	}

	subDisplay(): Observable<DisplaySettings[]>{
		return this._displaySubject.asObservable();
	}
	//This would ideally grab data from a db/local storage for the user
	_getDefaults(){
		return new DisplaySettings(125, -45, 0);
	}
	//takes a -1 or 1
	rotate(direction: number, axis: string){
		this._currentSettings.rotate(direction, axis);
		this._displaySubject.next([this._currentSettings]);
	}
	zoom(percentChange: number){
		this._currentSettings.zoomView(percentChange);
		this._displaySubject.next([this._currentSettings]);
	}

	resetSettings(){
		this._currentSettings = this._getDefaults();
		this._displaySubject.next([this._currentSettings]);
	}
	saveSettings(){

	}

}
