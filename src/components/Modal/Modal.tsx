import { FunctionComponent } from 'react';
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
	return (
		<RemoveScroll enabled={isOpen}>
			<FocusLock disabled={!isOpen}>
				<div
					className={`z-[500] absolute top-[450px] right-0.5 flex h-[calc(100%-80px)] w-[calc(100%-45px)] items-center justify-center ${
						isOpen ? 'flex' : 'hidden'
					}`}
				>
					{children}
				</div>
			</FocusLock>
		</RemoveScroll>
	);
};
