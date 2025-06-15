import clsx from 'clsx';
import s from './image-list.module.scss';
import ImageItem from '../image-item';
import example from '../../images/example.png';

interface ImageListProps {
	onOpenFullImage: (imageUrlParam: string) => void;
}

const ImageList = ({ onOpenFullImage }: ImageListProps) => {
	return (
		<div className={clsx(s['image-list'])}>
			<span className={clsx(s['image-list__title'])}>
				Загруженные изображения
			</span>
			<div className={clsx(s['image-list__container'])}>
				<ImageItem
					imageUrl={example}
					imageName='picture.png'
					onOpenFullImage={onOpenFullImage}
				/>
				<ImageItem
					imageUrl={example}
					imageName='picture.png'
					onOpenFullImage={onOpenFullImage}
				/>
				<ImageItem
					imageUrl={example}
					imageName='picture.png'
					onOpenFullImage={onOpenFullImage}
				/>
				<ImageItem
					imageUrl={example}
					imageName='picture.png'
					onOpenFullImage={onOpenFullImage}
				/>
				<ImageItem
					imageUrl={example}
					imageName='picture.png'
					onOpenFullImage={onOpenFullImage}
				/>
			</div>
		</div>
	);
};

export default ImageList;
