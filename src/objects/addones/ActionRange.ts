import Addone from "../basic/Addone";
import Person from "../basic/Person";
import Game from "../Game";

export default class ActionRange extends Addone {
	owner: Person;
	range: number;
	color: string;
	constructor(game: Game, owner: Person, range: number, color?: string) {
		super(game);
		this.owner = owner;
		this.range = range;
		this.color = "red";
		if (color) this.color = color;

		this.setSize(this.owner.width + this.range * 2, this.owner.height + this.range * 2);
		this.setPosition(this.owner.position.left - this.range, this.owner.position.top - this.range);
	}

	setColor(color: string) {
		this.color = color;
	}

	setRange(range: number) {
		this.range = range;
	}

	update() {
		const left = this.owner.position.left - this.range;
		const top = this.owner.position.top - this.range;
		this.setPosition(left, top);
	}
	draw() {
		this.update();

		const { screen } = this.game;
		if (screen) {
			screen.strokeStyle = this.color;
			screen.beginPath();
			screen.moveTo(this.getCoords().left, this.getCoords().top);
			screen.lineTo(this.getCoords().right, this.getCoords().top);
			screen.lineTo(this.getCoords().right, this.getCoords().bottom);
			screen.lineTo(this.getCoords().left, this.getCoords().bottom);
			screen.closePath();
			screen.stroke();
		}
	}
}
