import clsx from 'clsx';
import s from './upload-image-preview.module.scss';
import ImageItem from '../image-item';

interface UploadImagePreviewProps {
	onAdd: () => void;
	onRemoveImage: () => void;
	onOpenFullImage: (imageUrlParam: string) => void;
	imageUrl: string;
	fileName: string;
}

const UploadImagePreview = (props: UploadImagePreviewProps) => {
	return (
		<div className={clsx(s['upload-image__preview'])}>
			<span className={clsx(s['upload-image__preview-text'])}>
				Выбранное изображение
			</span>
			<ImageItem
				imageUrl={props.imageUrl}
				imageName={props.fileName}
				onRemove={props.onRemoveImage}
				onOpenFullImage={props.onOpenFullImage}
			/>
			<div className={clsx(s['upload-image__send'])}>
				<button
					type='button'
					onClick={props.onAdd}
					className={clsx('button_primary')}>
					Отправить изображение
				</button>
			</div>
		</div>
	);
};

export default UploadImagePreview;
