import GameObject from "../../basic/GameObject";
import Player from "../../basic/Player";
import Game from "../../Game";

export default class InventoryItem extends GameObject {
	image: HTMLImageElement;
	description: {
		name: string;
		amount: number;
		image: string;
		text: string;
	};
	constructor(game: Game, left: number, top: number) {
		super(game);
		this.game = game;
		this.image = document.getElementById("inventory-item-random") as HTMLImageElement;
		this.setPosition(left, top);
		this.setSize(30, 30);
		this.game.objects.push(this);
		this.isCollactable = true;
		this.description = {
			name: "Empty item",
			amount: 1,
			image: this.image.src,
			text: "No description",
		};
	}

	draw() {
		const { screen } = this.game;
		if (screen) {
			if (this.image) {
				screen.strokeStyle = "brown";
				screen.drawImage(this.image, this.position.left, this.position.top, this.width, this.height);
				screen.strokeRect(this.position.left, this.position.top, this.width, this.height);
			} else console.log("can not find image to draw inventory item called - " + this.description.name);
		}
	}

	collect(person: Player) {
		person.around.remove(this);
		person.inventory.addItem(this);
		this.die();
	}
}
