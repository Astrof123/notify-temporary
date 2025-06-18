import clsx from 'clsx';
import s from './form-section-title.module.scss';
import '../../styles.css';
import RequiredFormSymbol from '../required-form-symbol';

interface FormSectionTitleProps {
	title: string;
	required?: boolean;
}

const FormSectionTitle = (props: FormSectionTitleProps) => {
	return (
		<div className={clsx(s['title'])}>
			<span>{props.title}</span>
			{props.required && <RequiredFormSymbol />}
		</div>
	);
};

export default FormSectionTitle;
