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

	draw(): void {
		this.update();
		if (this.game.screen && this.target.gun) {
			const { screen } = this.game;
			// basic shape
			screen.fillStyle = "#D9D9D9";
			screen.fillRect(this.position.left, this.position.top, this.width, this.height);
			screen.fillStyle = this.fillColor;
			screen.fillRect(this.position.left, this.position.top, (this.value.current * this.width) / this.value.max, this.height);
			// Draw a border
			screen.strokeStyle = "black";
			screen.strokeRect(this.position.left, this.position.top, this.width, this.height);
			// draw gun clip size
			const { clipSize } = this.target.gun;
			const clipUnitBarWidth = this.width / clipSize;
			for (let i = 0; i < clipSize; i++) {
				const barMarginLeft = clipUnitBarWidth * i;
				screen.strokeRect(this.position.left + barMarginLeft, this.position.top, clipUnitBarWidth, this.height);
			}
		}
	}
}
