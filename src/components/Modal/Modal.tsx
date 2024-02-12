import { FunctionComponent } from 'react';

type ModalProps = {
	isOpen: boolean;
	children: React.ReactNode;
};

export const Modal: FunctionComponent<ModalProps> = ({
	isOpen = false,
	children,
}) => {
	return (
		<div
			className={`absolute bottom-0 right-0.5 flex h-[calc(100%-80px)] w-[calc(100%-45px)] items-center justify-center ${
				isOpen ? 'flex' : 'hidden'
			}`}
		>
			{children}
		</div>
	);
};
