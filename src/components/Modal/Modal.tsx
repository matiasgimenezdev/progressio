import { FunctionComponent, useEffect } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import FocusLock from 'react-focus-lock';

type ModalProps = {
	isOpen: boolean;
	children: React.ReactNode;
};

export const Modal: FunctionComponent<ModalProps> = ({
	isOpen = false,
	children,
}) => {
	useEffect(() => {
		if (isOpen) window.scrollTo(0, 0);
	}, [isOpen]);

	return (
		<div
			className={`z-[500] absolute top-[80px] left-0 flex h-[calc(100%-80px)] w-full items-center justify-center ${
				isOpen ? 'flex' : 'hidden'
			}`}
		>
			<div>
				<RemoveScroll enabled={isOpen}>
					<FocusLock disabled={!isOpen}>{children}</FocusLock>
				</RemoveScroll>
			</div>
		</div>
	);
};
