import clsx from 'clsx';
import s from './checkbox.module.scss';
import '../../styles.css';
import { useEffect, useState } from 'react';

interface CheckboxProps {
	size: number;
	onChecked?: (arg: boolean) => void;
}

const Checkbox = (props: CheckboxProps) => {
	const [hover, setHover] = useState(false);
	const [pressed, setPressed] = useState(false);
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if (props.onChecked) props.onChecked(checked);
	}, [checked]);

	function getColor(isBg: boolean) {
		const bts = (value: boolean) => {
			return value.toString() as 'true' | 'false';
		};
		const colorDefault = '#A7A9AC';
		const colorHover = '#F04923';
		const colorPressed = '#DC350F';

		const colorTree = {
			false: {
				false: {
					false: colorDefault,
					true: colorHover,
				},
				true: {
					false: colorPressed,
					true: colorPressed,
				},
			},
			true: {
				false: {
					false: colorHover,
					true: colorPressed,
				},
				true: {
					false: colorDefault,
					true: colorDefault,
				},
			},
		};
		return isBg && !checked
			? 'transparent'
			: colorTree[bts(checked)][bts(pressed)][bts(hover)];
	}

	function handleMouseEnter() {
		setHover(true);
	}

	function handleMouseLeave() {
		setHover(false);
		setPressed(false);
	}

	function handleMouseDown() {
		setPressed(true);
	}

	function handleMouseUp() {
		setChecked(!checked);
		setPressed(false);
	}

	function handleKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Enter') {
			handleMouseUp();
		}
	}

	const style: React.CSSProperties = {
		width: `${props.size}px`,
		height: `${props.size}px`,
		border: `${props.size * 0.05}px solid ${getColor(false)}`,
		backgroundColor: `${getColor(true)}`,
		borderRadius: `${props.size * 0.1}px`,
	};

	return (
		<div
			className={clsx(s['checkbox'])}
			style={style}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onKeyDown={handleKeyDown}
			role='button'
			tabIndex={0}>
			{checked && (
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none'>
					<path
						d='M3 9L5.72727 12L13 4'
						stroke='white'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			)}
		</div>
	);
};

export default Checkbox;
