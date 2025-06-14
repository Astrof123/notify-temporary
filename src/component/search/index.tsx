import clsx from 'clsx';
import s from './search.module.scss';
import '../../styles.css';

function Search() {
	return (
		<div className={clsx(s.search)}>
			<input
				type='search'
				className={clsx(s.search__input)}
				placeholder='Поиск...'
			/>
			<button className={clsx('button_primary')}>Поиск</button>
		</div>
	);
}

export default Search;
