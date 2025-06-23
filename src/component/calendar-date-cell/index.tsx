import clsx from 'clsx';
import s from './calendar-date-cell.module.scss';
import '../../styles.css';
import { useEffect, useState } from 'react';

interface CalendarDateCellProps {
	date?: Date;
	isToday: boolean;
	styleClass: string;
	onClick?: (arg?: Date) => void;
	onHover?: (arg?: Date) => void;
}

const CalendarDateCell = (props: CalendarDateCellProps) => {
	const [hover, setHover] = useState(false);

	useEffect(() => {
		if (props.onHover) {
			props.onHover(hover ? props.date : undefined);
		}
	}, [hover]);

	function handleClick() {
		if (props.onClick) {
			props.onClick(props.date);
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
				s[props.styleClass],
				props.isToday && s['today']
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
