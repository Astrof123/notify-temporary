import clsx from 'clsx';
import s from './header.module.scss';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Header() {
	return (
		<>
			<header>
				<img src={logo} alt='logo' className={clsx(s.logo)} />
				<nav className={clsx(s.navbar)}>
					<div className={clsx(s.navbar__links)}>
						<Link to='/' className={clsx(s.navbar__link)}>
							Список уведомлений
						</Link>
						<Link to='/gallery' className={clsx(s.navbar__link)}>
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
