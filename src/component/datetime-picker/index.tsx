import clsx from 'clsx';
import s from './datetime-picker.module.scss';
import '../../styles.css';
import { useState, useRef, useEffect } from 'react';
import { Time } from '../../models/notification-time/Time';
import CloseButton from '../close-button';
import calendar from '../../images/calendar.svg';
import ArrowButton from '../arrow-button';
import CalendarDisplay from '../calendar-display';
import TimeDisplay from '../time-display';
import { monthYearLabel } from '../../utils/funcs';

const DatetimePicker = () => {
	const datetimeInputRef = useRef<HTMLDivElement>(null);
	const datetimePickerRef = useRef<HTMLDivElement>(null);

	const [dateDisplay, setDateDisplay] = useState<Date>(new Date());
	const [date, setDate] = useState<Date>();
	const [time, setTime] = useState<Time>(new Time(0, 0));
	const [focused, setFocused] = useState(false);

	function resetData() {
		setDate(undefined);
		setTime(new Time(0, 0));
		const d = new Date();
		d.setDate(1);
		setDateDisplay(d);
		setFocused(false);
	}

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

	function isEmpty() {
		return !date && time.hour === 0 && time.minute === 0;
	}

	function formatDate(date?: Date) {
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

	function getInputText() {
		return isEmpty()
			? 'Дата и время'
			: `${formatDate(date)} ${time.toString()}`;
	}

	function leafMonths(isNext: boolean) {
		const sign = isNext ? 1 : -1;
		setDateDisplay(
			new Date(dateDisplay.getFullYear(), dateDisplay.getMonth() + 1 * sign, 1)
		);
	}

	function handleInputClick() {
		setFocused(!focused);
	}

	function handleInputKeyDown(event: React.KeyboardEvent) {
		if (event.code === 'Enter') {
			handleInputClick();
		}
	}

	function handleCellClick(date?: Date) {
		if (date) {
			setDate(date);
		}
	}

	return (
		<div className={clsx(s['datetime-picker-container'])}>
			<div
				className={clsx(s['datetime-input'], date && s['filled'])}
				tabIndex={0}
				role='button'
				onClick={handleInputClick}
				onKeyDown={handleInputKeyDown}
				ref={datetimeInputRef}>
				<span className={clsx(s['input-text'])}>{getInputText()}</span>
				<div className={clsx(s['left-box'])}>
					{date && <CloseButton onClick={resetData} />}
					<img src={calendar} alt='calendar' />
				</div>
			</div>
			{focused && (
				<div className={clsx(s['datetime-picker'])} ref={datetimePickerRef}>
					<div className={clsx(s['calendar-box'])}>
						<div className={clsx(s['calendar-header'])}>
							<ArrowButton isRight={false} onClick={() => leafMonths(false)} />
							<span className={clsx(s['month-year'])}>
								{monthYearLabel(dateDisplay)}
							</span>
							<ArrowButton isRight={true} onClick={() => leafMonths(true)} />
						</div>
						<CalendarDisplay
							date={dateDisplay}
							isDoublePick={false}
							startDate={date}
							onDateClick={handleCellClick}
						/>
					</div>
					<div className={clsx(s['time-display-box'])}>
						<TimeDisplay time={time} itemsToShow={5} onChange={setTime} />
					</div>
				</div>
			)}
		</div>
	);
};

export default DatetimePicker;
