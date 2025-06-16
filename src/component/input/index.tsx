import clsx from 'clsx';
import s from './input.module.scss';
import '../../styles.css';

interface InputProps {
	name?: string;
	value?: string;
	type: string;
	placeholder?: string;
	minlength?: number;
	maxlength?: number;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = (props: InputProps) => {
	return (
		<input
			className={clsx(s['input'])}
			name={props.name}
			value={props.value}
			type={props.type}
			placeholder={props.placeholder}
			minLength={props.minlength}
			maxLength={props.maxlength}
			onChange={props.onChange}
		/>
	);
};

export default Input;
