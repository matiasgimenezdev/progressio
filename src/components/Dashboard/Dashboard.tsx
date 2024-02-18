import { FunctionComponent, useState } from 'react';
import { Board, Column } from '../../types';
import { DashboardColumn } from './DashboardColumn';
import { CreateColumnForm } from '../Form/CreateColumnForm';

type DashboardProps = {
	currentBoard: Board;
	handleUpdateBoard: (board: Board) => void;
};

export const Dashboard: FunctionComponent<DashboardProps> = ({
	currentBoard,
	handleUpdateBoard,
}) => {
	const [showModal, setShowModal] = useState(false);

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

	return (
		<main className='flex flex-col md:flex-row gap-8 min-w-fit w-full pl-[60px] min-h-full h-auto p-8 pt-[85px] bg-background-color text-white'>
			{currentBoard.columns &&
				currentBoard.columns.map((column) => {
					return (
						<DashboardColumn
							key={column.id}
							column={column}
							handleRemoveColumn={handleRemoveColumn}
						/>
					);
				})}
			<button
				className={`mt-3 min-w-[132px] h-fit bg-secondary-color rounded-lg text-sm p-3 px-5 cursor-pointer hover:brightness-90`}
				onClick={() => setShowModal(!showModal)}
			>
				+ Add column
			</button>

			<CreateColumnForm
				showModal={showModal}
				closeModal={() => setShowModal(false)}
				handleAddColumn={handleAddColumn}
			/>
		</main>
	);
};
