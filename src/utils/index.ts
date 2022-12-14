import GameObject from "../objects/basic/GameObject";

export function getModulus(num: number): number {
	if (num >= 0) return num;
	else return num * -1;
}

export function getTimestampInSeconds(): number {
	return Math.floor(Date.now() / 1000);
}

export function getTimestamp(): number {
	return Math.floor(Date.now());
}

export function checkColision(firstObj: GameObject, secondObj: GameObject): boolean {
	if (
		firstObj.getCoords().right >= secondObj.getCoords().left &&
		firstObj.getCoords().left <= secondObj.getCoords().right &&
		firstObj.getCoords().top <= secondObj.getCoords().bottom &&
		firstObj.getCoords().bottom >= secondObj.getCoords().top
	)
		return true;
	else return false;
}

export function isUIElementExists(elSelector: string) {
	return document.querySelector(elSelector);
}

export function waitForUIElementToRender(elSelector: string, callback: VoidFunction) {
	const timer = setInterval(function () {
		if (document.querySelector(elSelector) !== null) {
			clearInterval(timer);
			callback();
		}
	}, 300);
}

export const generateKey = (pre: string) => {
	return `${pre}_${Math.floor(Math.random() * new Date().getTime())}`;
};

export const makeNaturalNumber = (num: number) => {
	if (num < 0) return num * -1;
	else return num;
};
