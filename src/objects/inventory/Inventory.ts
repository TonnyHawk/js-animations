import Player from "../basic/Player";
import Game from "../Game";
import InventoryItem from "./items/InventoryItem";

export default class Inventory {
	game: Game;
	owner: Player;
	items: InventoryItem[];
	isVisible: boolean;
	constructor(game: Game, owner: Player) {
		this.game = game;
		this.owner = owner;
		this.items = [];
		this.isVisible = false;
	}
	addItem(item: InventoryItem) {
		this.items.push(item);
		this.game.inventoryMenu.render(this.isVisible);
	}
	dropItem(item: InventoryItem) {
		this.items = this.items.filter((el) => el.id !== item.id);
		this.game.inventoryMenu.render(this.isVisible);
		if (item.description.amount > 0) {
			// place item in front of the player
			const { top, left, right, bottom } = this.owner.getCoords();
			const dropDistance = 20;
			switch (this.owner.moveVectorName) {
				case "up":
					item.setPosition(left + this.owner.width / 2 - item.width, top - dropDistance);
					break;
				case "down":
					item.setPosition(left + this.owner.width / 2 - item.width, bottom + dropDistance);
					break;
				case "left":
					item.setPosition(left - dropDistance, top + this.owner.width / 2 - item.width / 2);
					break;
				case "right":
					item.setPosition(right + dropDistance, top + this.owner.width / 2 - item.width / 2);
					break;
			}
			item.markedForDeletion = false;
			this.owner.game.items.push(item);
		}
	}
	useItem(item: InventoryItem) {
		let isItemAvailable = item.executeEffect(this.owner);
		if (!isItemAvailable) this.dropItem(item);
		else this.game.inventoryMenu.render(this.isVisible);
	}
	toggleVisibility() {
		this.isVisible = !this.isVisible;
		this.game.inventoryMenu.render(this.isVisible);
	}
}
