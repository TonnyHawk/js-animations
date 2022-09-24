import GameObject from "../basic/GameObject";
import Person from "../basic/Person";
import Game from "../Game";
import Indicator from "./Indicator";

export default class PlayerGunIndicator extends Indicator {
	pageElement: {
		available: HTMLElement;
		full: HTMLElement;
	};
	constructor(game: Game, target: Person | GameObject) {
		super(game, target);
		this.pageElement = {
			available: document.getElementById("gun-prop-available") as HTMLElement,
			full: document.getElementById("gun-prop-full") as HTMLElement,
		};
	}

	draw(): void {
		this.update();
		if (this.target.gun) {
			// update indicator element on the page
			if (!this.target.gun.isReloading) {
				this.pageElement.available.innerText = "" + this.target.gun.bulletsInClip;
				this.pageElement.full.innerText = "" + this.target.gun.clipSize;
			} else {
				this.pageElement.available.innerText = "Reloading....";
			}
		}
	}
}
