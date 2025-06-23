import { months } from '../utils/consts';

export function formatDate(date?: Date) {
	if (date) {
		let d = String(date.getDate());
		let m = String(date.getMonth() + 1);
		d = d.length < 2 ? `0${d}` : d;
		m = m.length < 2 ? `0${m}` : m;
		return `${d}.${m}.${date.getFullYear()}`;
	} else {
		return '00.00.0000';
	}
}

export function monthYearLabel(date: Date) {
	return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function areSameDate(date1?: Date, date2?: Date) {
	return date1?.setHours(0, 0, 0, 0) == date2?.setHours(0, 0, 0, 0);
}

// date1 later than date2
export function isDateLater(date1?: Date, date2?: Date) {
	return date1 && date2 ? date1 > date2 : false;
}
