import React, { FunctionComponent, useState } from 'react';
import { getUUID } from '../../utils';
import { Board } from '../../types';
import { Form, Modal } from '..';
import { useKeydown } from '../../hooks';
import { X } from '@phosphor-icons/react';

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
			columns: [],
		};
		handleCreateBoard(newBoard);
		handleBoardItemClick(newBoard);
		setBoardName('');
		closeModal();
	}

	return (
		<Modal isOpen={showModal}>
			<Form handleSubmit={handleSubmit}>
				<h3 className='text-lg font-bold py-2'>Create board</h3>
				<label htmlFor='board-name'>Name</label>
				<input
					type='text'
					id='board-name'
					name='board-name'
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
					className='font-medium rounded-full hover:bg-white hover:bg-opacity-15 transition-colors duration-150 p-1 absolute top-4 right-4'
					onClick={() => closeModal()}
				>
					<X size={16} weight='bold' />
				</button>
			</Form>
		</Modal>
	);
};
