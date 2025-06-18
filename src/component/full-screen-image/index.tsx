import clsx from 'clsx';
import s from './full-screen-image.module.scss';

interface FullScreenImageProps {
	imageUrl: string;
	onClickEndViewButton: () => void;
}

const FullScreenImage = (props: FullScreenImageProps) => {
	return (
		<div className={clsx(s['full-screen-container'])}>
			<img
				src={props.imageUrl}
				alt='Картинка'
				className={clsx(s['full-screen-image'])}
			/>
			<div className={clsx(s['end-view-wrapper'])}>
				<button
					className={clsx('button_primary')}
					onClick={() => props.onClickEndViewButton()}>
					Закрыть
				</button>
			</div>
		</div>
	);
};

export default FullScreenImage;
