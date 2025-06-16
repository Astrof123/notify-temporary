import clsx from 'clsx';
import s from './search.module.scss';
import '../../styles.css';
import Input from '../input';

interface SearchProps {
	placeholder?: string;
}

function Search(props: SearchProps) {
	return (
		<div className={clsx(s['search-wrapper'])}>
			<Input type={'search'} placeholder={props.placeholder} />
			<button className={clsx('button_primary')}>Поиск</button>
		</div>
	);
}

export default Search;
