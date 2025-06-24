import clsx from 'clsx';
import s from './notification-image-choice.module.scss';
import '../../styles.css';
import FormSectionTitle from '../form-section-title';
import CheckboxWithLabel from '../checkbox-with-label';
import { useState } from 'react';
import { notificationImages } from '../../utils/consts';
import NotificationImageSelector from '../notification-image-selector';
import { ImageView } from '../../types/image-view';

const NotificationImageChoice = () => {
	const [withoutImage, setWithoutImage] = useState(false);
	const [selectedImage, setSelectedImage] = useState<ImageView>();

	return (
		<div
			className={clsx(
				'form-section',
				s['notification-image-choice-container']
			)}>
			<div className={clsx('content', 'no-overflow')}>
				<FormSectionTitle title={'Изображение для уведомления'} />
				<CheckboxWithLabel
					size={24}
					label={'Отключить изображение для уведомления'}
					disabled={false}
					onChecked={setWithoutImage}
				/>
				{!withoutImage && (
					<div className={clsx(s['images-container-wrapper'])}>
						<div className={clsx(s['images-container'])}>
							{notificationImages.map((image, index) => (
								<NotificationImageSelector
									key={index}
									data={image}
									current={selectedImage}
									onSelected={setSelectedImage}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default NotificationImageChoice;
