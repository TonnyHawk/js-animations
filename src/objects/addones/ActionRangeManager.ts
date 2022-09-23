import ActionRange from "./ActionRange";

export default class ActionRangeManager {
	ranges: ActionRange[];
	constructor(actionRangesArray: ActionRange[] = []) {
		this.ranges = actionRangesArray;
	}
	add(range: ActionRange | ActionRange[]) {
		if (Array.isArray(range)) {
			range.forEach((el: ActionRange) => this.ranges.push(el));
		} else this.ranges.push(range);
	}
	draw() {
		this.ranges.forEach((range: ActionRange) => range.draw());
	}
}
