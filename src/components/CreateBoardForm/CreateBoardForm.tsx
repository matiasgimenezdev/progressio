import React, { FunctionComponent, useState } from 'react';
import { getUUID } from '../../utils';
import { Board } from '../../types';
import { Modal } from '..';
import { useKeydown } from '../../hooks/useKeydown';

type CreateBoardFormProps = {
	showModal: boolean;
	closeModal: () => void;
	handleCreateBoard: (board: Board) => void;
	handleBoardItemClick: (board: Board) => void;
};

export const CreateBoardForm: FunctionComponent<CreateBoardFormProps> = ({
	showModal,
	closeModal,
	handleCreateBoard,
	handleBoardItemClick,
}) => {
	const [boardName, setBoardName] = useState<string>('');
	useKeydown('Escape', closeModal);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (boardName.trim() === '') return;
		const newBoard = {
			id: getUUID(),
			name:
				boardName.trim().toLowerCase()[0].toUpperCase() +
				boardName.trim().slice(1),
		};
		handleCreateBoard(newBoard);
		handleBoardItemClick(newBoard);
		closeModal();
	}

	return (
		<Modal isOpen={showModal}>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-2 bg-primary-color p-5 text-white rounded-lg sm:p-8 sm:w-80 sm:h-75'
			>
				<h3 className='text-lg font-bold py-2'>Create board</h3>
				<label htmlFor='board-name'>Name</label>
				<input
					type='text'
					id='board-name'
					maxLength={15}
					value={boardName}
					className='bg-transparent border border-white rounded-md p-2 focus:outline-none focus-within:border-2'
					onChange={(event) => setBoardName(event.target.value)}
					autoComplete='off'
				/>
				<input
					type='submit'
					className='font-medium mt-4 bg-secondary-color py-2 rounded-md cursor-pointer hover:brightness-90'
					value='Create board'
				/>
				<button
					className='font-medium mt-0.5 bg-red-700 py-2 rounded-md hover:brightness-90'
					onClick={() => closeModal()}
				>
					Close
				</button>
			</form>
		</Modal>
	);
};
