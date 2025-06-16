import clsx from 'clsx';
import s from './targets-choice-line.module.scss';
import '../../styles.css';
import { useState } from 'react';
import Checkbox from '../checkbox';

interface TargetsChoiceLineProps {
	depth: number;
	title: string;
}

const TargetsChoiceLine = (props: TargetsChoiceLineProps) => {
	const [expanded, setExpanded] = useState(false);

	function handleMarkerOnClick() {
		setExpanded(!expanded);
	}

	function handleMarkerKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Enter') {
			handleMarkerOnClick();
		}
	}

	return (
		<div className={clsx(s['target-line-container'])}>
			<div className={clsx(s['parent-box'])}>
				<div
					className={clsx(s['marker'])}
					tabIndex={0}
					role='button'
					onKeyDown={handleMarkerKeyDown}
					onClick={handleMarkerOnClick}>
					<span>{expanded ? '-' : '+'}</span>
				</div>
				<Checkbox size={20} />
				<span className={clsx(s['title'])}>{props.title}</span>
			</div>
			{expanded && <div className={clsx(s['children-box'])}>Some children</div>}
		</div>
	);
};

export default TargetsChoiceLine;
