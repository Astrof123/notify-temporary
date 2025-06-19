import clsx from 'clsx';
import s from './datetime-picker.module.scss';
import '../../styles.css';
import calendar from '../../images/calendar.svg';
import { useEffect, useRef, useState } from 'react';
import ArrowButton from '../arrow-button';
import CalendarDisplay from '../calendar-display';
import CloseButton from '../close-button';

const DatetimePicker = () => {
	const datetimeInputRef = useRef<HTMLDivElement>(null);
	const datetimePickerRef = useRef<HTMLDivElement>(null);

	const [startDate, setStartDate] = useState<Date>();
	const [hoverDate, setHoverDate] = useState<Date>();
	const [endDate, setEndDate] = useState<Date>();
	const [leftDate, setLeftDate] = useState<Date>(new Date());
	const [rightDate, setRightDate] = useState<Date>(new Date());

	const [focused, setFocused] = useState(false);

	function setDisplayDates(newleft: Date) {
		const copy = new Date(newleft);
		copy.setDate(1);
		setLeftDate(copy);
		const next = new Date(copy.getFullYear(), copy.getMonth() + 1, 1);
		setRightDate(next);
	}

	function resetData() {
		setStartDate(undefined);
		setHoverDate(undefined);
		setEndDate(undefined);
		setFocused(false);

		setDisplayDates(new Date());
	}

	useEffect(() => {
		if (startDate) {
			setDisplayDates(startDate);
		}
	}, [focused]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				datetimeInputRef.current &&
				!datetimeInputRef.current.contains(event.target as Node) &&
				datetimePickerRef.current &&
				!datetimePickerRef.current.contains(event.target as Node)
			) {
				setFocused(false);
			}
		};

		resetData();
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	function formatDate(date: Date) {
		let d = String(date.getDate());
		let m = String(date.getMonth() + 1);
		d = d.length < 2 ? `0${d}` : d;
		m = m.length < 2 ? `0${m}` : m;
		return `${d}.${m}.${date.getFullYear()}`;
	}

	function getInputText() {
		if (!startDate && !endDate) {
			return focused ? '' : 'Период';
		} else if (!endDate) {
			return `${formatDate(startDate!)} -`;
		} else {
			return `${formatDate(startDate!)} - ${formatDate(endDate!)}`;
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

	function handleDateClick(date: Date) {
		if (!startDate) {
			setStartDate(date);
		} else if (!endDate && hoverDate) {
			setEndDate(date);
			setHoverDate(undefined);
			setFocused(false);
		} else {
			setStartDate(date);
			setEndDate(undefined);
		}
	}

	function handleDateHover(date?: Date) {
		setHoverDate(date);
	}

	return (
		<div className={clsx(s['datetime-picker-container'])}>
			<div
				className={clsx(
					s['datetime-input'],
					(startDate || endDate) && s['filled']
				)}
				tabIndex={0}
				role='button'
				onClick={handleInputClick}
				onKeyDown={handleInputKeyDown}
				ref={datetimeInputRef}>
				<span className={clsx(s['input-text'])}>{getInputText()}</span>
				<div className={clsx(s['left-box'])}>
					{(startDate || endDate) && <CloseButton onClick={resetData} />}
					<img src={calendar} alt='calendar' />
				</div>
			</div>
			{focused && (
				<div className={clsx(s['datetime-picker'])} ref={datetimePickerRef}>
					<div className={clsx(s['calendar'])}>
						<div className={clsx(s['calendar-header'], s['left'])}>
							<ArrowButton isRight={false} onClick={() => leafMonths(false)} />
							<span className={clsx(s['month-year'])}>
								{getDateMonthYear(leftDate)}
							</span>
						</div>
						<CalendarDisplay
							date={leftDate}
							isRight={false}
							startDate={startDate}
							hoverDate={hoverDate}
							endDate={endDate}
							onDateClick={handleDateClick}
							onDateHover={handleDateHover}
						/>
					</div>
					<div className={clsx(s['calendar'])}>
						<div className={clsx(s['calendar-header'], s['right'])}>
							<span className={clsx(s['month-year'])}>
								{getDateMonthYear(rightDate)}
							</span>
							<ArrowButton isRight={true} onClick={() => leafMonths(true)} />
						</div>
						<CalendarDisplay
							date={rightDate}
							isRight={true}
							startDate={startDate}
							hoverDate={hoverDate}
							endDate={endDate}
							onDateClick={handleDateClick}
							onDateHover={handleDateHover}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default DatetimePicker;
