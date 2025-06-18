import clsx from 'clsx';
import s from './form-textarea.module.scss';
import '../../styles.css';
import { useState } from 'react';
import Textarea from '../textarea';
import FormSectionTitle from '../form-section-title';

interface FormTextareaProps {
	name?: string;
	value?: string;
	label: string;
	placeholder?: string;
	minlength?: number;
	maxlength?: number;
	required: boolean;
}

const FormTextarea = (props: FormTextareaProps) => {
	const [value, setValue] = useState(props.value ? props.value : '');
	const [count, setCount] = useState(0);

	function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
		const newValue = event.target.value.replace('\n', '');
		setValue(newValue);
		setCount(newValue.length);
	}

	return (
		<div className={clsx(s['textarea-wrapper'])}>
			<FormSectionTitle title={props.label} required={props.required} />
			<Textarea
				name={props.name}
				value={value}
				placeholder={props.placeholder}
				minlength={props.minlength}
				maxlength={props.maxlength}
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

export default FormTextarea;
