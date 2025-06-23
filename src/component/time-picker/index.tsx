import clsx from 'clsx';
import s from './time-picker.module.scss';
import '../../styles.css';
import { Time } from '../../models/notification-time/Time';
import { useEffect, useRef, useState } from 'react';
import CloseButton from '../close-button';
import clock from '../../images/clock.svg';
import TimeDisplay from '../time-display';

const TimePicker = () => {
	const timeInputRef = useRef<HTMLDivElement>(null);
	const timePickerRef = useRef<HTMLDivElement>(null);

	const [time, setTime] = useState<Time>(new Time(0, 0));
	const [focused, setFocused] = useState(false);

	function resetData() {
		setTime(new Time(0, 0));
		setFocused(false);
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				timeInputRef.current &&
				!timeInputRef.current.contains(event.target as Node) &&
				timePickerRef.current &&
				!timePickerRef.current.contains(event.target as Node)
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

	function toShowCloseButton() {
		return time && (time.hour !== 0 || time.minute !== 0);
	}

	function handleInputClick() {
		setFocused(!focused);
	}

	function handleInputKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Enter') {
			handleInputClick();
		}
	}

	return (
		<div className={clsx(s['time-picker-container'])}>
			<div
				className={clsx(s['time-input'])}
				tabIndex={0}
				role='button'
				onClick={handleInputClick}
				onKeyDown={handleInputKeyDown}
				ref={timeInputRef}>
				<span className={clsx(s['input-text'])}>{time.toString()}</span>
				<div className={clsx(s['left-box'])}>
					{toShowCloseButton() && <CloseButton onClick={resetData} />}
					<img src={clock} alt='clock' />
				</div>
			</div>
			{focused && (
				<div className={clsx(s['time-picker'])} ref={timePickerRef}>
					<TimeDisplay time={time} itemsToShow={7} onChange={setTime} />
				</div>
			)}
		</div>
	);
};

export default TimePicker;
