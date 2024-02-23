import { FunctionComponent, useState } from 'react';
import { Board, Column } from '../../types';
import { DashboardColumn } from './DashboardColumn';
import { ColumnForm } from '../Form/ColumnForm';
import { useModal } from '../../hooks';

type DashboardProps = {
	currentBoard: Board;
	handleUpdateBoard: (board: Board) => void;
};

export const Dashboard: FunctionComponent<DashboardProps> = ({
	currentBoard,
	handleUpdateBoard,
}) => {
	const [isModalOpen, showModal, closeModal] = useModal();
	const [columnToEdit, setColumnToEdit] = useState<Column | null>(null);

	function handleRemoveColumn(columnId: string) {
		const nextColumns = currentBoard?.columns.filter(
			(column) => column.id !== columnId
		);

		handleUpdateBoard({
			...currentBoard,
			columns: nextColumns ?? [],
		});
	}

	function handleAddColumn(column: Column) {
		const nextColumns = [...currentBoard.columns, column];

		handleUpdateBoard({
			...currentBoard,
			columns: nextColumns,
		});
	}

	function handleUpdateColumn(column: Column) {
		const nextColumns = currentBoard.columns.map((c) =>
			c.id === column.id ? column : c
		);

		handleUpdateBoard({
			...currentBoard,
			columns: nextColumns,
		});
	}

	return (
		<main className='flex flex-col md:flex-row gap-8 min-w-fit w-full pl-[60px] min-h-full h-auto p-8 pt-[85px] bg-background-color text-white'>
			{currentBoard.columns &&
				currentBoard.columns.map((column) => {
					return (
						<DashboardColumn
							key={column.id}
							column={column}
							handleRemoveColumn={handleRemoveColumn}
							handleUpdateColumn={handleUpdateColumn}
							showEditColumnForm={(column: Column) => {
								setColumnToEdit(column);
								showModal();
							}}
						/>
					);
				})}
			<button
				className={`min-w-[132px] h-fit border-2 border-white bg-transparent text-white rounded-lg text-sm p-3 cursor-pointer hover:brightness-90 sm:mt-3`}
				onClick={() => showModal()}
			>
				+ Add column
			</button>

			<ColumnForm
				showModal={isModalOpen}
				closeModal={() => closeModal()}
				handleAddColumn={handleAddColumn}
				handleUpdateColumn={handleUpdateColumn}
				columnToEdit={columnToEdit}
			/>
		</main>
	);
};
