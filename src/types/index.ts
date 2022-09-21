export type moveVector = "up" | "down" | "left" | "right";
export interface coordinate {
	top: number;
	left: number;
}

export type AnimationFrame = ReturnType<typeof window.requestAnimationFrame> | null;
