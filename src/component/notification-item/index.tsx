import { useCallback } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import { Notification } from '../../types/notification';
import Switch from '../switch';
import { notificationList } from '../../utils/api/notification-list';
import pencil from '../../images/pencil.png';
import rubbish from '../../images/rubbish.png';
import s from './notification-item.module.scss';
import { useToast } from '../../hook/useToast';
import { MessageType } from '../../types/message-type';

interface NotificationItemProps {
	notification: Notification;
	onUpdateData: () => void;
}

const NotificationItem = (props: NotificationItemProps) => {
	const navigate = useNavigate();
	const { notify } = useToast();

	const handleDelete = useCallback(async () => {
		try {
			await notificationList.deleteItem(props.notification.id);
			props.onUpdateData();
		} catch (e: unknown) {
			let errorMessage = 'Ошибка при удалении уведомления.';
			if (e instanceof Error) {
				errorMessage = `Ошибка при удалении уведомления: ${e.message}`;
			}
			console.error(errorMessage, e);
			notify(errorMessage, MessageType.Error, 'Понятно');
		}
	}, [props.notification.id, props.onUpdateData]);

	const handleActivate = useCallback(
		async (checked: boolean) => {
			try {
				await notificationList.updateItem(props.notification.id, checked);
				props.onUpdateData();
			} catch (e: unknown) {
				let errorMessage = 'Ошибка при активации уведомления.';
				if (e instanceof Error) {
					errorMessage = `Ошибка при активации уведомления: ${e.message}`;
				}
				console.error(errorMessage, e);
				notify(errorMessage, MessageType.Error, 'Понятно');
			}
		},
		[props.notification.id, props.onUpdateData]
	);

	const handleEdit = useCallback(() => {
		navigate(`/change-notify?notificationId=${props.notification.id}`);
	}, [navigate, props.notification.id]);

	return (
		<>
			<tr className={clsx(s['notification-row'])}>
				<td>{props.notification.name}</td>
				<td>{props.notification.type}</td>
				<td>{props.notification.period}</td>
				{props.notification.isActive ? (
					<td className={clsx(s.active)}>Используется</td>
				) : (
					<td className={clsx(s.inactive)}>Не используется</td>
				)}
				<td>
					<div className={clsx(s['notification__functions'])}>
						<Switch
							isUsed={props.notification.isActive}
							onSwitch={handleActivate}
						/>
						<button className={clsx('button_empty')} onClick={handleEdit}>
							<img
								className={clsx(s.edit)}
								src={pencil}
								alt='Редактировать'
								title='Редактировать'
							/>
						</button>
						<button className={clsx('button_empty')} onClick={handleDelete}>
							<img
								className={clsx(s.remove)}
								src={rubbish}
								alt='Удалить'
								title='Удалить'
							/>
						</button>
					</div>
				</td>
			</tr>
		</>
	);
};

export default NotificationItem;
