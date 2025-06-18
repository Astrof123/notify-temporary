import clsx from 'clsx';
import s from './periodicity-selector.module.scss';
import '../../styles.css';
import { Periodicity } from '../../models/notification-time/Periodicity';
import { useEffect, useState } from 'react';

interface PeriodicitySelectorProps {
	title: string;
	value: Periodicity;
	isFirst: boolean;
	current: Periodicity;
	onSelected: (arg: Periodicity) => void;
}

const PeriodicitySelector = (props: PeriodicitySelectorProps) => {
	const [checked, setChecked] = useState(props.isFirst);

	useEffect(() => {
		setChecked(props.current == props.value);
	}, [props.current]);

	function handleSelect() {
		props.onSelected(props.value);
	}

	return (
		<label className={clsx(s['periodicity-selector'])}>
			<input
				className={clsx(s['radio'])}
				type='radio'
				name='periodicity-selector'
				checked={checked}
				onChange={handleSelect}
			/>
			<div className={clsx(s['selector-box'])}>
				<span>{props.title}</span>
			</div>
		</label>
	);
};

export default PeriodicitySelector;
