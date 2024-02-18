import { FunctionComponent, useState } from 'react';
import { Column } from '../../types/';
import { X, CaretDown } from '@phosphor-icons/react';
import { DashboardTask } from './DashboardTasks';

type DashboardColumnProps = {
	column: Column;
	handleRemoveColumn: (columnId: string) => void;
};

export const DashboardColumn: FunctionComponent<DashboardColumnProps> = ({
	column,
	handleRemoveColumn,
}) => {
	const [isMinimized, setIsMinimized] = useState<boolean>(false);

	const { id, tasks, title, color } = column;
	return (
		<section className='min-w-[300px] flex gap-4 flex-col'>
			<header
				className={`p-2 w-full border-2 rounded-lg mt-2 relative`}
				style={{ borderColor: color }}
			>
				<button
					className='absolute right-10 top-3'
					onClick={() => setIsMinimized(!isMinimized)}
				>
					<CaretDown
						size={18}
						weight='bold'
						className={!isMinimized ? 'rotate-180' : 'rotate-0'}
					/>
				</button>
				<h3 style={{ color: color }} className='font-bold text-lg'>
					{title.toUpperCase()}
				</h3>
				<button
					className='absolute right-3 top-3'
					onClick={() => handleRemoveColumn(id)}
				>
					<X size={18} weight='bold' />
				</button>
			</header>
			{!isMinimized &&
				tasks.map((task) => {
					return (
						<DashboardTask
							key={task.id}
							task={task}
							color={color}
						/>
					);
				})}
		</section>
	);
};
