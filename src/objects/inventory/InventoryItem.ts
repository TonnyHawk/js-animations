import Game from "../Game";

export default class InventoryItem {
	game: Game;
	itemName: string;
	amount: number;
	image: HTMLElement;
	constructor(game: Game) {
		this.game = game;
		this.itemName = "Bullet";
		this.amount = 1;
		this.image = document.getElementById("inventory-item-bullets") as HTMLElement;
	}
}
