import KeyDetector from "./keyDetector";
import Player from "./basic/Player";
import PopupScreen from "./PopupScreen";
import Enemy from "./basic/Enemy";
import GameObject from "./basic/GameObject";
import PlayerHealthIndicator from "./PlayerHealthIndicator";
import Indicator from "./basic/indicator";
import PlayerGunIndicator from "./PlayerGunIndicator";
import { AnimationFrame } from "../types";

export default class Game {
	animation: AnimationFrame;
	isAnimationRunning: boolean;
	canvasElement: HTMLCanvasElement | null;
	screen: CanvasRenderingContext2D | null;
	objects: GameObject[];
	indicators: Indicator[];
	popupScreen: any;
	player: Player;
	constructor() {
		this.animation = null;
		this.isAnimationRunning = false;

		this.canvasElement = document.getElementById("screen") as HTMLCanvasElement;

		this.canvasElement.width = window.innerWidth - 10;
		this.canvasElement.height = window.innerHeight - 10;
		this.screen = this.canvasElement.getContext("2d") as CanvasRenderingContext2D;

		this.draw = this.draw.bind(this);
		this.resume = this.resume.bind(this);
		this.popupScreen = new PopupScreen(this);

		this.objects = [];
		this.indicators = [];

		this.player = new Player(this);
	}

	start() {
		this.objects.push(this.player);
		this.objects.push(new Enemy(this));
		new KeyDetector(this, this.player);
		this.draw();
		this.indicators.push(new PlayerHealthIndicator(this, this.player));
		this.indicators.push(new PlayerGunIndicator(this, this.player));
	}

	draw() {
		this.deleteMarkedObjects();
		if (this.screen !== null && this.canvasElement !== null) {
			this.screen.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
			// drawing game objects
			this.objects.forEach((gameObject: GameObject) => gameObject.move());
			// drawing indicators
			this.indicators.forEach((indicator: Indicator) => indicator.draw());
			// storing animation frame information
			this.animation = requestAnimationFrame(this.draw);
			this.isAnimationRunning = true;
		}
	}

	deleteMarkedObjects() {
		const cleanedList: GameObject[] = [];
		this.objects.forEach((el) => {
			if (!el.markedForDeletion) cleanedList.push(el);
		});
		this.objects = cleanedList;

		const cleanedIndicators: Indicator[] = [];
		this.indicators.forEach((el: Indicator) => {
			if (!el.markedForDeletion) cleanedIndicators.push(el);
		});
		this.indicators = cleanedIndicators;
	}

	resume() {
		this.draw();
		this.popupScreen.hide();
	}

	pause() {
		if (this.animation !== null) {
			cancelAnimationFrame(this.animation);
			this.isAnimationRunning = false;

			this.popupScreen.show();
		} else {
			console.log("Game can not be stopped");
			console.log("animation was not stored");
		}
	}
}
