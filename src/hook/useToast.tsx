import { toast } from 'react-toastify';
import { MessageType } from '../types/message-type';
import clsx from 'clsx';
import Toast from '../component/toast';

export const useToast = () => {
	const notify = (
		message: string,
		messageType: MessageType,
		buttonText: string
	) => {
		toast(
			<Toast
				message={message}
				messageType={messageType}
				buttonText={buttonText}
			/>,
			{
				position: 'bottom-right',
				className: clsx('toast'),
			}
		);
	};

	return { notify };
};
