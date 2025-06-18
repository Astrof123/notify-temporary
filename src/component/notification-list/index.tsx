import { useState, useEffect, useCallback } from 'react';
import clsx from 'clsx';

import NotificationItem from '../notification-item';
import { Notification } from '../../types/notification';
import { notificationList } from '../../utils/api/notification-list';
import s from './notification-list.module.scss';

interface NotificationListProps {
	searchQuery: string;
}

const NotificationList = ({ searchQuery }: NotificationListProps) => {
	const [data, setData] = useState<Notification[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async (query: string) => {
		setLoading(true);
		setError(null);

		try {
			const newData = await notificationList.get(query);
			setData(newData);
		} catch (e: unknown) {
			let errorMessage = 'Неизвестная ошибка при получении уведомлений.';
			if (e instanceof Error) {
				errorMessage = `Ошибка при получении уведомлений: ${e.message}`;
			}
			console.error(errorMessage, e);
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchData(searchQuery);
	}, [fetchData, searchQuery]);

	const handleRefreshData = useCallback(() => {
		fetchData(searchQuery);
	}, [fetchData, searchQuery]);

	return (
		<div className={clsx(s['notifications-wrapper'])}>
			<div className={clsx(s.notifications)}>
				{loading ? (
					<p className={clsx('loading-text')}>Загрузка уведомлений...</p>
				) : error ? (
					<p className={clsx('error-text')}>{error}</p>
				) : data.length === 0 ? (
					<p className={clsx('empty-list-text')}>
						Уведомлений пока не добавлено.
					</p>
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
									key={item.id}
									notification={item}
									onUpdateData={handleRefreshData}
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
