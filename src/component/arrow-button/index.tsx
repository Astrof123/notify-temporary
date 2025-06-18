import clsx from 'clsx';
import s from './arrow-button.module.scss';
import '../../styles.css';

interface ArrowButtonProps {
	isRight: boolean;
	onClick?: () => void;
}

const ArrowButton = (props: ArrowButtonProps) => {
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
			className={clsx(
				s['arrow-button'],
				props.isRight ? s['right'] : s['left']
			)}
			tabIndex={0}
			role='button'
			onClick={handleClick}
			onKeyDown={handleKeyDown}>
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
		</div>
	);
};

export default ArrowButton;
