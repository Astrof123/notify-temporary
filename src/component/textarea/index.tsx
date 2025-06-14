import clsx from 'clsx';
import s from './textarea.module.scss';
import '../../styles.css';
import { useState } from 'react';

interface TextareaProps {
	name?: string;
	value?: string;
	label: string;
	placeholder?: string;
	minlength?: number;
	maxlength?: number;
	required: boolean;
}

const Textarea = (props: TextareaProps) => {
	const [value, setValue] = useState(props.value ? props.value : '');
	const [count, setCount] = useState(0);

	function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		const newValue = event.target.value.replace('\n', '');
		setValue(newValue);
		setCount(newValue.length);
	}

	return (
		<div className={clsx(s['textarea-wrapper'])}>
			<div className={clsx(s['textarea-label'])}>
				<span>{props.label}</span>
				<div className={clsx(s['required'])}>{props.required ? '*' : ''}</div>
			</div>
			<textarea
				name={props.name}
				value={value}
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
		</div>
	);
};

export default Textarea;
