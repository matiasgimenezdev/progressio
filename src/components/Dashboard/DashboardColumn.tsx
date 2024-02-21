import { FunctionComponent, useState } from 'react';
import { Column, Task } from '../../types/';
import { X, CaretDown, Plus } from '@phosphor-icons/react';
import { DashboardTask } from './DashboardTask';
import { useModal } from '../../hooks';
import { TaskForm } from '../Form/TaskForm';

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
	const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

	function handleCreateTask(task: Task) {
		const nextTasks = [...column.tasks, task];
		const nextColumn = { ...column, tasks: nextTasks };
		handleUpdateColumn(nextColumn);
		closeModal();
	}

	function handleDeleteTask(taskId: string) {
		const nextTasks = column.tasks.filter(
			(currentTask) => currentTask.id !== taskId
		);
		const nextColumn = { ...column, tasks: nextTasks };
		handleUpdateColumn(nextColumn);
	}

	function handleUpdateTask(task: Task) {
		const nextTasks = column.tasks.map((currentTask) =>
			currentTask.id === task.id ? task : currentTask
		);
		const nextColumn = { ...column, tasks: nextTasks };
		handleUpdateColumn(nextColumn);
		setTaskToEdit(null);
		closeModal();
	}

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
							showEditTaskForm={(task: Task) => {
								setTaskToEdit(task);
								showModal();
							}}
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
			<TaskForm
				showModal={isModalOpen}
				closeModal={() => {
					closeModal();
					setTaskToEdit(null);
				}}
				handleCreateTask={handleCreateTask}
				handleUpdateTask={handleUpdateTask}
				taskToEdit={taskToEdit}
			/>
		</section>
	);
};
