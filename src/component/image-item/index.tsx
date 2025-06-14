import clsx from 'clsx';
import s from './image-item.module.scss';
import remove from '../../images/remove.png';

const ImageItem = ({
	imageUrl,
	imageName,
}: {
	imageUrl: string;
	imageName: string;
}) => {
	return (
		<div className={clsx(s['image-item'])}>
			<img src={remove} alt='Крестик' className={clsx(s['image-item__exit'])} />
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
