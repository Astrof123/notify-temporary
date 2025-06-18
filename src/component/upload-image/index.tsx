import clsx from 'clsx';
import s from './upload-image.module.scss';
import plus from '../../images/plus.svg';
import { ChangeEvent, useState } from 'react';
import Modal from '../modal';
import EditImage from '../edit-image';
import UploadImagePreview from '../upload-image-preview';
import UploadImageInput from '../upload-image-input';

interface UploadImageProps {
	onOpenFullImage: (imageUrlParam: string) => void;
	onAdd: (name: string, url: string) => void;
}

const UploadImage = (props: UploadImageProps) => {
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
			event.target.value = '';
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

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setImageUrl(null);
	};

	const handleAdd = () => {
		if (fileName && resizedImageUrl) {
			props.onAdd(fileName, resizedImageUrl);
			setFileName(null);
			setResizedImageUrl(null);
			setIsUploadingVisible(false);
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
				{resizedImageUrl && fileName ? (
					<UploadImagePreview
						onAdd={handleAdd}
						onRemoveImage={handleRemoveImage}
						onOpenFullImage={props.onOpenFullImage}
						imageUrl={resizedImageUrl}
						fileName={fileName}
					/>
				) : (
					<UploadImageInput onImageChange={handleImageChange} />
				)}
			</div>

			{imageUrl && (
				<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
					<EditImage imageSrc={imageUrl} onImageUpdate={handleImageUpdate} />
				</Modal>
			)}
		</>
	);
};

export default UploadImage;
