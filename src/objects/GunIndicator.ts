import Indicator from "./basic/indicator";
import Person from "./basic/Person";
import Game from "./Game";

export default class GunIndicator extends Indicator {
	element: HTMLElement;
	progressLineElement: HTMLElement;
	textElement: HTMLElement;
	text: string;
	constructor(game: Game, target: Person) {
		super(game, target);
		this.element = document.getElementById("player-gun-indicator") as HTMLElement;
		this.progressLineElement = this.element.querySelector(".indicator__progress-bar-main-line") as HTMLElement;
		this.textElement = this.element.querySelector(".indicator__progress-bar-text") as HTMLElement;
		this.text = `${this.value.current}`;
		this.target = target;
	}
	update(): void {
		if (this.target.gun) {
			this.value = {
				max: this.target.gun.clipSize,
				current: this.target.gun.bulletsInClip,
			};
			if (!this.target.gun.isReloading) {
				this.text = `${this.value.current}`;
			} else {
				this.text = "Reloading...";
				this.value.max = this.target.gun.reloadingTime.full;
				this.value.current = this.target.gun.reloadingTime.full - this.target.gun.reloadingTime.left;
			}
		}
	}
	draw() {
		this.update();
		if (this.progressLineElement) {
			this.progressLineElement.style.width = `${(this.value.current * 100) / this.value.max}%`;
			this.textElement.textContent = this.text;
		}
	}
}
