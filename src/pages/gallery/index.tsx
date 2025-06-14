import Header from '../../component/header';
import ImageList from '../../component/image-list';
import UploadImage from '../../component/upload-image';

function Gallery() {
	return (
		<>
			<Header />
			<UploadImage />
			<ImageList />
		</>
	);
}

export default Gallery;
