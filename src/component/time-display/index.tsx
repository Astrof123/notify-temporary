import clsx from 'clsx';
import s from './time-display.module.scss';
import '../../styles.css';
import { useEffect, useState } from 'react';
import { Time } from '../../models/notification-time/Time';

interface TimeDisplayProps {
	time: Time;
	itemsToShow: number;
	onChange?: (arg: Time) => void;
}

const TimeDisplay = (props: TimeDisplayProps) => {
	const [hours, setHours] = useState<number[]>([]);
	const [minutes, setMinutes] = useState<number[]>([]);

	useEffect(() => {
		const h = [];
		for (let i = 0; i < 24; i++) {
			h.push(i);
		}
		const m = [];
		for (let i = 0; i < 60; i++) {
			m.push(i);
		}
		setHours(h);
		setMinutes(m);
	}, []);

	function formatTime(value: number) {
		const v = String(value);
		return v.length < 2 ? `0${v}` : v;
	}

	function handleHourClick(value: number) {
		if (props.onChange) {
			props.onChange(new Time(value, props.time.minute));
		}
	}

	function handleHourKeyDown(event: React.KeyboardEvent, value: number) {
		if (event.code === 'Enter') {
			handleHourClick(value);
		}
	}

	function handleMinuteClick(value: number) {
		if (props.onChange) {
			props.onChange(new Time(props.time.hour, value));
		}
	}

	function handleMinuteKeyDown(event: React.KeyboardEvent, value: number) {
		if (event.code === 'Enter') {
			handleMinuteClick(value);
		}
	}

	function getSliderStyle() {
		return {
			'--item-count': props.itemsToShow,
		} as React.CSSProperties;
	}

	return (
		<div className={clsx(s['time-display'])}>
			<div className={clsx(s['column'])}>
				<span className={clsx(s['title'])}>ч</span>
				<div className={clsx(s['time-slider'])} style={getSliderStyle()}>
					{hours.map((h, index) => (
						<div
							key={index}
							className={clsx(
								s['slider-item'],
								h == props.time.hour && s['current']
							)}
							role='button'
							tabIndex={0}
							onClick={() => handleHourClick(h)}
							onKeyDown={(event) => handleHourKeyDown(event, h)}>
							{formatTime(h)}
						</div>
					))}
				</div>
			</div>
			<div className={clsx(s['column'])}>
				<span className={clsx(s['colon'])}>:</span>
			</div>
			<div className={clsx(s['column'])}>
				<span className={clsx(s['title'])}>мин</span>
				<div className={clsx(s['time-slider'])} style={getSliderStyle()}>
					{minutes.map((m, index) => (
						<div
							key={index}
							className={clsx(
								s['slider-item'],
								m == props.time.minute && s['current']
							)}
							role='button'
							tabIndex={0}
							onClick={() => handleMinuteClick(m)}
							onKeyDown={(event) => handleMinuteKeyDown(event, m)}>
							{formatTime(m)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TimeDisplay;
