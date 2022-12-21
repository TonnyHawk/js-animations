import { coordinate } from "../../types/index";
import Game from "../Game";
import GameObject from "../basic/GameObject";
import Person from "../basic/Person";

export default class Indicator {
	value: {
		max: number;
		current: number;
	};
	game: Game;
	target: Person | GameObject;
	markedForDeletion: boolean;
	height: number;
	width: number;
	position: coordinate;
	marginToOwner: number;
	fillColor: string;
	constructor(game: Game, target: Person | GameObject) {
		this.game = game;
		this.target = target;
		this.value = {
			max: 100,
			current: 0,
		};
		this.markedForDeletion = false;
		this.height = 10;
		this.width = 80;
		this.marginToOwner = 10;
		this.position = {
			top: this.target.position.top + this.marginToOwner,
			left: (this.width - this.target.width) / 2,
		};
		this.fillColor = "red";
		this.game.indicators.push(this);
		this.update();
	}

	updateValue(max: number, current: number) {
		this.value = { max, current };
	}

	updatePosition() {
		const left = (this.width - this.target.width) / 2;
		this.position = {
			top: this.target.position.top - (this.marginToOwner + this.height),
			left: this.target.position.left - left,
		};
	}

	update(): void {
		// console.log("indicator update");^
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
		}
	}

	destroy() {
		this.markedForDeletion = true;
	}
}
