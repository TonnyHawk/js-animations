import GameObject from "./basic/GameObject";
import Indicator from "./basic/Indicator";
import Person from "./basic/Person";
import Game from "./Game";

export default class HealthIndicator extends Indicator {
	constructor(game: Game, target: Person | GameObject) {
		super(game, target);
		this.marginToOwner = 20;
		this.fillColor = "#EA6F6F";
	}

	update(): void {
		this.updateValue(this.target.hp.full, this.target.hp.available);
		this.updatePosition();
	}
}
