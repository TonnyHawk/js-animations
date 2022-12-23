import Game from "../../Game";
import InventoryItem from "./InventoryItem";

export default class BulletItem extends InventoryItem {
	constructor(game: Game, left: number, top: number) {
		super(game, left, top);
		this.itemName = "Bullet";
		this.amount = 23;
		this.image = document.getElementById("inventory-item-bullets") as HTMLImageElement;
	}
}
