import clsx from 'clsx';
import s from './calendar-display.module.scss';
import '../../styles.css';
import { useEffect, useState } from 'react';
import CalendarDateCell from '../calendar-date-cell';
import { weekDays } from '../../utils/consts';
import { areSameDate, isDateLater } from '../../utils/funcs';

interface CalendarDisplayProps {
	date: Date;
	isDoublePick: boolean;
	startDate?: Date;
	hoverDate?: Date;
	endDate?: Date;
	onDateClick: (arg: Date) => void;
	onDateHover?: (arg?: Date) => void;
}

const CalendarDisplay = (props: CalendarDisplayProps) => {
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

	function getDateClass(date?: Date) {
		if (date) {
			if (props.isDoublePick) {
				if (areSameDate(props.startDate, date)) {
					return 'start';
				} else if (areSameDate(props.endDate, date)) {
					return 'end';
				} else if (props.startDate && !props.endDate) {
					if (date < props.startDate) {
						return 'disabled';
					}
					if (props.hoverDate) {
						if (areSameDate(date, props.hoverDate) && date > props.startDate) {
							return 'end';
						}
						if (date > props.startDate && date < props.hoverDate) {
							return 'between';
						}
					}
				} else if (props.startDate && props.endDate) {
					if (date > props.startDate && date < props.endDate) {
						return 'between';
					}
				}
			} else {
				return areSameDate(date, props.startDate) ? 'chosen' : '';
			}
		} else {
			return 'empty';
		}
	}

	function handleCellClick(date?: Date) {
		if (date) {
			if (props.isDoublePick) {
				if (!props.startDate) {
					props.onDateClick(date);
				} else {
					if (isDateLater(props.hoverDate, props.startDate) || props.endDate) {
						props.onDateClick(date);
					}
				}
			} else {
				props.onDateClick(date);
			}
		}
	}

	function handleCellHover(date?: Date) {
		if (props.onDateHover) {
			props.onDateHover(date);
		}
	}

	return (
		<div className={clsx(s['calendar-display'])}>
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
						styleClass={getDateClass(date) ?? ''}
						isToday={areSameDate(date, new Date())}
						onClick={handleCellClick}
						onHover={handleCellHover}
					/>
				))}
			</div>
		</div>
	);
};

export default CalendarDisplay;
