import clsx from 'clsx';
import s from './instrument-button.module.scss';
import '../../styles.css';

type InstrumentButtonType = 'right-arrow' | 'left-arrow' | 'plus' | 'minus';

interface InstrumentButtonProps {
	type: InstrumentButtonType;
	onClick?: () => void;
}

const InstrumentButton = (props: InstrumentButtonProps) => {
	function handleClick() {
		if (props.onClick) {
			props.onClick();
		}
	}

	function handleKeyDown(event: React.KeyboardEvent) {
		if (event.code === 'Enter') {
			handleClick();
		}
	}

	return (
		<div
			className={clsx(s['instrument-button'], s[props.type])}
			tabIndex={0}
			role='button'
			onClick={handleClick}
			onKeyDown={handleKeyDown}>
			{(props.type === 'right-arrow' || props.type === 'left-arrow') && (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'>
					<path
						d='M20 9L14.117 14.8793C12.945 16.0505 11.0456 16.05 9.87435 14.878L4 9'
						stroke='#1E1E1E'
						strokeWidth='1.5'
						strokeLinejoin='round'
					/>
				</svg>
			)}
			{props.type === 'plus' && (
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M12 21L12 3'
						stroke='black'
						strokeWidth='1.5'
						strokeLinecap='round'
					/>
					<path
						d='M3 12H21'
						stroke='black'
						strokeWidth='1.5'
						strokeLinecap='round'
					/>
				</svg>
			)}
			{props.type === 'minus' && (
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'>
					<path
						d='M3 12H21'
						stroke='black'
						strokeWidth='1.5'
						strokeLinecap='round'
					/>
				</svg>
			)}
		</div>
	);
};

export default InstrumentButton;
