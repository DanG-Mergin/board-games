import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { IonRangeSliderModule } from "ng2-ion-range-slider";
// import { library } from '@fortawesome/fontawesome-svg-core';

//Services
import { OthelloService, DisplayService } from './services';

//Components
import { AppComponent } from './app.component';
import { OthelloBoardComponent, OthelloPieceComponent } from './components';
import { GameControlsComponent } from './components/game-controls/game-controls.component';
import { DisplayControlComponent } from './components/game-controls/display-control/display-control.component';
import { ScoreDisplayComponent } from './components/game-controls/score-display/score-display.component';
import { GameOptionsComponent } from './components/game-controls/game-options/game-options.component';

//add icons to the library for use in other components  
// import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
// library.add(faArrowAltCircleRight);

@NgModule({
	declarations: [
		AppComponent, 
		OthelloPieceComponent,
		OthelloBoardComponent,
		GameControlsComponent,
		DisplayControlComponent,
		ScoreDisplayComponent,
		GameOptionsComponent
	],
	imports: [
		BrowserModule,
		NgbModule,
		FontAwesomeModule,
		Angular2FontawesomeModule,
		IonRangeSliderModule
	],
	providers: [ 
		OthelloService, 
		DisplayService 
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
