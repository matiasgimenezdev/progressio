import { FunctionComponent } from 'react';
import { Board } from '../../types';

type DashboardProps = {
	currentBoard: Board | undefined;
};

export const Dashboard: FunctionComponent<DashboardProps> = ({
	currentBoard,
}) => {
	return (
		<main className=' w-full h-[calc(100%-80px)] bg-background-color'>
			{currentBoard && JSON.stringify(currentBoard)}
		</main>
	);
};
