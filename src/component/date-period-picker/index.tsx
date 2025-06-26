import clsx from 'clsx';
import s from './date-period-picker.module.scss';
import '../../styles.css';
import calendar from '../../images/calendar.svg';
import { useEffect, useRef, useState } from 'react';
import InstrumentButton from '../instrument-button';
import CalendarDisplay from '../calendar-display';
import CloseButton from '../close-button';
import { formatDate, monthYearLabel } from '../../utils/funcs';

const DatePeriodPicker = () => {
	const dateInputRef = useRef<HTMLDivElement>(null);
	const datePickerRef = useRef<HTMLDivElement>(null);

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
	}

	useEffect(() => {
		setDisplayDates(startDate ? startDate : new Date());
	}, [focused]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dateInputRef.current &&
				!dateInputRef.current.contains(event.target as Node) &&
				datePickerRef.current &&
				!datePickerRef.current.contains(event.target as Node)
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

	function getInputText() {
		if (!startDate && !endDate) {
			return focused ? '' : 'Период';
		} else if (startDate && !endDate) {
			return `${formatDate(startDate)} -`;
		} else {
			return `${formatDate(startDate)} - ${formatDate(endDate)}`;
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
		<div className={clsx(s['date-period-picker-container'])}>
			<div
				className={clsx(s['date-input'], (startDate || endDate) && s['filled'])}
				tabIndex={0}
				role='button'
				onClick={handleInputClick}
				onKeyDown={handleInputKeyDown}
				ref={dateInputRef}>
				<span className={clsx(s['input-text'])}>{getInputText()}</span>
				<div className={clsx(s['left-box'])}>
					{(startDate || endDate) && <CloseButton onClick={resetData} />}
					<img src={calendar} alt='calendar' />
				</div>
			</div>
			{focused && (
				<div className={clsx(s['date-period-picker'])} ref={datePickerRef}>
					<div className={clsx(s['calendars-box'])}>
						<div className={clsx(s['calendar'])}>
							<div className={clsx(s['calendar-header'], s['left'])}>
								<InstrumentButton
									type={'left-arrow'}
									onClick={() => leafMonths(false)}
								/>
								<span className={clsx(s['month-year'])}>
									{monthYearLabel(leftDate)}
								</span>
							</div>
							<CalendarDisplay
								date={leftDate}
								isDoublePick={true}
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
									{monthYearLabel(rightDate)}
								</span>
								<InstrumentButton
									type={'right-arrow'}
									onClick={() => leafMonths(true)}
								/>
							</div>
							<CalendarDisplay
								date={rightDate}
								isDoublePick={true}
								startDate={startDate}
								hoverDate={hoverDate}
								endDate={endDate}
								onDateClick={handleDateClick}
								onDateHover={handleDateHover}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DatePeriodPicker;
