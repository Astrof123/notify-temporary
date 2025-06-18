import { useState, useEffect, useCallback } from 'react';
import Header from '../../component/header';
import ImageList from '../../component/image-list';
import UploadImage from '../../component/upload-image';
import Modal from '../../component/modal';
import FullScreenImage from '../../component/full-screen-image';
import { ImageView } from '../../types/image-view';
import { imageViewList } from '../../utils/api/gallery';
import SmallModal from '../../component/small-modal';
import { MessageType } from '../../types/message-type';

function Gallery() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isErrorSmallModalOpen, setIsErrorSmallModalOpen] =
		useState<boolean>(false);
	const [isSuccessSmallModalOpen, setIsSuccessSmallModalOpen] =
		useState<boolean>(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [data, setData] = useState<ImageView[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		setLoading(true);
		setError(null);

		try {
			const newData = await imageViewList.get();
			await new Promise((resolve) => setTimeout(resolve, 300));
			setData(newData);
		} catch (e: unknown) {
			let errorMessage = 'Ошибка при получении изображений.';
			if (e instanceof Error) {
				errorMessage = `Ошибка при получении изображений: ${e.message}`;
			}
			console.error(errorMessage, e);
			setError(errorMessage);
			setIsErrorSmallModalOpen(true);
		} finally {
			setLoading(false);
		}
	}, []);

	const handleRemove = useCallback(
		async (imageId?: number) => {
			setLoading(true);
			setError(null);

			try {
				if (imageId) {
					await imageViewList.deleteItem(imageId);
					await fetchData();
					setSuccessMessage('Изображение успешно удалено');
					setIsSuccessSmallModalOpen(true);
				}
			} catch (e: unknown) {
				let errorMessage = 'Ошибка при удалении изображения.';

				if (e instanceof Error) {
					errorMessage = `Ошибка при удалении изображения: ${e.message}`;
				}

				console.error(errorMessage, e);
				setError(errorMessage);
				setIsErrorSmallModalOpen(true);
			} finally {
				setLoading(false);
			}
		},
		[fetchData]
	);

	const handleAdd = useCallback(
		async (name: string, url: string) => {
			setLoading(true);
			setError(null);

			try {
				await imageViewList.post(name, url);
				await fetchData();

				setSuccessMessage('Изображение успешно загружено');
				setIsSuccessSmallModalOpen(true);
			} catch (e: unknown) {
				let errorMessage = 'Ошибка при добавлении изображения.';

				if (e instanceof Error) {
					errorMessage = `Ошибка при добавлении изображения: ${e.message}`;
				}

				console.error(errorMessage, e);
				setError(errorMessage);
				setIsErrorSmallModalOpen(true);
			} finally {
				setLoading(false);
			}
		},
		[fetchData]
	);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleOpenFullImage = useCallback((imageUrlParam: string) => {
		setImageUrl(imageUrlParam);
		setIsModalOpen(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setIsModalOpen(false);
		setImageUrl(null);
	}, []);

	const handleCloseErrorSmallModal = useCallback(() => {
		setIsErrorSmallModalOpen(false);
		setError(null);
	}, []);

	const handleCloseSuccessSmallModal = useCallback(() => {
		setIsSuccessSmallModalOpen(false);
		setSuccessMessage(null);
	}, []);

	return (
		<>
			<Header />
			<UploadImage onOpenFullImage={handleOpenFullImage} onAdd={handleAdd} />

			<ImageList
				onOpenFullImage={handleOpenFullImage}
				images={data}
				loading={loading}
				onRemove={handleRemove}
			/>

			{imageUrl && (
				<Modal isOpen={isModalOpen} onClose={handleCloseModal}>
					<FullScreenImage
						imageUrl={imageUrl}
						onClickEndViewButton={handleCloseModal}
					/>
				</Modal>
			)}

			{error && (
				<SmallModal
					isOpen={isErrorSmallModalOpen}
					onClose={handleCloseErrorSmallModal}
					message={error}
					messageType={MessageType.Error}
					buttonText='Понятно'
				/>
			)}

			{successMessage && (
				<SmallModal
					isOpen={isSuccessSmallModalOpen}
					onClose={handleCloseSuccessSmallModal}
					message={successMessage}
					messageType={MessageType.Success}
					buttonText='Понятно'
				/>
			)}
		</>
	);
}

export default Gallery;
