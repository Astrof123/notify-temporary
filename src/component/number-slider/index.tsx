import clsx from 'clsx';
import s from './number-slider.module.scss';
import '../../styles.css';
import { useState } from 'react';

interface NumberSliderProps {
	fillWidth: boolean;
	width?: number;
	minValue: number;
	maxValue: number;
}

const NumberSlider = (props: NumberSliderProps) => {
	const [value, setValue] = useState((props.maxValue - props.minValue) / 2);

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setValue(Number(event.target.value));
	}

	return (
		<div className={clsx(s['slider-container'])}>
			<input
				className={clsx(s['slider'])}
				type='range'
				min={props.minValue}
				max={props.maxValue}
				value={value}
				onChange={handleChange}
			/>
		</div>
	);
};

export default NumberSlider;
