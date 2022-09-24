import GameObject from "../basic/GameObject";
import Person from "../basic/Person";
import Game from "../Game";
import GunIndicator from "./GunIndicator";

export default class PlayerGunIndicator extends GunIndicator {
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
				this.pageElement.available.innerText = "" + this.value.current;
				this.pageElement.full.innerText = "" + this.value.max;
			} else {
				this.pageElement.available.innerText = "0";
			}
		}
	}
}
