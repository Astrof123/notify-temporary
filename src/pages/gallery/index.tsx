import { useState, useEffect, useCallback } from 'react';
import ImageList from '../../component/image-list';
import UploadImage from '../../component/upload-image';
import Modal from '../../component/modal';
import FullScreenImage from '../../component/full-screen-image';
import { ImageView } from '../../types/image-view';
import { imageViewList } from '../../utils/api/gallery';
import { MessageType } from '../../types/message-type';
import { useToast } from '../../hook/useToast';

function Gallery() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [data, setData] = useState<ImageView[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const { notify } = useToast();

	const fetchData = useCallback(async () => {
		setLoading(true);

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
			notify(errorMessage, MessageType.Error, 'Понятно');
		} finally {
			setLoading(false);
		}
	}, []);

	const handleRemove = useCallback(
		async (imageId?: number) => {
			setLoading(true);
			try {
				if (imageId) {
					await imageViewList.deleteItem(imageId);
					await fetchData();
					notify('Изображение успешно удалено', MessageType.Success, 'Понятно');
				}
			} catch (e: unknown) {
				let errorMessage = 'Ошибка при удалении изображения.';

				if (e instanceof Error) {
					errorMessage = `Ошибка при удалении изображения: ${e.message}`;
				}

				console.error(errorMessage, e);
				notify(errorMessage, MessageType.Error, 'Понятно');
			} finally {
				setLoading(false);
			}
		},
		[fetchData]
	);

	const handleAdd = useCallback(
		async (name: string, url: string) => {
			setLoading(true);

			try {
				await imageViewList.post(name, url);
				await fetchData();

				notify('Изображение успешно загружено', MessageType.Success, 'Понятно');
			} catch (e: unknown) {
				let errorMessage = 'Ошибка при добавлении изображения.';

				if (e instanceof Error) {
					errorMessage = `Ошибка при добавлении изображения: ${e.message}`;
				}

				console.error(errorMessage, e);
				notify(errorMessage, MessageType.Error, 'Понятно');
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

	return (
		<>
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
		</>
	);
}

export default Gallery;
