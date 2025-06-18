import clsx from 'clsx';
import s from './calendar-display.module.scss';
import '../../styles.css';
import { useEffect, useState } from 'react';

interface CalendarDisplayProps {
	date: Date;
	isRight: boolean;
}

const CalendarDisplay = (props: CalendarDisplayProps) => {
	const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
	const [dates, setDates] = useState<string[]>([]);

	function getDayOfFirstDate() {
		const day = props.date.getDay();
		return day > 0 ? day : 7;
	}

	function getDaysInMonth() {
		return (
			33 -
			new Date(props.date.getFullYear(), props.date.getMonth(), 33).getDate()
		);
	}

	useEffect(() => {
		const arr: string[] = [];
		console.log(getDayOfFirstDate(), getDaysInMonth());

		for (let i = 0; i < getDayOfFirstDate() - 1; i++) {
			arr.push('');
		}
		for (let i = 1; i <= getDaysInMonth(); i++) {
			arr.push(i.toString());
		}

		setDates(arr);
	}, [props.date]);

	return (
		<div
			className={clsx(
				s['calendar-display'],
				props.isRight ? s['right'] : s['left']
			)}>
			<div className={clsx(s['week-days-header'])}>
				{weekDays.map((day, index) => (
					<span key={index} className={clsx(s['week-day'])}>
						{day}
					</span>
				))}
			</div>
			<div className={clsx(s['days-box'])}>
				{dates.map((date, index) => (
					<div key={index} className={clsx(s['date'])}>
						{date}
					</div>
				))}
			</div>
		</div>
	);
};

export default CalendarDisplay;
