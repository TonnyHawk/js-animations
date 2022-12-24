import { moveVector, coordinate } from "../../types/index";
import { generateKey, getTimestamp } from "../../utils/index";
import ActionRangeManager from "../addones/ActionRangeManager";
import Game from "../Game";
import Gun from "./Gun";
import Indicator from "../indicators/Indicator";

export default class GameObject {
	id: string;
	moveVectorName: moveVector;
	position: coordinate;
	height: number;
	width: number;
	markedForDeletion: boolean;
	isDamagable: boolean;
	game: Game;
	isCollactable: boolean;
	hp: {
		full: number;
		available: number;
		indicator?: Indicator;
		// timestamp of last recieved damage
		lastTimeDamaged: number;
		// how long should object not be damaged to start healing
		timeWithoutDamage: number;
		healing: {
			// ph per seccond
			speed: number;
			// how long should object not be damaged to start healing
			startedAt: number;
			// how much hp has player had before the healing started
			startValue: number;
		};
	};
	type: "enemy" | "player" | "neutral";
	actionRanges: ActionRangeManager;
	gun?: Gun;
	indicators: Indicator[];
	constructor(game: Game) {
		this.isCollactable = false;
		this.id = generateKey("obj");
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
			lastTimeDamaged: 0,
			timeWithoutDamage: 3000,
			healing: {
				speed: 20,
				startedAt: 0,
				startValue: 0,
			},
		};
		this.isDamagable = false;
		this.type = "neutral";
		this.actionRanges = new ActionRangeManager();
		this.indicators = [];
	}

	heal() {
		const now = getTimestamp();
		const lastTimeDamagedDelta = now - this.hp.lastTimeDamaged;

		if (this.hp.available < this.hp.full && lastTimeDamagedDelta > this.hp.timeWithoutDamage) {
			if (this.hp.healing.startedAt === 0) {
				this.hp.healing.startedAt = now;
				this.hp.healing.startValue = this.hp.available;
			}
			const healingDelta = now - this.hp.healing.startedAt;
			this.hp.available = this.hp.healing.startValue + (healingDelta * this.hp.healing.speed) / 1000;
		} else this.hp.healing.startedAt = 0;

		// to prevent available hp be a '100' with floating point like '100.00030'
		if (this.hp.available >= this.hp.full) this.hp.available = this.hp.full;
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
		this.hp.lastTimeDamaged = getTimestamp();
		// console.log("hp: " + this.hp.available);

		if (this.hp.available <= 0) this.die();
	}

	die() {
		// make some animations and side effects and then
		// disapear
		this.markedForDeletion = true;
		this.indicators.forEach((indicator: Indicator) => indicator.destroy());
	}

	move() {
		// console.log("moving");
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
