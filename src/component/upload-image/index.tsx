import clsx from 'clsx';
import s from './upload-image.module.scss';
import plus from '../../images/plus.svg';
import '../../styles.css';
import { ChangeEvent, useState } from 'react';
import ImageItem from '../image-item';
import Modal from '../modal';
import EditImage from '../edit-image';

function UploadImage() {
	const [isUploadingVisible, setIsUploadingVisible] = useState<boolean>(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [fileName, setFileName] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [resizedImageUrl, setResizedImageUrl] = useState<string | null>(null);

	const toggleUploadingVisible = () => {
		setIsUploadingVisible(!isUploadingVisible);
	};

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];

		if (file) {
			const fileName = file.name;
			setFileName(fileName);

			const reader = new FileReader();
			reader.onloadend = () => {
				setImageUrl(reader.result as string);
			};
			reader.readAsDataURL(file);
			setIsModalOpen(true);
		} else {
			setImageUrl(null);
		}
	};

	const handleImageUpdate = (newImageUrl: string) => {
		setResizedImageUrl(newImageUrl);
		setIsModalOpen(false);
	};

	const handleRemoveImage = () => {
		setImageUrl(null);
		setResizedImageUrl(null);
		setFileName(null);
	};

	return (
		<>
			<div className={clsx(s['upload-button-wrapper'])}>
				<button
					className={clsx('button_primary')}
					onClick={toggleUploadingVisible}>
					{isUploadingVisible ? 'Скрыть' : 'Добавить изображение'}
					<img className={clsx('plus-icon')} src={plus} alt='plus' />
				</button>
			</div>

			<div
				className={clsx(s['upload-image'], {
					[s.visible]: isUploadingVisible,
				})}>
				{resizedImageUrl && fileName ? (
					<div className={clsx(s['upload-image__preview'])}>
						<span className={clsx(s['upload-image__preview-text'])}>
							Выбранное изображение
						</span>
						<ImageItem
							imageUrl={resizedImageUrl}
							imageName={fileName}
							onRemove={handleRemoveImage}
						/>
						<div className={clsx(s['upload-image__send'])}>
							<button className={clsx('button_primary')}>
								Отправить изображение
							</button>
						</div>
					</div>
				) : (
					<div className={clsx(s['upload-image__container'])}>
						<span className={clsx(s['upload-image__text'])}>
							Выберите файл для загрузки изображения
							<span className={clsx(s['upload-image__text-icon'])}>
								&#128247;
							</span>
						</span>
						<input
							className={clsx(s['upload-image__input'])}
							type='file'
							accept='image/*'
							onChange={handleImageChange}
						/>
					</div>
				)}
			</div>

			{imageUrl && (
				<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
					<EditImage imageSrc={imageUrl} onImageUpdate={handleImageUpdate} />
				</Modal>
			)}
		</>
	);
}

export default UploadImage;
