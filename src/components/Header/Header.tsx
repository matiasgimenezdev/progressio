import { FunctionComponent, useState } from 'react';
import { Modal } from '../Modal/Modal';
import { TrashSimple } from '@phosphor-icons/react';

type HeaderProps = {
	boardName: string | undefined;
	handleDeleteBoard: () => void;
};

export const Header: FunctionComponent<HeaderProps> = ({
	boardName,
	handleDeleteBoard,
}) => {
	const [showConfirmationMenu, setShowConfirmationMenu] =
		useState<boolean>(false);
	return (
		<header className='flex items-center bg-primary-color min-h-[80px] text-white w-full fixed'>
			<h1 className='w-fit pl-4 inline-flex items-center text-[28px]'>
				<img
					className='inline-block w-8 h-8'
					src='icons/grid.svg'
					alt='Progressio Logo'
				/>
				<span className='pl-2 hidden sm:inline-block'>Progressio</span>
			</h1>
			{boardName && (
				<h2 className='inline-block w-full font-medium text-lg text-center group'>
					{boardName}
					<button
						onClick={() => {
							setShowConfirmationMenu(true);
						}}
					>
						<TrashSimple
							size={21}
							className='hover:text-red-600 relative top-1 left-3'
							weight='regular'
						/>
					</button>
				</h2>
			)}
			<Modal isOpen={showConfirmationMenu}>
				<div className='bg-primary-color rounded-lg p-4 sm:p-8'>
					<p className='py-2 text-center'>
						Are you sure you want to delete this board?
					</p>
					<p className='font-bold text-center py-2'>
						{boardName?.toUpperCase() ?? ''}
					</p>
					<p className='text-center mt-4'>
						<button
							onClick={() => setShowConfirmationMenu(false)}
							className='font-medium bg-white text-secondary-color hover:brightness-90 p-6 py-2 mr-2 rounded-md'
						>
							Cancel
						</button>
						<button
							onClick={() => {
								handleDeleteBoard();
								setShowConfirmationMenu(false);
							}}
							className='font-medium bg-secondary-color hover:brightness-90 p-6 py-2 rounded-md'
						>
							Confirm
						</button>
					</p>
				</div>
			</Modal>
		</header>
	);
};
