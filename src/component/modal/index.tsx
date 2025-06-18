import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import s from './modal.module.scss';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal = (props: ModalProps) => {
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

		return () => {
			console.log('');
		};
	}, []);

	if (!props.isOpen || !modalRoot) {
		return null;
	}

	return ReactDOM.createPortal(
		<div
			className={clsx(s['modal-overlay'])}
			onClick={props.onClose}
			onKeyDown={props.onClose}>
			<div
				className={clsx(s['modal-content'])}
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => e.stopPropagation()}>
				{props.children}
			</div>
		</div>,
		modalRoot
	);
};

export default Modal;
