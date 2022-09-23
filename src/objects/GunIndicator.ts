import GameObject from "./basic/GameObject";
import Indicator from "./basic/Indicator";
import Person from "./basic/Person";
import Game from "./Game";

export default class GunIndicator extends Indicator {
	constructor(game: Game, target: Person | GameObject) {
		super(game, target);
		this.marginToOwner = 10;
		this.fillColor = "#3FB0F0";
	}

	updateValue(max: number, current: number): void {
		if (this.target.gun) {
			this.value = { max, current };
			if (this.target.gun.isReloading) {
				this.value.max = this.target.gun.reloadingTime.full;
				this.value.current = this.target.gun.reloadingTime.full - this.target.gun.reloadingTime.left;
			}
		}
	}

	update(): void {
		if (this.target.gun) {
			this.updateValue(this.target.gun.clipSize, this.target.gun.bulletsInClip);
			this.updatePosition();
		}
	}
}
