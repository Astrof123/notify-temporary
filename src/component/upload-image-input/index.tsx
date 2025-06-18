import clsx from 'clsx';
import s from './upload-image-input.module.scss';
import { ChangeEvent } from 'react';

interface UploadImageInputProps {
	onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UploadImageInput = (props: UploadImageInputProps) => {
	return (
		<div className={clsx(s['upload-image__container'])}>
			<span className={clsx(s['upload-image__text'])}>
				<div>
					Выберите файл для загрузки изображения
					<span className={clsx(s['upload-image__text-icon'])}>&#128247;</span>
				</div>
				<br></br>
				Оно автоматически приведется к размеру 500x200
			</span>
			<input
				className={clsx(s['upload-image__input'])}
				type='file'
				accept='image/*'
				onChange={props.onImageChange}
			/>
		</div>
	);
};

export default UploadImageInput;
