import Person from "../basic/Person";
import Game from "../Game";
import InventoryItem from "./items/InventoryItem";

export default class Inventory {
	game: Game;
	owner: Person;
	items: InventoryItem[];
	isVisible: boolean;
	constructor(game: Game, owner: Person) {
		this.game = game;
		this.owner = owner;
		this.items = [];
		this.isVisible = false;
	}
	addItem(item: InventoryItem) {
		this.items.push(item);
	}
	toggleVisibility() {
		this.isVisible = !this.isVisible;
		this.game.inventoryMenu.render(this.isVisible);
	}
}
