export interface IPlayer {
	name: string;
	high_score: number;
	score: number;
	team: string;
	secondsRemaining: number;
	_id?: string;
}

export class Player implements IPlayer {
	name: string;
	high_score: number;
	score: number;
	team: string;
	secondsRemaining: number;
	_id?: string;
	static timer: any;


	constructor(name, team, score?){
		this.name = name;	
		this.team = team;
		this.high_score = 0;
		this.score = score || 0;
		this.secondsRemaining = 0;	
	}	
	changeScore(scoreDelta: number){
		this.score += scoreDelta;
	}
	updateHighScore(score:number) {
		if(score > this.high_score){
			this.high_score = score;
		}
	}
	//time is in seconds
	updatePlayerTimeRemaining(time:number){
		this.secondsRemaining = time;
	}
	startPlayerClock(){
		Player.timer = setInterval(()=>{    
			if(this.secondsRemaining > 0){
				this.secondsRemaining -= 1;
			} else {
				this.stopPlayerClock();
			}
		 }, 1000);
	}
	stopPlayerClock(){
		if(Player.timer !== undefined){
			clearInterval(Player.timer);
		}
	}

}
