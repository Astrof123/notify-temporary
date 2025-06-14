import clsx from 'clsx';
import s from './image-list.module.scss';
import ImageItem from '../image-item';
import example from '../../images/example.png';

function ImageList() {
	return (
		<div className={clsx(s['image-list'])}>
			<span className={clsx(s['image-list__title'])}>
				Загруженные изображения
			</span>
			<div className={clsx(s['image-list__container'])}>
				<ImageItem imageUrl={example} imageName='picture.png' />
				<ImageItem imageUrl={example} imageName='picture.png' />
				<ImageItem imageUrl={example} imageName='picture.png' />
				<ImageItem imageUrl={example} imageName='picture.png' />
				<ImageItem imageUrl={example} imageName='picture.png' />
			</div>
		</div>
	);
}

export default ImageList;
