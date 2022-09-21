import { getTimestamp } from "../../utils";
import Game from "../Game";
import Bullet from "./Bullet";
import { AnimationFrame } from "../../types";
import GameObject from "./GameObject";
import Person from "./Person";

export default class Gun {
	clipSize: number;
	bulletsInClip: number;
	shotRange: number;
	isReloading: boolean;
	reloadingTime: {
		full: number;
		left: number;
		end: number;
	};
	remainingTime: {
		min: number;
		max?: number;
	};
	owner: Person;
	lastShotTime: number;
	game: Game;
	reloadingAnimation: AnimationFrame;

	constructor(game: Game, owner: Person) {
		this.clipSize = 3;
		this.bulletsInClip = 3;
		this.shotRange = 200;
		this.isReloading = false;
		this.reloadingAnimation = null;
		// time betwen two shots
		this.remainingTime = {
			min: 300,
		};
		this.reloadingTime = {
			full: 2000,
			left: 2000,
			end: 0,
		};
		this.owner = owner;
		this.lastShotTime = getTimestamp();
		this.game = game;
	}
	reload() {
		this.isReloading = true;
		console.log("reloading");
		const reloading = () => {
			const now = getTimestamp();
			if (this.reloadingTime.end === 0) this.reloadingTime.end = now + this.reloadingTime.full;
			this.reloadingTime.left = this.reloadingTime.end - now;
			if (this.reloadingTime.left <= 0) {
				this.isReloading = false;
				this.reloadingTime.end = 0;
				this.bulletsInClip = this.clipSize;
				if (this.reloadingAnimation) {
					cancelAnimationFrame(this.reloadingAnimation);
					this.reloadingAnimation = null;
				}
				console.log("gun is ready to shot");
			} else {
				this.reloadingAnimation = requestAnimationFrame(reloading);
			}
		};
		if (!this.reloadingAnimation) {
			this.reloadingAnimation = requestAnimationFrame(reloading);
		}
	}
	shot() {
		if (this.bulletsInClip > 0) {
			const now = getTimestamp();
			if (now - this.lastShotTime > this.remainingTime.min) {
				this.owner.game.objects.push(new Bullet(this.game, this.owner));
				this.bulletsInClip -= 1;
				this.lastShotTime = now;
			}
		} else if (this.bulletsInClip === 0 && this.isReloading === false) {
			this.reload();
		}
	}
}
