import clsx from 'clsx';
import s from './search.module.scss';
import '../../styles.css';
import Input from '../input';

interface SearchProps {
	placeholder?: string;
	isRealTime?: boolean;
	onValueChanged?: (arg: string) => void;
}

function Search(props: SearchProps) {
	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		if (props.onValueChanged) {
			props.onValueChanged(event.target.value);
		}
	}

	return (
		<div className={clsx(s['search-wrapper'])}>
			<Input
				type={'search'}
				placeholder={props.placeholder}
				onChange={handleChange}
			/>
			{!props.isRealTime && (
				<button className={clsx('button_primary')}>Поиск</button>
			)}
		</div>
	);
}

export default Search;
