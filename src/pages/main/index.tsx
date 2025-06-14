import Header from '../../component/header';
import NotificationList from '../../component/notification-list';
import Search from '../../component/search';
import '../../styles.css';
import plus from '../../images/plus.svg';
import clsx from 'clsx';
import s from './main.module.scss';

function Main() {
	return (
		<>
			<Header />
			<div className={clsx(s['search-wrapper'])}>
				<div className={clsx(s['search-extra-container'])}></div>
				<Search />
				<div className={clsx(s['add-notification-wrapper'])}>
					<a className={clsx('no-link')} href='/add-notify'>
						<button className={clsx('button_primary')}>
							Добавить уведомление
							<img className={clsx('plus-icon')} src={plus} alt='plus' />
						</button>
					</a>
				</div>
			</div>

			<NotificationList />
		</>
	);
}

export default Main;
