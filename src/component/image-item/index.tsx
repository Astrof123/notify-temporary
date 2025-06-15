import clsx from 'clsx';
import s from './image-item.module.scss';
import remove from '../../images/remove.png';

interface ImageItemProps {
	imageUrl: string;
	imageName: string;
	onRemove?: () => void;
}

const ImageItem = ({ imageUrl, imageName, onRemove }: ImageItemProps) => {
	return (
		<div className={clsx(s['image-item'])}>
			<button onClick={onRemove} className={clsx(s['image-item__exit'])}>
				<img src={remove} alt='Крестик' />
			</button>

			<img
				src={imageUrl}
				alt='Картинка'
				className={clsx(s['image-item__img'])}
			/>
			<span className={clsx(s['image-item__name'])}>{imageName}</span>
		</div>
	);
};

export default ImageItem;
