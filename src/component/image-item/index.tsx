import clsx from 'clsx';
import s from './image-item.module.scss';
import remove from '../../images/remove.png';

interface ImageItemProps {
	imageId?: number;
	imageUrl: string;
	imageName: string;
	onRemove: (imageId?: number) => void;
	onOpenFullImage: (imageUrlParam: string) => void;
}

const ImageItem = (props: ImageItemProps) => {
	return (
		<div className={clsx(s['image-item'])}>
			<button
				onClick={() => props.onRemove(props.imageId)}
				className={clsx(s['image-item__exit'])}>
				<img src={remove} alt='Крестик' />
			</button>

			<button
				onClick={() => props.onOpenFullImage(props.imageUrl)}
				className={clsx(s['image-item__view'])}>
				<img
					src={props.imageUrl}
					alt='Картинка'
					className={clsx(s['image-item__img'])}
				/>
			</button>

			<span className={clsx(s['image-item__name'])}>{props.imageName}</span>
		</div>
	);
};

export default ImageItem;
