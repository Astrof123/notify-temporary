import clsx from 'clsx';
import s from './search.module.scss';
import '../../styles.css';

function Search() {
	return (
		<div className={clsx(s.search)}>
			<input
				type='text'
				className={clsx(s.search__input)}
				placeholder='Поиск...'
			/>
			<div className={clsx(s.search__buttons)}>
				<button className={clsx('button_secondary')}>Сбросить поиск</button>
				<button className={clsx('button_primary')}>Поиск</button>
			</div>
		</div>
	);
}

export default Search;
