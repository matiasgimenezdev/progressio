import { FunctionComponent } from 'react';
import { Board } from '../../types';
import { DashboardColumn } from './DashboardColumn';

type DashboardProps = {
	currentBoard: Board;
	handleUpdateBoard: (board: Board) => void;
};

export const Dashboard: FunctionComponent<DashboardProps> = ({
	currentBoard,
	handleUpdateBoard,
}) => {
	function handleRemoveColumn(columnId: string) {
		const nextColumns = currentBoard?.columns.filter(
			(column) => column.id !== columnId
		);

		handleUpdateBoard({
			...currentBoard,
			columns: nextColumns ?? [],
		});
	}

	return (
		<main className='flex gap-8 min-w-fit w-full pl-[60px] min-h-full h-auto p-8 pt-[100px] bg-background-color text-white'>
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
				className={`mt-3 h-fit bg-secondary-color rounded-lg text-sm p-3 px-5 cursor-pointer hover:brightness-90`}
			>
				+ Add column
			</button>
		</main>
	);
};
