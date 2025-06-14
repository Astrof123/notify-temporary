import clsx from 'clsx';
import s from './notification-list.module.scss';
import '../../styles.css';
import pencil from '../../images/pencil.png';
import rubbish from '../../images/rubbish.png';
import Switch from '../switch/index';

function NotificationList() {
	return (
		<div className={clsx(s['notifications-wrapper'])}>
			<div className={clsx(s.notifications)}>
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
						<tr>
							<td>Тест</td>
							<td>Ежедневное</td>
							<td>
								С 12.06.2025 21:18 <br /> По 16.06.2025 20:00 <br /> В 16:15
							</td>
							<td className={clsx(s.used)}>Используется</td>
							<td>
								<div className={clsx(s['notification__functions'])}>
									<Switch />
									<img
										className={clsx(s.edit)}
										src={pencil}
										alt='Редактировать'
										title='Редактировать'
									/>
									<img
										className={clsx(s.remove)}
										src={rubbish}
										alt='Удалить'
										title='Удалить'
									/>
								</div>
							</td>
						</tr>
						<tr>
							<td>Тест</td>
							<td>Ежедневное</td>
							<td>
								С 12.06.2025 21:18 <br /> По 16.06.2025 20:00 <br /> В 16:15
							</td>
							<td className={clsx(s['not-used'])}>Не используется</td>
							<td>
								<div className={clsx(s['notification__functions'])}>
									<Switch />
									<img
										className={clsx(s.edit)}
										src={pencil}
										alt='Редактировать'
										title='Редактировать'
									/>
									<img
										className={clsx(s.remove)}
										src={rubbish}
										alt='Удалить'
										title='Удалить'
									/>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default NotificationList;
