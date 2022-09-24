import GameObject from "../../basic/GameObject";
import Player from "../../basic/Player";
import Game from "../../Game";

export default class InventoryItem extends GameObject {
	itemName: string;
	amount: number;
	image: HTMLImageElement;
	constructor(game: Game) {
		super(game);
		this.game = game;
		this.itemName = "Random item";
		this.amount = 1;
		this.image = document.getElementById("inventory-item-random") as HTMLImageElement;
		this.setPosition(200, 200);
		this.setSize(30, 30);
		this.game.objects.push(this);
	}

	draw() {
		const { screen } = this.game;
		if (screen) {
			if (this.image) {
				screen.strokeStyle = "brown";
				screen.drawImage(this.image, this.position.left, this.position.top, this.width, this.height);
				screen.strokeRect(this.position.left, this.position.top, this.width, this.height);
			} else console.log("can not find image to draw inventory item called - " + this.itemName);
		}
	}

	collect(person: Player) {
		person.inventory.addItem(this);
		this.die();
	}
}
