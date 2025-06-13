import clsx from 'clsx';
import s from './switch.module.scss';
import { useId } from 'react';

function Switch() {
	const id = useId();

	return (
		<label
			className={clsx(s.switch)}
			htmlFor={id}
			title='Активировать/Деактивировать уведомление'>
			<input type='checkbox' id={id} />
			<span className={clsx(s.slider, s.round)}></span>
		</label>
	);
}

export default Switch;
