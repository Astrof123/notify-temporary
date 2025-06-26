import clsx from 'clsx';
import s from './date-picker.module.scss';
import '../../styles.css';
import { useState, useRef, useEffect } from 'react';
import CloseButton from '../close-button';
import calendar from '../../images/calendar.svg';
import InstrumentButton from '../instrument-button';
import CalendarDisplay from '../calendar-display';
import { monthYearLabel } from '../../utils/funcs';

const DatePicker = () => {
	const dateInputRef = useRef<HTMLDivElement>(null);
	const datePickerRef = useRef<HTMLDivElement>(null);

	const [dateDisplay, setDateDisplay] = useState<Date>(new Date());
	const [date, setDate] = useState<Date>();
	const [focused, setFocused] = useState(false);

	function resetData() {
		setDate(undefined);
		const d = new Date();
		d.setDate(1);
		setDateDisplay(d);
		setFocused(false);
	}

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
		return !date ? 'Дата' : formatDate(date);
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
		<div className={clsx(s['date-picker-container'])}>
			<div
				className={clsx(s['date-input'], date && s['filled'])}
				tabIndex={0}
				role='button'
				onClick={handleInputClick}
				onKeyDown={handleInputKeyDown}
				ref={dateInputRef}>
				<span className={clsx(s['input-text'])}>{getInputText()}</span>
				<div className={clsx(s['left-box'])}>
					{date && <CloseButton onClick={resetData} />}
					<img src={calendar} alt='calendar' />
				</div>
			</div>
			{focused && (
				<div className={clsx(s['date-picker'])} ref={datePickerRef}>
					<div className={clsx(s['calendar-box'])}>
						<div className={clsx(s['calendar-header'])}>
							<InstrumentButton
								type={'left-arrow'}
								onClick={() => leafMonths(false)}
							/>
							<span className={clsx(s['month-year'])}>
								{monthYearLabel(dateDisplay)}
							</span>
							<InstrumentButton
								type={'right-arrow'}
								onClick={() => leafMonths(true)}
							/>
						</div>
						<CalendarDisplay
							date={dateDisplay}
							isDoublePick={false}
							startDate={date}
							onDateClick={handleCellClick}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default DatePicker;
