import { useState, useCallback } from 'react';
import Cropper, { Point, Area } from 'react-easy-crop';

import Slider from '@mui/material/Slider';
import clsx from 'clsx';
import s from './edit-image.module.scss';

interface CroppedArea {
	width: number;
	height: number;
	x: number;
	y: number;
}

interface EditImageProps {
	imageSrc: string;
	onImageUpdate: (imageUrl: string) => void;
}

const EditImage = (props: EditImageProps) => {
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] =
		useState<CroppedArea | null>(null);

	const [size, setSize] = useState<string>('');

	const onCropComplete = useCallback(
		(croppedArea: Area, croppedAreaPixels: Area) => {
			setCroppedAreaPixels(croppedAreaPixels as CroppedArea);
			setSize(`${croppedAreaPixels.width}x${croppedAreaPixels.height}`);
		},
		[]
	);

	const resizeImage = useCallback(
		(imageUrl: string, width: number, height: number) => {
			return new Promise<string>((resolve, reject) => {
				const img = new Image();
				img.onload = () => {
					const canvas = document.createElement('canvas');
					canvas.width = width;
					canvas.height = height;
					const ctx = canvas.getContext('2d');

					if (!ctx) {
						reject(new Error('Не удалось получить контекст canvas'));
						return;
					}

					ctx.drawImage(img, 0, 0, width, height);
					const dataUrl = canvas.toDataURL('image/jpeg');
					resolve(dataUrl);
				};
				img.onerror = reject;
				img.src = imageUrl;
			});
		},
		[]
	);

	const handleResize = useCallback(async () => {
		if (croppedAreaPixels && props.imageSrc) {
			try {
				const tempCanvas = document.createElement('canvas');
				const tempCtx = tempCanvas.getContext('2d');
				const img = new Image();
				img.onload = async () => {
					tempCanvas.width = croppedAreaPixels.width;
					tempCanvas.height = croppedAreaPixels.height;

					tempCtx?.drawImage(
						img,
						croppedAreaPixels.x,
						croppedAreaPixels.y,
						croppedAreaPixels.width,
						croppedAreaPixels.height,
						0,
						0,
						croppedAreaPixels.width,
						croppedAreaPixels.height
					);

					const croppedImageUrl = tempCanvas.toDataURL('image/jpeg');

					const resized = await resizeImage(croppedImageUrl, 500, 200);
					props.onImageUpdate(resized);
				};
				img.src = props.imageSrc;
			} catch (error) {
				console.error('Error resizing:', error);
			}
		}
	}, [croppedAreaPixels, resizeImage, props.imageSrc]);

	return (
		<>
			<div className={clsx(s['crop-wrapper'])}>
				<div className={clsx(s['crop-container'])}>
					<Cropper
						image={props.imageSrc}
						crop={crop}
						zoom={zoom}
						aspect={5 / 2}
						onCropChange={setCrop}
						onCropComplete={onCropComplete}
						onZoomChange={setZoom}
					/>
				</div>

				<div className={clsx(s['slider-wrapper'])}>
					<Slider
						value={zoom}
						min={1}
						max={3}
						step={0.1}
						aria-labelledby='Zoom'
						onChange={(e, newValue) => setZoom(newValue as number)}
					/>
				</div>
			</div>
			<div className={clsx(s['end-editing-wrapper'])}>
				<span>Размер выделенной области: {size}</span>
				<button
					className={clsx('button_primary')}
					onClick={handleResize}
					disabled={!props.imageSrc}>
					Завершить редактирование
				</button>
			</div>
		</>
	);
};

export default EditImage;
