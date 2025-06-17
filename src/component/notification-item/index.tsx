import { Notification } from '../../types/notification';
import Switch from '../switch';
import pencil from '../../images/pencil.png';
import rubbish from '../../images/rubbish.png';
import clsx from 'clsx';
import s from './notification-item.module.scss';
import { notificationList } from '../../utils/api/notification-list';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

interface NotificationItemProps {
	notification: Notification;
	onUpdateData: () => void;
}

const NotificationItem = ({
	notification,
	onUpdateData,
}: NotificationItemProps) => {
	const navigate = useNavigate();
	const [deleting, setDeleting] = useState<boolean>(false);
	const [activating, setActivating] = useState<boolean>(false);

	const fetchDelete = useCallback(async () => {
		try {
			await notificationList.deleteItem(notification.id);
			onUpdateData();
		} catch (error) {
			console.log(error);
		}
	}, []);

	const fetchActivate = useCallback(async () => {
		try {
			await notificationList.activateItem(notification.id);
		} catch (error) {
			console.log(error);
		}
	}, []);

	const handleRemove = async () => {
		setDeleting(true);
	};

	const handleEdit = () => {
		navigate(`/change-notify?notificationId=${notification.id}`);
	};

	const handleSwitch = useCallback(() => {
		setActivating(true);
	}, []);

	useEffect(() => {
		if (deleting) {
			fetchDelete();
			setDeleting(false);
		}
	}, [deleting, fetchDelete]);

	useEffect(() => {
		if (activating) {
			fetchActivate();
			setActivating(false);
		}
	}, [activating, fetchActivate]);

	return (
		<tr className={clsx(s['notification-row'])}>
			<td>{notification.name}</td>
			<td>{notification.type}</td>
			<td>{notification.period}</td>
			{notification.isActive ? (
				<td className={clsx(s.used)}>Используется</td>
			) : (
				<td className={clsx(s['not-used'])}>Не используется</td>
			)}
			<td>
				<div className={clsx(s['notification__functions'])}>
					<Switch isUsed={notification.isActive} onSwitch={handleSwitch} />
					<button className={clsx('button_empty')} onClick={handleEdit}>
						<img
							className={clsx(s.edit)}
							src={pencil}
							alt='Редактировать'
							title='Редактировать'
						/>
					</button>
					<button className={clsx('button_empty')} onClick={handleRemove}>
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
	);
};

export default NotificationItem;
