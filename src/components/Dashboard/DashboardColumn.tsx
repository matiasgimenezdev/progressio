import { FunctionComponent, useState } from 'react';
import { Column, Task } from '../../types/';
import { X, CaretDown, Plus } from '@phosphor-icons/react';
import { DashboardTask } from './DashboardTask';
import { useModal } from '../../hooks';
import { CreateTaskForm } from '../Form/CreateTaskForm';

type DashboardColumnProps = {
	column: Column;
	handleRemoveColumn: (columnId: string) => void;
	handleUpdateColumn: (column: Column) => void;
};

export const DashboardColumn: FunctionComponent<DashboardColumnProps> = ({
	column,
	handleRemoveColumn,
	handleUpdateColumn,
}) => {
	const [isMinimized, setIsMinimized] = useState<boolean>(false);
	const [isModalOpen, showModal, closeModal] = useModal();

	function handleCreateTask(task: Task) {
		const nextTasks = [...column.tasks, task];
		const nextColumn = { ...column, tasks: nextTasks };
		handleUpdateColumn(nextColumn);
		closeModal();
	}

	function handleDeleteTask(taskId: string) {
		const nextTasks = column.tasks.filter((task) => task.id !== taskId);
		const nextColumn = { ...column, tasks: nextTasks };
		handleUpdateColumn(nextColumn);
	}

	// function handleUpdateTask(task: Task) {
	// 	const nextTasks = column.tasks.map((t) =>
	// 		t.id === task.id ? task : t
	// 	);
	// 	const nextColumn = { ...column, tasks: nextTasks };
	// 	handleUpdateColumn(nextColumn);
	// }

	const { id, tasks, title, color } = column;
	return (
		<section className='min-w-[300px] max-w-[min(400px,100vw)] sm:max-w-[min(550px,100vw)] md:max-w-[300px] flex gap-4 flex-col'>
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
							handleDeleteTask={handleDeleteTask}
						/>
					);
				})}
			<button
				className='w-full p-2 rounded-lg cursor-pointer hover:brightness-90 flex justify-center items-center gap-2 text-sm'
				onClick={() => showModal()}
				style={{ backgroundColor: color }}
			>
				Create task{' '}
				<Plus size={16} weight='bold' className='inline-block' />
			</button>
			<CreateTaskForm
				showModal={isModalOpen}
				closeModal={closeModal}
				handleCreateTask={handleCreateTask}
				handleUpdateTask={() => {}}
			/>
		</section>
	);
};
