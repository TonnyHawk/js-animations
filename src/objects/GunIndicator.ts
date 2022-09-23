import GameObject from "./basic/GameObject";
import Indicator from "./basic/indicator";
import Person from "./basic/Person";
import Game from "./Game";

export default class GunIndicator extends Indicator {
	constructor(game: Game, target: Person | GameObject) {
		super(game, target);
		this.marginToOwner = 10;
		this.fillColor = "#3FB0F0";
	}

	update(): void {
		if (this.target.gun) {
			this.updateValue(this.target.gun.clipSize, this.target.gun.bulletsInClip);
			this.updatePosition();
		}
	}
}
