import clsx from 'clsx';
import s from './header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Header() {
	const location = useLocation();
	const state = location.state as { backgroundLocation?: Location };

	console.log(location);
	console.log(state);

	return (
		<>
			<header>
				<img src={logo} alt='logo' className={clsx(s.logo)} />
				<nav className={clsx(s.navbar)}>
					<div className={clsx(s.navbar__links)}>
						<Link
							to='/'
							className={clsx(
								s.navbar__link,
								location.pathname === '/' ? s.active : ''
							)}>
							Список уведомлений
						</Link>
						<Link
							to='/gallery'
							className={clsx(
								s.navbar__link,
								location.pathname === '/gallery' ? s.active : ''
							)}>
							Галерея изображений
						</Link>
					</div>
					<span className={clsx(s.username)}>Пользователь: IE\ValeevGV</span>
				</nav>
			</header>
		</>
	);
}
export default Header;
