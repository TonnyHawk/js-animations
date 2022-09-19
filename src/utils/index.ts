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
