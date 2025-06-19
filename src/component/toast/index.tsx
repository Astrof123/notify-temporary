import clsx from 'clsx';
import s from './toast.module.scss';
import { MessageType } from '../../types/message-type';

interface ToastProps {
	closeToast?: () => void;
	messageType: MessageType;
	message: string;
	buttonText: string;
}

const Toast = (props: ToastProps) => {
	return (
		<div
			className={clsx(
				s['modal-content'],
				props.messageType == MessageType.Success
					? s['modal-content_success']
					: s['modal-content_error']
			)}>
			<p>{props.message}</p>
			<button
				className={clsx(
					s['modal-button'],
					'button_empty',
					props.messageType == MessageType.Success
						? s['modal-button_success']
						: s['modal-button_error']
				)}
				type='button'
				onClick={() => props.closeToast?.()}>
				{props.buttonText}
			</button>
		</div>
	);
};

export default Toast;
