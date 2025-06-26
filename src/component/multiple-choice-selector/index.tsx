import clsx from 'clsx';
import s from './multiple-choice-selector.module.scss';
import '../../styles.css';

interface MultipleChoiceSelectorProps {
	dataArray: any[];
	chosen: any[];
	rowAmount?: number;
	onChange: (arg: any[]) => void;
}

const MultipleChoiceSelector = (props: MultipleChoiceSelectorProps) => {
	function getSelectorStyle() {
		return {
			'--multiple-items-count': props.rowAmount,
		} as React.CSSProperties;
	}

	function handleItemClick(value: any) {
		const copy = [...props.chosen];
		const index = copy.indexOf(value);
		if (index !== -1) {
			copy.splice(index, 1);
		} else {
			copy.push(value);
		}
		props.onChange(copy);
	}

	function handleItenKeyDown(event: React.KeyboardEvent, value: any) {
		if (event.code === 'Enter') {
			handleItemClick(value);
		}
	}

	return (
		<div
			className={clsx(s['multiple-choice-selector-container'])}
			style={getSelectorStyle()}>
			{props.dataArray.map((item, index) => (
				<div
					key={index}
					className={clsx(
						s['item'],
						props.rowAmount && s['fill'],
						props.chosen.includes(item) && s['chosen']
					)}
					tabIndex={0}
					role='button'
					onClick={() => handleItemClick(item)}
					onKeyDown={(event) => handleItenKeyDown(event, item)}>
					{item}
				</div>
			))}
		</div>
	);
};

export default MultipleChoiceSelector;
