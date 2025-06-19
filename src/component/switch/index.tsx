import { useCallback, useId } from 'react';
import clsx from 'clsx';
import s from './switch.module.scss';

interface SwitchProps {
	isUsed: boolean;
	onSwitch?: (checked: boolean) => void;
}

const Switch = (props: SwitchProps) => {
	const id = useId();
	const { isUsed, onSwitch } = props;

	const handleChange = useCallback(() => {
		onSwitch?.(!isUsed);
	}, [isUsed, onSwitch]);

	return (
		<label
			className={clsx(s.switch)}
			htmlFor={id}
			title='Активировать/Деактивировать уведомление'>
			<input type='checkbox' id={id} checked={isUsed} onChange={handleChange} />
			<span className={clsx(s.slider, s.round)}></span>
		</label>
	);
};

export default Switch;
