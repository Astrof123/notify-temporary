import clsx from 'clsx';
import s from './notification-image-selector.module.scss';
import '../../styles.css';
import { ImageView } from '../../types/image-view';
import { useEffect, useState } from 'react';

interface NotificationImageSelectorProps {
	data: ImageView;
	current?: ImageView;
	onSelected: (arg: ImageView) => void;
}

const NotificationImageSelector = (props: NotificationImageSelectorProps) => {
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		setChecked(props.data.id === props.current?.id);
	}, [props.current]);

	function handleSelect() {
		props.onSelected(props.data);
	}

	return (
		<label className={clsx(s['notification-image-selector'])}>
			<input
				className={clsx(s['radio'])}
				type='radio'
				name='notification-image-selector'
				checked={checked}
				onChange={handleSelect}
			/>
			<div className={clsx(s['selector-content'])}>
				<img
					className={clsx(s['image'])}
					src={props.data.url}
					alt={props.data.name}
				/>
				<span className={clsx(s['title'])}>{props.data.name}</span>
			</div>
		</label>
	);
};

export default NotificationImageSelector;
