import { FunctionComponent } from 'react';
import { Board } from '../../types';
import { DashboardColumn } from './DashboardColumn';

type DashboardProps = {
	currentBoard: Board | undefined;
};

export const Dashboard: FunctionComponent<DashboardProps> = ({
	currentBoard,
}) => {
	return (
		<main className='flex gap-16 min-w-fit w-full pl-[60px] min-h-full h-auto p-8 pt-[100px] bg-background-color text-white'>
			{currentBoard?.columns.map((column) => {
				return <DashboardColumn key={column.id} column={column} />;
			})}
		</main>
	);
};
