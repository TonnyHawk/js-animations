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
	markedForDeletion: boolean;
	constructor(game: Game, target: Person | GameObject) {
		this.game = game;
		this.target = target;
		this.value = {
			max: 100,
			current: 0,
		};
		this.markedForDeletion = false;
	}
	update(): void {
		console.log("indicator update");
	}
	draw(): void {
		console.log("indicator draw");
	}
	destroy() {
		this.markedForDeletion = true;
	}
}
