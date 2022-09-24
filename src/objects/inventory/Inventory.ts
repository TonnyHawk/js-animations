import Person from "../basic/Person";
import Game from "../Game";
import InventoryItem from "./items/InventoryItem";

export default class Inventory {
	game: Game;
	owner: Person;
	items: InventoryItem[];
	constructor(game: Game, owner: Person) {
		this.game = game;
		this.owner = owner;
		this.items = [];
	}
	addItem(item: InventoryItem) {
		this.items.push(item);
	}
	show() {
		console.log("----INVENTORY---");
		if (this.items.length > 0) {
			this.items.forEach((el) => console.log(el));
		} else console.log("inventory is empty");
	}
}
