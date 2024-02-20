import { FunctionComponent, useEffect } from 'react';
import Modal from 'react-modal';
import { RemoveScroll } from 'react-remove-scroll';
import { useKeydown } from '../../hooks';

Modal.setAppElement('#root');

type ModalProps = {
	isOpen: boolean;
	closeModal: () => void;
	children: React.ReactNode;
};

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		border: 'none',
		bordeRadius: '20px',
		transform: 'translate(-50%, -50%)',
		backgroundColor: '#0d1117',
	},
	overlay: {
		backgroundColor: 'rgba(0, 0, 0, 0.788)',
	},
};

export const CustomModal: FunctionComponent<ModalProps> = ({
	isOpen = false,
	closeModal,
	children,
}) => {
	useKeydown('Escape', () => closeModal());

	useEffect(() => {
		if (isOpen) window.scrollTo(0, 0);
	}, [isOpen]);

	return (
		<Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
			<RemoveScroll>{children}</RemoveScroll>
		</Modal>
	);
};
