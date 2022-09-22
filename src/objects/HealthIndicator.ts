import { coordinate } from "../types";
import GameObject from "./basic/GameObject";
import Indicator from "./basic/indicator";
import Person from "./basic/Person";
import Game from "./Game";

export default class HealthIndicator extends Indicator {
	height: number;
	width: number;
	position: coordinate;
	constructor(game: Game, target: Person | GameObject) {
		super(game, target);
		this.height = 10;
		this.width = 80;
		this.position = {
			top: this.target.position.top + 20,
			left: (this.width - this.target.width) / 2,
		};

		this.game.indicators.push(this);
		this.update();
	}

	updateValue() {
		this.value = {
			max: this.target.hp.full,
			current: this.target.hp.available,
		};
	}

	updatePosition() {
		const left = (this.width - this.target.width) / 2;
		this.position = {
			top: this.target.position.top - (10 + this.height),
			left: this.target.position.left - left,
		};
	}

	update(): void {
		this.updateValue();
		this.updatePosition();
	}

	draw(): void {
		this.update();
		if (this.game.screen) {
			const { screen } = this.game;
			screen.fillStyle = "#D9D9D9";
			screen.fillRect(this.position.left, this.position.top, this.width, this.height);
			screen.fillStyle = "#EA6F6F";
			screen.fillRect(this.position.left, this.position.top, (this.value.current * this.width) / this.value.max, this.height);
		}
	}
}
