import clsx from 'clsx';
import s from './notification-form.module.scss';
import '../../styles.css';
import TargetsChoiceTree from '../targets-choice-tree';
import FormInput from '../form-input';
import FormTextarea from '../form-textarea';

interface NotificationFormProps {
	notificationData?: object;
}

const NotificationForm = (props: NotificationFormProps) => {
	console.log(props);

	return (
		<div className={clsx(s['notification-form-container'])}>
			<h1>Форма добавления уведомления</h1>
			<div className={clsx(s['form'])}>
				<div className={clsx(s['row'])}>
					<div>
						<FormInput
							name={'title'}
							label={'Заголовок уведомдения'}
							type={'text'}
							placeholder={'Заголовок уведомдения'}
							maxlength={50}
							required={true}
						/>
					</div>
					<div>
						<FormTextarea
							name={'description'}
							label={'Описание уведомления'}
							placeholder={'Введите описание'}
							maxlength={250}
							required={true}
						/>
					</div>
				</div>
				<div className={clsx(s['row'])}>
					<TargetsChoiceTree />
				</div>
			</div>
		</div>
	);
};

export default NotificationForm;
