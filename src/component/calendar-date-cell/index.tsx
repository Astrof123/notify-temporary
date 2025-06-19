import clsx from 'clsx';
import s from './calendar-date-cell.module.scss';
import '../../styles.css';
import { useEffect, useState } from 'react';

interface CalendarDateCellProps {
	date?: Date;
	startDate?: Date;
	hoverDate?: Date;
	endDate?: Date;
	onClick?: (arg: Date) => void;
	onHover?: (arg?: Date) => void;
}

const CalendarDateCell = (props: CalendarDateCellProps) => {
	const [hover, setHover] = useState(false);

	useEffect(() => {
		if (!props.endDate && props.date && props.onHover && props.startDate) {
			props.onHover(hover ? props.date : undefined);
		}
	}, [hover]);

	function areEqual(date1?: Date, date2?: Date) {
		return date1?.setHours(0, 0, 0, 0) == date2?.setHours(0, 0, 0, 0);
	}

	// date1 later than date2
	function isLater(date1?: Date, date2?: Date) {
		return date1 && date2 ? date1 > date2 : false;
	}

	function getDateClass() {
		if (props.date) {
			if (areEqual(props.startDate, props.date)) {
				return 'start';
			} else if (areEqual(props.endDate, props.date)) {
				return 'end';
			} else if (props.startDate && !props.endDate) {
				if (props.date < props.startDate) {
					return 'disabled';
				}
				if (props.hoverDate) {
					if (
						areEqual(props.date, props.hoverDate) &&
						props.date > props.startDate
					) {
						return 'end';
					}
					if (props.date > props.startDate && props.date < props.hoverDate) {
						return 'between';
					}
				}
			} else if (props.startDate && props.endDate) {
				if (props.date > props.startDate && props.date < props.endDate) {
					return 'between';
				}
			}
		}
	}

	function handleClick() {
		if (props.onClick && props.date) {
			if (!props.startDate) {
				props.onClick(props.date);
			} else {
				if (isLater(props.hoverDate, props.startDate) || props.endDate) {
					props.onClick(props.date);
				}
			}
		}
	}

	function handleMouseEnter() {
		setHover(true);
	}

	function handleMouseLeave() {
		setHover(false);
	}

	return (
		<div
			className={clsx(
				s['date-cell'],
				!props.date && s['empty'],
				s[getDateClass() ?? '']
			)}>
			<div
				className={clsx(s['date'])}
				tabIndex={-1}
				onClick={handleClick}
				onKeyDown={undefined}
				onMouseOver={handleMouseEnter}
				onMouseOut={handleMouseLeave}
				onFocus={handleMouseEnter}
				onBlur={handleMouseLeave}>
				{props.date?.getDate()}
			</div>
		</div>
	);
};

export default CalendarDateCell;
