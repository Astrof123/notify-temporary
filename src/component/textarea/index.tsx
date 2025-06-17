import clsx from 'clsx';
import s from './textarea.module.scss';
import '../../styles.css';

interface TextareaProps {
	name?: string;
	value?: string;
	placeholder?: string;
	minlength?: number;
	maxlength?: number;
	onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const Textarea = (props: TextareaProps) => {
	return (
		<textarea
			className={clsx(s['textarea'])}
			name={props.name}
			value={props.value}
			placeholder={props.placeholder}
			minLength={props.minlength}
			maxLength={props.maxlength}
			onChange={props.onChange}
		/>
	);
};

export default Textarea;
