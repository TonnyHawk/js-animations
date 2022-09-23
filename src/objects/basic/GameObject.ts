import { moveVector, coordinate } from "../../types";
import ActionRangeManager from "../addones/ActionRangeManager";
import Game from "../Game";
import Gun from "./Gun";
import Indicator from "./Indicator";

export default class GameObject {
	id: number;
	moveVectorName: moveVector;
	position: coordinate;
	height: number;
	width: number;
	markedForDeletion: boolean;
	isDamagable: boolean;
	game: Game;
	hp: {
		full: number;
		available: number;
		indicator?: Indicator;
	};
	type: "enemy" | "player" | "neutral";
	actionRanges: ActionRangeManager;
	gun?: Gun;
	indicators: Indicator[];
	constructor(game: Game) {
		this.id = Date.now() * Math.floor(Math.random() * 100);
		this.moveVectorName = "up";
		this.position = {
			top: 0,
			left: 0,
		};
		this.height = 10;
		this.width = 10;
		this.markedForDeletion = false;
		this.game = game;
		this.hp = {
			full: 100,
			available: 100,
		};
		this.isDamagable = false;
		this.type = "neutral";
		this.actionRanges = new ActionRangeManager();
		this.indicators = [];
	}
	updateIndicators() {
		if (this.hp.indicator) this.indicators.push(this.hp.indicator);
		if (this.gun) this.indicators.push(this.gun.indicator);
	}
	getDirectionName() {
		return this.moveVectorName;
	}
	getCoords() {
		return {
			top: this.position.top,
			left: this.position.left,
			bottom: this.position.top + this.height,
			right: this.position.left + this.width,
		};
	}
	getDamaged(damage: number) {
		this.hp.available -= damage;
		console.log("hp: " + this.hp.available);

		if (this.hp.available <= 0) this.die();
	}

	die() {
		// make some animations and side effects and then
		// disapear
		this.markedForDeletion = true;
		this.indicators.forEach((indicator: Indicator) => indicator.destroy());
	}

	move() {
		console.log("moving");
	}

	setSize(width: number, height: number) {
		this.width = width;
		this.height = height;
	}

	setPosition(left: number, top: number) {
		this.position.left = left;
		this.position.top = top;
	}
}
