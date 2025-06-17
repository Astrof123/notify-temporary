import clsx from 'clsx';
import s from './form-input.module.scss';
import '../../styles.css';
import { useState } from 'react';
import Input from '../input';
import FormSectionTitle from '../form-section-title';

interface FormInputProps {
	name?: string;
	value?: string;
	label: string;
	type: string;
	placeholder?: string;
	minlength?: number;
	maxlength?: number;
	required: boolean;
}

const FormInput = (props: FormInputProps) => {
	const [value, setValue] = useState(props.value ? props.value : '');
	const [count, setCount] = useState(0);

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setCount(event.target.value.length);
		setValue(event.target.value);
	}

	return (
		<label className={clsx(s['input-wrapper'])}>
			<FormSectionTitle title={props.label} required={props.required} />
			<Input
				name={props.name}
				value={value}
				type={props.type}
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
		</label>
	);
};

export default FormInput;
