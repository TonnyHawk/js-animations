import GameObject from "../basic/GameObject";
import Indicator from "./Indicator";
import Person from "../basic/Person";
import Game from "../Game";

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

	draw(): void {
		this.update();
		if (this.game.screen) {
			const { screen } = this.game;
			screen.fillStyle = "#D9D9D9";
			screen.fillRect(this.position.left, this.position.top, this.width, this.height);
			screen.fillStyle = this.fillColor;
			screen.fillRect(this.position.left, this.position.top, (this.value.current * this.width) / this.value.max, this.height);
			// draw a border for better visual experience
			screen.strokeStyle = "black";
			screen.strokeRect(this.position.left, this.position.top, this.width, this.height);
			// render text abow the indicator
			screen.font = "14px Arial";
			screen.textAlign = "center";
			screen.fillText("" + Math.floor(this.target.hp.available), this.position.left + this.width / 2, this.position.top - 5);
		}
	}
}
