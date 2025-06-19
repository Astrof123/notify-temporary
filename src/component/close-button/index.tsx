import clsx from 'clsx';
import s from './close-button.module.scss';
import '../../styles.css';

interface CloseButtonProps {
	onClick?: () => void;
}

const CloseButton = (props: CloseButtonProps) => {
	function handleClick(event: React.MouseEvent) {
		event.stopPropagation();
		if (props.onClick) {
			props.onClick();
		}
	}

	function handleKeyDown(event: React.KeyboardEvent) {
		event.stopPropagation();
		if (event.code === 'Enter' && props.onClick) {
			props.onClick();
		}
	}

	return (
		<div
			className={clsx(s['close-button'])}
			role='button'
			tabIndex={0}
			onClick={handleClick}
			onKeyDown={handleKeyDown}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='12'
				height='12'
				viewBox='0 0 12 12'
				fill='none'>
				<path
					d='M1 1L11 11'
					stroke='#8E8E8E'
					strokeWidth='1.5'
					strokeLinecap='round'
				/>
				<path
					d='M11 1L1 11'
					stroke='#8E8E8E'
					strokeWidth='1.5'
					strokeLinecap='round'
				/>
			</svg>
		</div>
	);
};

export default CloseButton;
