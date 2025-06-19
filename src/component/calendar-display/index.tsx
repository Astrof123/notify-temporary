import clsx from 'clsx';
import s from './calendar-display.module.scss';
import '../../styles.css';
import { useEffect, useState } from 'react';
import CalendarDateCell from '../calendar-date-cell';

interface CalendarDisplayProps {
	date: Date;
	isRight: boolean;
	startDate?: Date;
	hoverDate?: Date;
	endDate?: Date;
	onDateClick: (arg: Date) => void;
	onDateHover: (arg?: Date) => void;
}

const CalendarDisplay = (props: CalendarDisplayProps) => {
	const weekDays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
	const [dates, setDates] = useState<(Date | undefined)[]>([]);

	useEffect(() => {
		const getDayOfFirstDate = () => {
			const day = props.date.getDay();
			return day > 0 ? day : 7;
		};

		const arr: (Date | undefined)[] = [];
		for (let i = 0; i < getDayOfFirstDate() - 1; i++) {
			arr.push(undefined);
		}
		let dateToAdd = new Date(props.date);
		do {
			arr.push(dateToAdd);
			dateToAdd = new Date(
				dateToAdd.getFullYear(),
				dateToAdd.getMonth(),
				dateToAdd.getDate() + 1
			);
		} while (dateToAdd.getMonth() === props.date.getMonth());

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
					<CalendarDateCell
						key={index}
						date={date}
						startDate={props.startDate}
						hoverDate={props.hoverDate}
						endDate={props.endDate}
						onClick={props.onDateClick}
						onHover={props.onDateHover}
					/>
				))}
			</div>
		</div>
	);
};

export default CalendarDisplay;
