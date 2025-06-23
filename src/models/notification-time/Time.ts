export class Time {
	hour: number;
	minute: number;

	constructor(hour: number, minute: number) {
		if (hour < 0 || hour > 23) {
			throw new Error(`Expected value [0;23], got ${hour}`);
		}
		if (minute < 0 || minute > 59) {
			throw new Error(`Expected value [0;59], got ${minute}`);
		}
		this.hour = hour;
		this.minute = minute;
	}

	equals(other: Time) {
		return this.hour === other.hour && this.minute === other.minute;
	}

	toString() {
		let h = String(this.hour);
		let m = String(this.minute);
		h = h.length < 2 ? `0${h}` : h;
		m = m.length < 2 ? `0${m}` : m;
		return `${h}:${m}`;
	}
}
