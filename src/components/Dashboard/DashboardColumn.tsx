import { FunctionComponent, useState } from 'react';
import { Column, Task } from '../../types/';
import { X, Plus, PencilSimple } from '@phosphor-icons/react';
import { DashboardTask } from './DashboardTask';
import { useModal } from '../../hooks';
import { TaskForm } from '../Form/TaskForm';
import { useDroppable } from '@dnd-kit/core';

type DashboardColumnProps = {
	column: Column;
	handleRemoveColumn: (columnId: string) => void;
	handleUpdateColumn: (column: Column) => void;
	showEditColumnForm: (column: Column) => void;
};

export const DashboardColumn: FunctionComponent<DashboardColumnProps> = ({
	column,
	handleRemoveColumn,
	handleUpdateColumn,
	showEditColumnForm,
}) => {
	const [isMinimized, setIsMinimized] = useState<boolean>(false);
	const [isModalOpen, showModal, closeModal] = useModal();
	const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

	const { isOver, setNodeRef } = useDroppable({ id: column.id });

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
		<section
			ref={setNodeRef}
			className={`min-w-[300px] max-w-[min(400px,100vw)] sm:max-w-[min(550px,100vw)] md:max-w-[300px] flex gap-4 flex-col ${
				isOver && `bg-gray-800`
			} p-2 rounded-lg mt-2 relative`}
		>
			<header
				className={`p-2 w-full border-2 rounded-lg mt-2 relative cursor-pointer`}
				style={{ borderColor: color }}
				onClick={() => setIsMinimized(!isMinimized)}
			>
				<h3 style={{ color: color }} className='font-bold text-lg'>
					{title.toUpperCase()}
				</h3>
				<button
					className='absolute right-10 top-3 group'
					onClick={() => showEditColumnForm(column)}
				>
					<PencilSimple
						size={18}
						weight='bold'
						className='group-hover:text-gray-300'
					/>
				</button>
				<button
					className='absolute right-3 top-3 group'
					onClick={() => {
						handleRemoveColumn(id);
					}}
				>
					<X
						size={18}
						weight='bold'
						className='group-hover:text-red-500'
					/>
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
