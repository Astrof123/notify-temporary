import { useState } from 'react';
import Header from '../../component/header';
import ImageList from '../../component/image-list';
import UploadImage from '../../component/upload-image';
import Modal from '../../component/modal';
import FullScreenImage from '../../component/full-screen-image';

function Gallery() {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const handleOpenFullImage = (imageUrlParam: string) => {
		setImageUrl(imageUrlParam);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setImageUrl(null);
	};

	return (
		<>
			<Header />
			<UploadImage onOpenFullImage={handleOpenFullImage} />
			<ImageList onOpenFullImage={handleOpenFullImage} />

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
