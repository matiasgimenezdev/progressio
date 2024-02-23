import React, { FunctionComponent, useState } from 'react';
import { getUUID } from '../../utils';
import { Column } from '../../types';
import { Form, Modal } from '..';
import { X } from '@phosphor-icons/react';
import { ColorPicker } from './ColorPicker/ColorPicker';

type CreateColumnFormProps = {
	showModal: boolean;
	closeModal: () => void;
	handleAddColumn: (column: Column) => void;
	handleUpdateColumn: (column: Column) => void;
	columnToEdit: Column | null;
};

export const ColumnForm: FunctionComponent<CreateColumnFormProps> = ({
	showModal,
	closeModal,
	handleAddColumn,
	handleUpdateColumn,
	columnToEdit,
}) => {
	const [title, setTitle] = useState<string>('');
	const [color, setColor] = useState<string>('#FFFFFF');
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	function resetForm() {
		setTitle('');
		setColor('#FFFFFF');
		setErrorMessage('');
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (title.trim() === '') {
			setErrorMessage("Column title can't be empty");
			return;
		}

		if (columnToEdit) {
			const updatedColumn: Column = {
				...columnToEdit,
				title,
				color,
			};
			handleUpdateColumn(updatedColumn);
		} else {
			const newColumn = {
				id: getUUID(),
				title,
				color,
				tasks: [],
			};

			handleAddColumn(newColumn);
		}
		resetForm();
		closeModal();
	}

	return (
		<Modal
			isOpen={showModal}
			closeModal={() => {
				closeModal();
				resetForm();
			}}
		>
			<Form handleSubmit={handleSubmit} errorMessage={errorMessage}>
				<h3 className='text-lg font-bold'>Add column</h3>
				<label htmlFor='column-title' className='text-sm'>
					Title
				</label>
				<input
					type='text'
					name='column-title'
					id='column-title'
					maxLength={15}
					value={title}
					className='bg-transparent border border-white rounded-md p-2 focus:outline-none focus-within:border-2'
					onChange={(event) => setTitle(event.target.value)}
					autoComplete='off'
				/>
				<input
					type='hidden'
					name='column-color'
					id='column-color'
					value={color}
					className='bg-transparent border border-white rounded-md p-2 focus:outline-none focus-within:border-2'
					onChange={(event) => setColor(event.target.value)}
				/>
				<ColorPicker setColor={setColor} color={color} />
				<input
					type='submit'
					className='font-medium mt-4 bg-secondary-color py-2 rounded-md cursor-pointer hover:brightness-90'
					value='Add column'
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
