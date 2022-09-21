import Game from "../Game";
import GameObject from "./GameObject";
import Person from "./Person";

export default class Indicator {
	value: {
		max: number;
		current: number;
	};
	game: Game;
	target: Person | GameObject;
	constructor(game: Game, target: Person | GameObject) {
		this.game = game;
		this.target = target;
		this.value = {
			max: 0,
			current: 0,
		};
	}
	update(): void {
		console.log("indicator update");
	}
	draw(): void {
		console.log("indicator draw");
	}
}
