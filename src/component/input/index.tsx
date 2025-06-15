import clsx from 'clsx';
import s from './input.module.scss';
import '../../styles.css';
import { useState } from 'react';

interface InputProps {
	name?: string;
	value?: string;
	label: string;
	type: string;
	placeholder?: string;
	minlength?: number;
	maxlength?: number;
	required: boolean;
}

const Input = (props: InputProps) => {
	const [value, setValue] = useState(props.value ? props.value : '');
	const [count, setCount] = useState(0);

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setCount(event.target.value.length);
		setValue(event.target.value);
	}

	return (
		<label className={clsx(s['input-wrapper'])}>
			<div className={clsx(s['input-label'])}>
				<span>{props.label}</span>
				<div className={clsx(s['required'])}>{props.required ? '*' : ''}</div>
			</div>
			<input
				name={props.name}
				value={value}
				type={props.type}
				placeholder={props.placeholder}
				minLength={props.minlength}
				maxLength={props.maxlength}
				onChange={handleChange}
			/>
			{props.maxlength && (
				<div className={clsx(s['counter-wrapper'])}>
					{count}/{props.maxlength}
				</div>
			)}
		</label>
	);
};

export default Input;
