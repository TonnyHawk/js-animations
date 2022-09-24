import Game from "../../Game";
import InventoryItem from "./InventoryItem";

export default class BulletItem extends InventoryItem {
	constructor(game: Game) {
		super(game);
		this.itemName = "Bullet";
		this.amount = 23;
		this.image = document.getElementById("inventory-item-bullets") as HTMLImageElement;
	}
}
