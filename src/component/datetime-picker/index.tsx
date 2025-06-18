import clsx from 'clsx';
import s from './datetime-picker.module.scss';
import '../../styles.css';
import calendar from '../../images/calendar.svg';
import { useEffect, useState } from 'react';
import ArrowButton from '../arrow-button';
import CalendarDisplay from '../calendar-display';

const DatetimePicker = () => {
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [leftDate, setLeftDate] = useState<Date>(new Date());
	const [rightDate, setRightDate] = useState<Date>(new Date());

	const [focused, setFocused] = useState(true);

	useEffect(() => {
		setStartDate(null);
		setEndDate(null);

		const current = new Date();
		current.setDate(1);
		setLeftDate(current);
		const next = new Date(current.getFullYear(), current.getMonth() + 1, 1);
		setRightDate(next);
	}, []);

	function getInputText() {
		if (!startDate && !endDate) {
			return focused ? '' : 'Период';
		} else if (!endDate) {
			return `${startDate}-`;
		} else {
			return `${startDate}-${endDate}`;
		}
	}

	function handleInputClick() {
		setFocused(!focused);
	}

	function handleInputKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Enter') {
			handleInputClick();
		}
	}

	function getDateMonthYear(date: Date) {
		const months = [
			'Январь',
			'Февраль',
			'Март',
			'Апрель',
			'Май',
			'Июнь',
			'Июль',
			'Август',
			'Сентябрь',
			'Октябрь',
			'Ноябрь',
			'Декабрь',
		];
		return `${months[date.getMonth()]} ${date.getFullYear()}`;
	}

	function leafMonths(isNext: boolean) {
		const sign = isNext ? 1 : -1;
		setLeftDate(
			new Date(leftDate.getFullYear(), leftDate.getMonth() + 1 * sign, 1)
		);
		setRightDate(
			new Date(rightDate.getFullYear(), rightDate.getMonth() + 1 * sign, 1)
		);
	}

	return (
		<div className={clsx(s['datetime-picker-container'])}>
			<div
				className={clsx(s['datetime-input'])}
				tabIndex={0}
				role='button'
				onClick={handleInputClick}
				onKeyDown={handleInputKeyDown}>
				<span className={clsx(s['input-text'])}>{getInputText()}</span>
				<img src={calendar} alt='calendar' />
			</div>
			{focused && (
				<div className={clsx(s['datetime-picker'])}>
					<div className={clsx(s['calendar'])}>
						<div className={clsx(s['calendar-header'], s['left'])}>
							<ArrowButton isRight={false} onClick={() => leafMonths(false)} />
							<span className={clsx(s['month-year'])}>
								{getDateMonthYear(leftDate)}
							</span>
						</div>
						<CalendarDisplay date={leftDate} isRight={false} />
					</div>
					<div className={clsx(s['calendar'])}>
						<div className={clsx(s['calendar-header'], s['right'])}>
							<span className={clsx(s['month-year'])}>
								{getDateMonthYear(rightDate)}
							</span>
							<ArrowButton isRight={true} onClick={() => leafMonths(true)} />
						</div>
						<CalendarDisplay date={rightDate} isRight={true} />
					</div>
				</div>
			)}
		</div>
	);
};

export default DatetimePicker;
