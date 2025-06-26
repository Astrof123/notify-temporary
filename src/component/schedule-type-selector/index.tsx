import clsx from 'clsx';
import s from './schedule-type-selector.module.scss';
import '../../styles.css';
import { EScheduleType } from '../../models/notification-time/EScheduleType';
import { useEffect, useState } from 'react';

interface ScheduleTypeSelectorProps {
	title: string;
	value: EScheduleType;
	isFirst: boolean;
	current: EScheduleType;
	onSelected: (arg: EScheduleType) => void;
}

const ScheduleTypeSelector = (props: ScheduleTypeSelectorProps) => {
	const [checked, setChecked] = useState(props.isFirst);

	useEffect(() => {
		setChecked(props.current == props.value);
	}, [props.current]);

	function handleSelect() {
		props.onSelected(props.value);
	}

	return (
		<label className={clsx(s['schedule-type-selector'])}>
			<input
				className={clsx(s['radio'])}
				type='radio'
				name='schedule-type-selector'
				checked={checked}
				onChange={handleSelect}
			/>
			<div className={clsx(s['selector-box'])}>
				<span className={clsx(s['label'])}>{props.title}</span>
			</div>
		</label>
	);
};

export default ScheduleTypeSelector;
