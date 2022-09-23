import { getModulus } from "../../utils";
import Game from "../Game";
import GameObject from "./GameObject";

type moveVector = "up" | "down" | "left" | "right";
interface coordinate {
	top: number;
	left: number;
}

export default class Person extends GameObject {
	speed: number;
	direction: coordinate;
	followTarget: {
		obj: GameObject;
		isLeftAligned: boolean;
		isTopAligned: boolean;
	} | null;
	constructor(game: Game) {
		super(game);
		this.speed = 6;
		this.direction = {
			top: 0,
			left: 0,
		};

		this.isDamagable = true;
		this.followTarget = null;
	}

	turn(vector: moveVector) {
		this.moveVectorName = vector;
	}

	setDirection(vector: moveVector, speed = this.speed) {
		switch (vector) {
			case "left":
				this.direction.left = speed * -1;
				this.direction.top = 0;
				this.turn("left");
				break;
			case "right":
				this.direction.left = speed;
				this.direction.top = 0;
				this.turn("right");
				break;
			case "up":
				this.direction.top = speed * -1;
				this.direction.left = 0;
				this.turn("up");
				break;
			case "down":
				this.direction.top = speed * 1;
				this.direction.left = 0;
				this.turn("down");
				break;
		}
	}

	stop() {
		this.direction.left = 0;
		this.direction.top = 0;
	}

	faceToTarget(selfLeft: number, selfTop: number, targetLeft: number, targetTop: number) {
		if (selfLeft > targetLeft) this.turn("left");
		else if (selfLeft < targetLeft) this.turn("right");
		if (selfTop > targetTop) this.turn("up");
		else if (selfTop < targetTop) this.turn("down");
	}

	setFollowTarget(obj: GameObject) {
		if (this.followTarget) this.followTarget.obj = obj;
		else {
			this.followTarget = {
				obj,
				isLeftAligned: false,
				isTopAligned: false,
			};
		}
	}

	follow(targetToFollow: GameObject, stayRange: number, callback: VoidFunction) {
		if (!this.followTarget) this.setFollowTarget(targetToFollow);
		if (this.followTarget) {
			const target = this.followTarget;
			const targetTop = targetToFollow.position.top;
			const targetLeft = targetToFollow.position.left;
			const selfTop = this.position.top;
			const selfLeft = this.position.left;

			const deltaTop = getModulus(targetTop - selfTop);
			const deltaLeft = getModulus(targetLeft - selfLeft);

			const range = stayRange;

			if (deltaTop > 0) target.isTopAligned = false;
			if (deltaLeft > 0) target.isLeftAligned = false;

			const alignTopOnRange = () => {
				if (target) {
					if (deltaTop > range) {
						if (selfTop > targetTop) this.setDirection("up");
						else if (selfTop < targetTop) this.setDirection("down");
					} else {
						target.isTopAligned = true;
						this.direction.top = 0;
						this.faceToTarget(selfLeft, selfTop, targetLeft, targetTop);
					}
				}
			};

			const alignLeftOnRange = () => {
				if (target) {
					if (deltaLeft > range) {
						if (selfLeft > targetLeft) this.setDirection("left");
						else if (selfLeft < targetLeft) this.setDirection("right");
					} else {
						target.isLeftAligned = true;
						this.direction.left = 0;
						this.faceToTarget(selfLeft, selfTop, targetLeft, targetTop);
					}
				}
			};

			const alignTopPerfect = () => {
				if (target) {
					if (deltaTop > 0) {
						let speed = this.speed;
						if (deltaTop < this.speed) speed = deltaTop;
						if (selfTop > targetTop) this.setDirection("up", speed);
						else if (selfTop < targetTop) this.setDirection("down", speed);
					} else {
						target.isTopAligned = true;
						this.direction.top = 0;
						this.faceToTarget(selfLeft, selfTop, targetLeft, targetTop);
					}
				}
			};

			const alignLeftPerfect = () => {
				if (target) {
					if (deltaLeft > 0) {
						let speed = this.speed;
						if (deltaLeft < this.speed) speed = deltaLeft;
						if (selfLeft > targetLeft) this.setDirection("left", speed);
						else if (selfLeft < targetLeft) this.setDirection("right", speed);
					} else {
						target.isLeftAligned = true;
						this.direction.left = 0;
						this.faceToTarget(selfLeft, selfTop, targetLeft, targetTop);
					}
				}
			};

			if (deltaTop <= deltaLeft) {
				if (!target.isTopAligned) alignTopPerfect();
				else alignLeftOnRange();
			}

			if (deltaLeft < deltaTop) {
				if (!target.isLeftAligned) alignLeftPerfect();
				else alignTopOnRange();
			}

			if (target.isLeftAligned && target.isTopAligned) callback();
		}
	}
}
