import clsx from 'clsx';
import s from './search.module.scss';
import '../../styles.css';
import { useCallback, useState } from 'react';

interface SearchProps {
	onSearch: (query: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
	const [query, setQuery] = useState('');

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setQuery(e.target.value);
		},
		[]
	);

	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			onSearch(query);
		},
		[onSearch, query]
	);

	return (
		<form onSubmit={handleSubmit} className={clsx(s.search)}>
			<input
				type='search'
				className={clsx(s.search__input)}
				placeholder='Поиск...'
				value={query}
				onChange={handleInputChange}
			/>
			<button className={clsx('button_primary')}>Поиск</button>
		</form>
	);
};

export default Search;
