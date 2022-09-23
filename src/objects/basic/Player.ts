import Person from "./Person";
import Gun from "./Gun";
import Game from "../Game";
import HealthIndicator from "../HealthIndicator";
import ActionRange from "../addones/ActionRange";

export default class Player extends Person {
	game: Game;
	gun: Gun;
	constructor(game: Game) {
		super(game);
		this.game = game;

		this.height = 50;
		this.width = 50;

		if (this.game.canvasElement !== null) {
			this.position = {
				top: this.game.canvasElement.height / 2 - this.height / 2,
				left: this.game.canvasElement.width / 2 - this.width / 2,
			};
		}

		this.speed = 6;
		this.direction = {
			top: 0,
			left: 0,
		};

		this.gun = new Gun(game, this);
		this.hp.indicator = new HealthIndicator(game, this);

		this.moveVectorName = "up";

		this.actionRanges.add(new ActionRange(this.game, this, 50, "blue"));

		this.updateIndicators();
		this.draw();
	}

	draw() {
		this.actionRanges.draw();
		if (this.game.screen !== null) {
			this.game.screen.fillStyle = "red";
			this.game.screen.fillRect(this.position.left, this.position.top, this.width, this.height);

			const arrowImage = document.getElementById("player-direction-arrow") as HTMLImageElement;
			const shrinkRatio = this.height / arrowImage.height;

			const rotateObject = (angle: number) => {
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

	move() {
		if (this.game.canvasElement !== null) {
			const newTopCoord = this.getCoords().top + this.direction.top;
			const newLeftCoord = this.getCoords().left + this.direction.left;
			const newBottomCoord = this.getCoords().bottom + this.direction.top;
			const newRightCoord = this.getCoords().right + this.direction.left;

			if (newTopCoord > 0 && newBottomCoord < this.game.canvasElement.height) {
				this.position.top = newTopCoord;
			}
			if (newLeftCoord >= 0 && newRightCoord < this.game.canvasElement.width) {
				this.position.left = newLeftCoord;
			}

			this.draw();
		}
	}

	shoot() {
		this.gun.shot();
	}
}
