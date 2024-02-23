import React, { FunctionComponent, useEffect, useState } from 'react';
import { getUUID } from '../../utils';
import { Board } from '../../types';
import { Form, Modal } from '..';
import { useKeydown } from '../../hooks';
import { X } from '@phosphor-icons/react';

type CreateBoardFormProps = {
	showModal: boolean;
	closeModal: () => void;
	handleBoardItemClick: (board: Board) => void;
	handleCreateBoard: (board: Board) => void;
	handleUpdateBoard: (board: Board) => void;
	boardToEdit: Board | null;
};

export const BoardForm: FunctionComponent<CreateBoardFormProps> = ({
	showModal,
	closeModal,
	handleCreateBoard,
	handleUpdateBoard,
	boardToEdit,
	handleBoardItemClick,
}) => {
	const [boardName, setBoardName] = useState<string>('');
	useKeydown('Escape', closeModal);

	useEffect(() => {
		if (boardToEdit) setBoardName(boardToEdit.name);
	}, [boardToEdit]);

	function resetForm() {
		setBoardName('');
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (boardName.trim() === '') return;
		if (boardToEdit) {
			const updatedBoard = {
				...boardToEdit,
				name:
					boardName.trim().toLowerCase()[0].toUpperCase() +
					boardName.trim().slice(1),
			};
			handleUpdateBoard(updatedBoard);
			handleBoardItemClick(updatedBoard);
		} else {
			const newBoard = {
				id: getUUID(),
				name:
					boardName.trim().toLowerCase()[0].toUpperCase() +
					boardName.trim().slice(1),
				columns: [],
			};
			handleCreateBoard(newBoard);
			handleBoardItemClick(newBoard);
		}
		resetForm();
		closeModal();
	}

	return (
		<Modal isOpen={showModal} closeModal={closeModal}>
			<Form handleSubmit={handleSubmit}>
				<h3 className='text-lg font-bold py-2'>Create board</h3>
				<label htmlFor='board-name' className='text-sm'>
					Name
				</label>
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
					value={boardToEdit ? `Update board` : `Create board`}
				/>
				<button
					className='font-medium rounded-full hover:bg-white hover:bg-opacity-15 transition-colors duration-150 p-1 absolute top-4 right-0'
					onClick={() => {
						closeModal();
						resetForm();
					}}
				>
					<X size={16} weight='bold' />
				</button>
			</Form>
		</Modal>
	);
};
