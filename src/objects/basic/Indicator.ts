import Game from "../Game";
import GameObject from "./GameObject";

export default class Indicator {
	value: {
		max: number;
		current: number;
	};
	game: Game;
	target: GameObject;
	constructor(game: Game, target: GameObject) {
		this.game = game;
		this.target = target;
		this.value = {
			max: target.hp.full,
			current: target.hp.available,
		};
	}
	update(): void {
		this.value = {
			max: this.target.hp.full,
			current: this.target.hp.available,
		};
	}
	draw(): void {
		console.log("indicator draw");
	}
}
