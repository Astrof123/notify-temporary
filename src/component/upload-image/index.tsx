import clsx from 'clsx';
import s from './upload-image.module.scss';
import plus from '../../images/plus.svg';
import '../../styles.css';
import { ChangeEvent, useState } from 'react';
import ImageItem from '../image-item';

function UploadImage() {
	const [isUploadingVisible, setIsUploadingVisible] = useState<boolean>(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [fileName, setFileName] = useState<string | null>(null);

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
		} else {
			setImageUrl(null);
		}
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
				{imageUrl && fileName ? (
					<div className={clsx(s['upload-image__preview'])}>
						<span className={clsx(s['upload-image__preview-text'])}>
							Выбранное изображение
						</span>
						<ImageItem imageUrl={imageUrl} imageName={fileName} />
						<div className={clsx(s['upload-image__send'])}>
							<button className={clsx('button_primary')}>
								Отправить изображение
							</button>
						</div>
					</div>
				) : (
					<div className={clsx(s['upload-image__container'])}>
						<span className={clsx(s['upload-image__text'])}>
							Выберите файл для загрузки изображения 500x200
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
		</>
	);
}

export default UploadImage;
