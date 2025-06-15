import clsx from 'clsx';
import s from './image-item.module.scss';
import remove from '../../images/remove.png';

interface ImageItemProps {
	imageUrl: string;
	imageName: string;
	onRemove?: () => void;
	onOpenFullImage: (imageUrlParam: string) => void;
}

const ImageItem = ({
	imageUrl,
	imageName,
	onRemove,
	onOpenFullImage,
}: ImageItemProps) => {
	return (
		<div className={clsx(s['image-item'])}>
			<button onClick={onRemove} className={clsx(s['image-item__exit'])}>
				<img src={remove} alt='Крестик' />
			</button>

			<button
				onClick={() => onOpenFullImage(imageUrl)}
				className={clsx(s['image-item__view'])}>
				<img
					src={imageUrl}
					alt='Картинка'
					className={clsx(s['image-item__img'])}
				/>
			</button>

			<span className={clsx(s['image-item__name'])}>{imageName}</span>
		</div>
	);
};

export default ImageItem;
