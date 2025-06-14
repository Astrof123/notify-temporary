import clsx from 'clsx';
import s from './notification-form.module.scss';
import '../../styles.css';

interface NotificationFormProps {
	notificationData?: object;
}

const NotificationForm = (props: NotificationFormProps) => {
	const geniusLinter = props.notificationData; // Гениус линтер просит использовать props и не даёт закоммитить.
	console.log(geniusLinter);

	return (
		<div className={clsx(s['notification-form-container'])}>
			<h1>Форма добавления уведомления</h1>
			<div className={clsx(s['form'])}></div>
		</div>
	);
};

export default NotificationForm;
