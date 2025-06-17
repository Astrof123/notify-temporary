import clsx from 'clsx';
import s from './notification-list.module.scss';
import '../../styles.css';
import { useEffect, useState, useCallback } from 'react';
import { Notification } from '../../types/notification';
import NotificationItem from '../notification-item';
import { notificationList } from '../../utils/api/notification-list';

interface NotificationListProps {
	searchQuery: string;
}

const NotificationList = ({ searchQuery }: NotificationListProps) => {
	const [data, setData] = useState<Notification[]>([]);
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState(false);

	const fetchData = useCallback(async (query = '') => {
		setLoading(true);

		try {
			const newData = await notificationList.get(query);
			setData(newData);
		} catch (e) {
			if (e instanceof Error) {
				console.error('Ошибка при получении уведомлений:', e.message);
			} else {
				console.error('Неизвестная ошибка при получении уведомлений:', e);
			}
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData(searchQuery);
	}, [fetchData, searchQuery]);

	const handleUpdateData = useCallback(() => {
		setRefresh((prev) => !prev);
	}, []);

	useEffect(() => {
		if (refresh) {
			fetchData(searchQuery);
			setRefresh(false);
		}
	}, [refresh, fetchData, searchQuery]);

	return (
		<div className={clsx(s['notifications-wrapper'])}>
			<div className={clsx(s.notifications)}>
				{loading ? (
					<p className={clsx(s['loading-text'])}>Загрузка уведомлений...</p>
				) : (
					<table>
						<thead>
							<tr>
								<th>Наименование уведомления</th>
								<th>Тип уведомления</th>
								<th>Период активности</th>
								<th>Активность</th>
								<th>Функции</th>
							</tr>
						</thead>
						<tbody>
							{data.map((item) => (
								<NotificationItem
									notification={item}
									onUpdateData={handleUpdateData}
									key={item.id}
								/>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default NotificationList;
