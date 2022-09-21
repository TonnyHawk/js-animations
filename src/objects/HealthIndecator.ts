import GameObject from "./basic/GameObject";
import Indicator from "./basic/indicator";
import Game from "./Game";

export default class HealthIndicator extends Indicator {
	element: HTMLElement;
	progressLineElement: HTMLElement;
	constructor(game: Game, target: GameObject) {
		super(game, target);
		this.element = document.getElementById("player-health-indicator") as HTMLElement;
		this.progressLineElement = this.element.querySelector(".indicator__progress-bar-main-line") as HTMLElement;
	}

	draw() {
		this.update();
		if (this.progressLineElement) {
			this.progressLineElement.style.width = `${this.value.current}%`;
		}
	}
}
