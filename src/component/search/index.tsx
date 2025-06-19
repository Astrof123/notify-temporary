import { useCallback } from 'react';
import clsx from 'clsx';
import s from './search.module.scss';
import Input from '../input';

interface SearchProps {
	placeholder?: string;
	isRealTime?: boolean;
	onValueChanged?: (arg: string) => void;
	onSubmit?: (query: string) => void;
}

function Search(props: SearchProps) {
	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		props.onValueChanged?.(event.target.value);
	}

	const onSubmit = props.onSubmit;

	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			const form = e.target as HTMLFormElement;
			const searchElement = form.querySelector(
				'[name="search"]'
			) as HTMLInputElement;
			onSubmit?.(searchElement.value);
		},
		[onSubmit]
	);

	return (
		<form onSubmit={handleSubmit} className={clsx(s['search-wrapper'])}>
			<Input
				type={'search'}
				placeholder={props.placeholder}
				onChange={handleChange}
				name={'search'}
			/>
			{!props.isRealTime && (
				<button className={clsx('button_primary')}>Поиск</button>
			)}
		</form>
	);
}

export default Search;
