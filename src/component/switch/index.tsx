import clsx from 'clsx';
import s from './switch.module.scss';
import { useCallback, useId, useState } from 'react';

interface SwitchProps {
	isUsed: boolean;
	onSwitch?: () => void;
}

const Switch = ({ isUsed, onSwitch }: SwitchProps) => {
	const id = useId();
	const [checked, setChecked] = useState<boolean>(isUsed);

	const handleChange = useCallback(() => {
		setChecked(!checked);
		onSwitch?.();
	}, [checked, onSwitch]);

	return (
		<label
			className={clsx(s.switch)}
			htmlFor={id}
			title='Активировать/Деактивировать уведомление'>
			<input
				type='checkbox'
				id={id}
				checked={checked}
				onChange={handleChange}
			/>
			<span className={clsx(s.slider, s.round)}></span>
		</label>
	);
};

export default Switch;
