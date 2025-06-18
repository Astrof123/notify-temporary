import clsx from 'clsx';
import s from './image-list.module.scss';
import ImageItem from '../image-item';
import { ImageView } from '../../types/image-view';

interface ImageListProps {
	onOpenFullImage: (imageUrlParam: string) => void;
	images: ImageView[];
	loading: boolean;
	onRemove: (imageId?: number) => Promise<void>;
}

const ImageList = (props: ImageListProps) => {
	return (
		<section className={clsx(s['image-list'])}>
			{props.loading ? (
				<p className={clsx('loading-text')}>Загрузка изображений...</p>
			) : props.images.length === 0 ? (
				<p className={clsx('empty-list-text')}>Нет загруженных изображений.</p>
			) : (
				<>
					<span className={clsx(s['image-list__title'])}>
						Загруженные изображения
					</span>
					<div className={clsx(s['image-list__container'])}>
						{props.images.map((item) => (
							<ImageItem
								imageId={item.id}
								imageUrl={item.url}
								imageName={item.name}
								onOpenFullImage={props.onOpenFullImage}
								onRemove={props.onRemove}
								key={item.id}
							/>
						))}
					</div>
				</>
			)}
		</section>
	);
};

export default ImageList;
