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
			className={`absolute top-[80px] left-[55px] sm:left-0 sm:top-[20px] flex min-h-[calc(100vh+80px)] min-w-[100vw] items-center justify-center ${
				isOpen ? 'flex' : 'hidden'
			} bg-black bg-opacity-70 transition-all duration-500`}
		>
			<div>
				<RemoveScroll enabled={isOpen}>
					<FocusLock disabled={!isOpen}>{children}</FocusLock>
				</RemoveScroll>
			</div>
		</div>
	);
};
