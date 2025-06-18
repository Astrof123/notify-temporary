import clsx from 'clsx';
import s from './number-slider.module.scss';
import '../../styles.css';
import { useEffect, useState } from 'react';

interface NumberSliderProps {
	fillWidth: boolean;
	width?: number;
	startValue: number;
	minValue: number;
	maxValue: number;
	step?: number;
	onChange?: (arg: number) => void;
}

const NumberSlider = (props: NumberSliderProps) => {
	const [value, setValue] = useState(props.startValue);
	const [thumbOffset, setThumbOffset] = useState(300);

	useEffect(() => {
		const range = props.maxValue - props.minValue;
    	const percentage = ((value - props.minValue) / range) * 100;
		setThumbOffset(percentage);
		if (props.onChange) {
			props.onChange(value);
		}
	}, [value, props.minValue, props.maxValue]);

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setValue(Number(event.target.value));
	}

	return (
		<div className={clsx(s['number-slider-container'])}>
			<div>{props.minValue}</div>
			<div
				className={clsx(s['slider-wrapper'])}
				style={{width: (!props.fillWidth ? `${props.width}px` : `100%`)}}
			>
				<input
					className={clsx(s['slider'])}
					type='range'
					value={value}
					min={props.minValue}
					max={props.maxValue}
					step={props.step || 1}
					onChange={handleChange}
				/>
				<span
					className={clsx(s['value'])}
					style={{
						left: `${thumbOffset}%`
					}}
				>{value}</span>
			</div>
			<div>{props.maxValue}</div>
		</div>
	);
};

export default NumberSlider;
