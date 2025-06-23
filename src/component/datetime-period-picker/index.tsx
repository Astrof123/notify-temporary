import clsx from 'clsx';
import s from './datetime-period-picker.module.scss';
import '../../styles.css';
import calendar from '../../images/calendar.svg';
import { useEffect, useRef, useState } from 'react';
import ArrowButton from '../arrow-button';
import CalendarDisplay from '../calendar-display';
import CloseButton from '../close-button';
import TimeDisplay from '../time-display';
import { Time } from '../../models/notification-time/Time';
import { formatDate, monthYearLabel } from '../../utils/funcs';

const DatetimePeriodPicker = () => {
	const datetimeInputRef = useRef<HTMLDivElement>(null);
	const datetimePickerRef = useRef<HTMLDivElement>(null);

	const [startDate, setStartDate] = useState<Date>();
	const [hoverDate, setHoverDate] = useState<Date>();
	const [endDate, setEndDate] = useState<Date>();
	const [leftDate, setLeftDate] = useState<Date>(new Date());
	const [rightDate, setRightDate] = useState<Date>(new Date());
	const [startTime, setStartTime] = useState<Time>(new Time(0, 0));
	const [endTime, setEndTime] = useState<Time>(new Time(0, 0));

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
		setStartTime(new Time(0, 0));
		setEndTime(new Time(0, 0));
	}

	useEffect(() => {
		setDisplayDates(startDate ? startDate : new Date());
		console.log(startDate, endDate);
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

	function getInputText() {
		if (!focused && !startDate && !endDate) {
			return 'Период';
		} else {
			return `${formatDate(startDate)} ${startTime.toString()} - ${formatDate(
				endDate
			)} ${endTime.toString()}`;
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
		} else {
			setStartDate(date);
			setEndDate(undefined);
		}
	}

	function handleDateHover(date?: Date) {
		setHoverDate(date);
	}

	return (
		<div className={clsx(s['datetime-period-picker-container'])}>
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
				<div
					className={clsx(s['datetime-period-picker'])}
					ref={datetimePickerRef}>
					<div className={clsx(s['calendars-box'])}>
						<div className={clsx(s['calendar'])}>
							<div className={clsx(s['calendar-header'], s['left'])}>
								<ArrowButton
									isRight={false}
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
								<ArrowButton isRight={true} onClick={() => leafMonths(true)} />
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
					<div className={clsx(s['time-displays-box'])}>
						<div className={clsx(s['time-display-wrapper'])}>
							<TimeDisplay
								time={startTime}
								itemsToShow={3}
								onChange={setStartTime}
							/>
						</div>
						<div className={clsx(s['time-display-wrapper'])}>
							<TimeDisplay
								time={endTime}
								itemsToShow={3}
								onChange={setEndTime}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default DatetimePeriodPicker;
