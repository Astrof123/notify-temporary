import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import s from './small-modal.module.scss';
import { MessageType } from '../../types/message-type';

interface SmallModalProps {
	isOpen: boolean;
	onClose: () => void;
	message: string;
	messageType: MessageType;
	buttonText: string;
}

const SmallModal = (props: SmallModalProps) => {
	const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
	const modalRootRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		const root =
			document.getElementById('modal-root') || document.createElement('div');

		if (!document.getElementById('modal-root')) {
			root.setAttribute('id', 'modal-root');
			document.body.appendChild(root);
		}

		setModalRoot(root);
		modalRootRef.current = root;

		setTimeout(() => {
			props.onClose();
		}, 5000);

		return () => {
			console.log('');
		};
	}, []);

	if (!props.isOpen || !modalRoot) {
		return null;
	}

	return ReactDOM.createPortal(
		<div
			className={clsx(
				s['modal-content'],
				props.messageType == MessageType.Success
					? s['modal-content_success']
					: s['modal-content_error']
			)}>
			<p>{props.message}</p>
			<button
				className={clsx(
					s['modal-button'],
					'button_empty',
					props.messageType == MessageType.Success
						? s['modal-button_success']
						: s['modal-button_error']
				)}
				type='button'
				onClick={() => props.onClose()}>
				{props.buttonText}
			</button>
		</div>,
		modalRoot
	);
};

export default SmallModal;
