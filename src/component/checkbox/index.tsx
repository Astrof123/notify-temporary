import clsx from 'clsx';
import s from './checkbox.module.scss';
import '../../styles.css';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

interface CheckboxProps {
	size: number;
	disabled: boolean;
	onChecked?: (arg: boolean) => void;
}

const Checkbox = forwardRef((props: CheckboxProps, ref) => {
	const [hover, setHover] = useState(false);
	const [pressed, setPressed] = useState(false);
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		if (props.onChecked) props.onChecked(checked);
	}, [checked]);

	useEffect(() => {
		if (props.disabled) {
			setChecked(false);
		}
	}, [props.disabled]);

	function getColor(isBg: boolean) {
		const bts = (value: boolean) => {
			return value.toString() as 'true' | 'false';
		};
		const colorDisabled = '#E7EAEE';
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
		if (props.disabled) {
			return isBg ? colorDisabled : colorDefault;
		} else {
			return isBg && !checked
				? 'transparent'
				: colorTree[bts(checked)][bts(pressed)][bts(hover)];
		}
	}

	function handleMouseEnter() {
		if (!props.disabled) {
			setHover(true);
		}
	}

	function handleMouseLeave() {
		if (!props.disabled) {
			setHover(false);
			setPressed(false);
		}
	}

	function handleMouseDown() {
		if (!props.disabled) {
			setPressed(true);
		}
	}

	function handleMouseUp() {
		if (!props.disabled) {
			setChecked(!checked);
			setPressed(false);
		}
	}

	function handleKeyDown(event: React.KeyboardEvent) {
		if (event.key === 'Enter') {
			handleMouseUp();
		}
	}

	useImperativeHandle(ref, () => ({
		forceCheck: handleMouseUp,
	}));

	const style: React.CSSProperties = {
		width: `${props.size}px`,
		height: `${props.size}px`,
		border: `${props.size * 0.05}px solid ${getColor(false)}`,
		backgroundColor: `${getColor(true)}`,
		borderRadius: `${props.size * 0.1}px`,
	};

	return (
		<div
			className={clsx(s['checkbox'], props.disabled && s['disabled'])}
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
});

Checkbox.displayName = 'Checkbox';
export default Checkbox;
