import Header from '../../component/header';
import NotificationList from '../../component/notification-list';
import Search from '../../component/search';
import '../../styles.css';
import plus from '../../images/plus.svg';
import clsx from 'clsx';
import s from './main.module.scss';
import { useCallback, useState } from 'react';

function Main() {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSearch = useCallback((query: string) => {
		setSearchQuery(query);
	}, []);

	return (
		<>
			<Header />
			<div className={clsx(s['search-wrapper'])}>
				<div className={clsx(s['search-extra-container'])}>
					<Search onSearch={handleSearch} />
				</div>
				<a className={clsx('no-link')} href='/add-notify'>
					<button className={clsx('button_primary')}>
						Добавить уведомление
						<img className={clsx('plus-icon')} src={plus} alt='plus' />
					</button>
				</a>
			</div>

			<NotificationList searchQuery={searchQuery} />
		</>
	);
}

export default Main;
