import clsx from 'clsx';
import s from './days-of-quarter-choice.module.scss';
import '../../styles.css';
import NumberInput from '../number-input';
import { useEffect, useState } from 'react';

interface DaysOfQuarterChoiceProps {
	onChange?: (arg: number[]) => void;
}

const DaysOfQuarterChoice = (props: DaysOfQuarterChoiceProps) => {
	const [dayOfFirst, setDayOfFirst] = useState(1);
	const [dayOfSecond, setDayOfSecond] = useState(1);
	const [dayOfThird, setDayOfThird] = useState(1);

	useEffect(() => {
		if (props.onChange) {
			props.onChange([dayOfFirst, dayOfSecond, dayOfThird]);
		}
	}, [dayOfFirst, dayOfSecond, dayOfThird]);

	return (
		<div className={clsx(s['days-of-quarter-choice-container'])}>
			<NumberInput
				size='l'
				minValue={1}
				maxValue={31}
				onChange={setDayOfFirst}
			/>
			<NumberInput
				size='l'
				minValue={1}
				maxValue={31}
				onChange={setDayOfSecond}
			/>
			<NumberInput
				size='l'
				minValue={1}
				maxValue={31}
				onChange={setDayOfThird}
			/>
		</div>
	);
};

export default DaysOfQuarterChoice;
