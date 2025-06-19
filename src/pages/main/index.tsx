import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import NotificationList from '../../component/notification-list';
import Search from '../../component/search';

import plusIcon from '../../images/plus.svg';
import s from './main.module.scss';

function Main() {
	const [searchQuery, setSearchQuery] = useState<string>('');

	const handleSearch = useCallback((query: string) => {
		setSearchQuery(query);
	}, []);

	return (
		<>
			<div className={clsx(s['search-bar-container'])}>
				<div className={clsx(s['search-input-container'])}>
					<Search placeholder={'Поиск уведомления'} onSubmit={handleSearch} />
				</div>
				<Link to='/add-notify' className={clsx('no-link')}>
					<button className={clsx('button_primary')}>
						Добавить уведомление
						<img className={clsx('plus-icon')} src={plusIcon} alt='plus' />
					</button>
				</Link>
			</div>

			<NotificationList searchQuery={searchQuery} />
		</>
	);
}

export default Main;
