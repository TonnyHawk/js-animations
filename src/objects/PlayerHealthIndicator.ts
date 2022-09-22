import GameObject from "./basic/GameObject";
import Indicator from "./basic/indicator";
import Game from "./Game";

export default class PlayerHealthIndicator extends Indicator {
	element: HTMLElement;
	progressLineElement: HTMLElement;
	textElement: HTMLElement;
	text: string;
	constructor(game: Game, target: GameObject) {
		super(game, target);
		this.element = document.getElementById("player-health-indicator") as HTMLElement;
		this.progressLineElement = this.element.querySelector(".indicator__progress-bar-main-line") as HTMLElement;
		this.textElement = this.element.querySelector(".indicator__progress-bar-text") as HTMLElement;
		this.text = `${this.value.current}`;
	}

	update(): void {
		this.value = {
			max: this.target.hp.full,
			current: this.target.hp.available,
		};
		this.text = `${this.value.current}`;
	}

	draw() {
		this.update();
		if (this.progressLineElement) {
			this.progressLineElement.style.width = `${(this.value.current * 100) / this.value.max}%`;
			this.textElement.textContent = this.text;
		}
	}
}
