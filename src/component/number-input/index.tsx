import clsx from 'clsx';
import s from './number-input.module.scss';
import '../../styles.css';
import { useEffect, useState } from 'react';
import InstrumentButton from '../instrument-button';

// small or large
type NumberInputSize = 's' | 'l';

interface NumberInputProps {
	size: NumberInputSize;
	minValue: number;
	maxValue: number;
	startValue?: number;
	step?: number;
	onChange?: (arg: number) => void;
}

const NumberInput = (props: NumberInputProps) => {
	const [value, setValue] = useState(props.startValue ?? props.minValue);
	const [displayValue, setDisplayValue] = useState(String(value));

	useEffect(() => {
		if (props.onChange) {
			console.log(displayValue, value);

			props.onChange(value);
		}
	}, [value]);

	function changeValue(newValue: number) {
		newValue = newValue < props.minValue ? props.minValue : newValue;
		newValue = newValue > props.maxValue ? props.maxValue : newValue;
		setValue(newValue);
		setDisplayValue(String(newValue));
	}

	function getInputMaxLength() {
		const mi = String(props.minValue).length;
		const ma = String(props.maxValue).length;
		return ma > mi ? ma : mi;
	}

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setDisplayValue(event.target.value);
	}

	function handleBlur(event: React.ChangeEvent<HTMLInputElement>) {
		const inputValue = event.target.value.trim();
		if (/^-?\d+$/.test(inputValue)) {
			changeValue(Number(inputValue));
		} else {
			setDisplayValue(String(value));
		}
	}

	function handleMinusClick() {
		changeValue(value - 1);
	}

	function handlePlusClick() {
		changeValue(value + 1);
	}

	return (
		<div className={clsx(s['number-input-container'])}>
			<InstrumentButton type={'minus'} onClick={handleMinusClick} />
			<input
				className={clsx(s['span'])}
				type='text'
				maxLength={getInputMaxLength()}
				value={displayValue}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<InstrumentButton type={'plus'} onClick={handlePlusClick} />
		</div>
	);
};

export default NumberInput;
