import { getModulus } from "../../utils";
import Gun from "./Gun";
import Person from "./Person";
import Game from "../Game";
import GameObject from "./GameObject";

export default class Enemy extends Person {
	gun: Gun;
	temporarySpeed: number;
	target: {
		obj: GameObject;
		isLeftAligned: boolean;
		isTopAligned: boolean;
	} | null;
	constructor(game: Game, target: GameObject | null = null) {
		super(game);

		this.height = 50;
		this.width = 50;
		this.position = {
			top: 0,
			left: 0,
		};

		this.speed = 1;
		this.temporarySpeed = this.speed;
		this.direction = {
			top: 0,
			left: 0,
		};
		if (target) {
			this.target = {
				obj: target,
				// self alignment to targer
				isTopAligned: false,
				isLeftAligned: false,
			};
		} else this.target = null;

		this.type = "enemy";

		this.moveVectorName = "up";

		this.fight = this.fight.bind(this);

		this.gun = new Gun(game, this);

		this.isDamagable = true;

		this.draw();
	}

	draw() {
		if (this.game.screen !== null) {
			this.game.screen.fillStyle = "blue";
			this.game.screen.fillRect(this.position.left, this.position.top, this.width, this.height);

			let arrowImage = document.getElementById("player-direction-arrow") as HTMLImageElement;
			let shrinkRatio = this.height / arrowImage.height;

			let rotateObject = (angle: number) => {
				if (this.game.screen !== null) {
					this.game.screen.save();
					this.game.screen.translate(this.position.left + this.width / 2, this.position.top + this.height / 2);
					this.game.screen.rotate((angle * Math.PI) / 180);
					this.game.screen.fillStyle = "blue";
					this.game.screen.drawImage(arrowImage, (-1 * this.width) / 2 + 8.5, (-1 * this.height) / 2, this.width * shrinkRatio, this.height);
					this.game.screen.restore();
				}
			};
			switch (this.moveVectorName) {
				case "left":
					rotateObject(-90);
					break;
				case "right":
					rotateObject(90);
					break;
				case "up":
					rotateObject(0);
					break;
				case "down":
					rotateObject(180);
					break;
			}
		}
	}

	setTarget(gameObject: GameObject) {
		this.target = {
			obj: gameObject,
			isLeftAligned: false,
			isTopAligned: false,
		};
	}

	resetTarget() {
		if (this.target) this.target = null;
	}

	attack(callback: Function) {
		if (this.target) {
			let targetTop = this.target.obj.position.top;
			let targetLeft = this.target.obj.position.left;
			let selfTop = this.position.top;
			let selfLeft = this.position.left;

			let deltaTop = getModulus(targetTop - selfTop);
			let deltaLeft = getModulus(targetLeft - selfLeft);

			let range = this.gun.shotRange;

			if (deltaTop > 0) this.target.isTopAligned = false;
			if (deltaLeft > 0) this.target.isLeftAligned = false;

			let alignTopOnRange = () => {
				if (this.target) {
					if (deltaTop > range) {
						if (selfTop > targetTop) this.setDirection("up");
						else if (selfTop < targetTop) this.setDirection("down");
					} else {
						this.target.isTopAligned = true;
						this.direction.top = 0;
						this.faceToTarget(selfLeft, selfTop, targetLeft, targetTop);
					}
				}
			};

			let alignLeftOnRange = () => {
				if (this.target) {
					if (deltaLeft > range) {
						if (selfLeft > targetLeft) this.setDirection("left");
						else if (selfLeft < targetLeft) this.setDirection("right");
					} else {
						this.target.isLeftAligned = true;
						this.direction.left = 0;
						this.faceToTarget(selfLeft, selfTop, targetLeft, targetTop);
					}
				}
			};

			let alignTopPerfect = () => {
				if (this.target) {
					if (deltaTop > 0) {
						let speed = this.speed;
						if (deltaTop < this.speed) speed = deltaTop;
						if (selfTop > targetTop) this.setDirection("up", speed);
						else if (selfTop < targetTop) this.setDirection("down", speed);
					} else {
						this.target.isTopAligned = true;
						this.direction.top = 0;
						this.faceToTarget(selfLeft, selfTop, targetLeft, targetTop);
					}
				}
			};

			let alignLeftPerfect = () => {
				if (this.target) {
					if (deltaLeft > 0) {
						let speed = this.speed;
						if (deltaLeft < this.speed) speed = deltaLeft;
						if (selfLeft > targetLeft) this.setDirection("left", speed);
						else if (selfLeft < targetLeft) this.setDirection("right", speed);
					} else {
						this.target.isLeftAligned = true;
						this.direction.left = 0;
						this.faceToTarget(selfLeft, selfTop, targetLeft, targetTop);
					}
				}
			};

			if (deltaTop <= deltaLeft) {
				if (!this.target.isTopAligned) alignTopPerfect();
				else alignLeftOnRange();
			}

			if (deltaLeft < deltaTop) {
				if (!this.target.isLeftAligned) alignLeftPerfect();
				else alignTopOnRange();
			}

			if (this.target.isLeftAligned && this.target.isTopAligned) callback();
		} else {
			this.stop();
		}
	}

	move() {
		if (this.game.canvasElement) {
			this.attack(this.fight);

			let newTopCoord = this.getCoords().top + this.direction.top;
			let newLeftCoord = this.getCoords().left + this.direction.left;
			let newBottomCoord = this.getCoords().bottom + this.direction.top;
			let newRightCoord = this.getCoords().right + this.direction.left;

			if (newTopCoord > 0 && newBottomCoord < this.game.canvasElement.height) {
				this.position.top = newTopCoord;
			}
			if (newLeftCoord >= 0 && newRightCoord < this.game.canvasElement.width) {
				this.position.left = newLeftCoord;
			}

			this.draw();
		}
	}

	fight() {
		if (this.target) {
			if (this.target.obj.hp.available > 0) this.gun.shot();
			else this.resetTarget();
		}
	}
}
