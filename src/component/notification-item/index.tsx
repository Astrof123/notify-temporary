import { useCallback, useState } from 'react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

import { Notification } from '../../types/notification';
import Switch from '../switch';
import { notificationList } from '../../utils/api/notification-list';
import pencil from '../../images/pencil.png';
import rubbish from '../../images/rubbish.png';
import s from './notification-item.module.scss';

interface NotificationItemProps {
	notification: Notification;
	onUpdateData: () => void;
}

const NotificationItem = ({
	notification,
	onUpdateData,
}: NotificationItemProps) => {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);

	const handleDelete = useCallback(async () => {
		setError(null);
		try {
			await notificationList.deleteItem(notification.id);
			onUpdateData();
		} catch (e: unknown) {
			let errorMessage = 'Ошибка при удалении уведомления.';
			if (e instanceof Error) {
				errorMessage = `Ошибка при удалении уведомления: ${e.message}`;
			}
			console.error(errorMessage, e);
			setError(errorMessage);
		}
	}, [notification.id, onUpdateData]);

	const handleActivate = useCallback(
		async (checked: boolean) => {
			setError(null);

			try {
				await notificationList.updateItem(notification.id, checked);
				onUpdateData();
			} catch (e: unknown) {
				let errorMessage = 'Ошибка при активации уведомления.';
				if (e instanceof Error) {
					errorMessage = `Ошибка при активации уведомления: ${e.message}`;
				}
				console.error(errorMessage, e);
				setError(errorMessage);
			}
		},
		[notification.id, onUpdateData]
	);

	const handleEdit = useCallback(() => {
		navigate(`/change-notify?notificationId=${notification.id}`);
	}, [navigate, notification.id]);

	return (
		<tr className={clsx(s['notification-row'])}>
			<td>{notification.name}</td>
			<td>{notification.type}</td>
			<td>{notification.period}</td>
			{notification.isActive ? (
				<td className={clsx(s.active)}>Используется</td>
			) : (
				<td className={clsx(s.inactive)}>Не используется</td>
			)}
			<td>
				<div className={clsx(s['notification__functions'])}>
					<Switch isUsed={notification.isActive} onSwitch={handleActivate} />
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

			{error && (
				<td>
					<p
						className={clsx(
							'error-text',
							'error-text_small',
							s['error-text_table']
						)}>
						{error}
					</p>
				</td>
			)}
		</tr>
	);
};

export default NotificationItem;
