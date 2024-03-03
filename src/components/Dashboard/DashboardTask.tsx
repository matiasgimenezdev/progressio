import { FunctionComponent } from 'react';
import { Task } from '../../types';
import {
	DotsSixVertical,
	TrashSimple,
	PencilSimple,
} from '@phosphor-icons/react';
import { useDraggable } from '@dnd-kit/core';

type DashboardTaskProps = {
	task: Task;
	color: string;
	handleDeleteTask: (taskId: string) => void;
	showEditTaskForm: (task: Task) => void;
};

export const DashboardTask: FunctionComponent<DashboardTaskProps> = ({
	task,
	color,
	handleDeleteTask,
	showEditTaskForm,
}) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: `${task.id}`,
	});

	const dragging = {
		transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
		backgroundColor: '#000',
		zIndex: 1000,
	};

	const style = transform ? dragging : undefined;

	const { id, title, description, labels } = task;

	return (
		<article
			className={`p-4 border-2 min-h-[130px] max-w-[min(400px,100vw)] sm:max-w-[min(550px,100vw)] md:max-w-[300px] rounded-lg relative`}
			style={{ borderColor: color, ...style }}
			ref={setNodeRef}
		>
			<h4
				className='font-bold cursor-pointer'
				onClick={() => showEditTaskForm(task)}
			>
				{title}
			</h4>
			<p
				className='text-sm py-2 max-w-full cursor-pointer'
				onClick={() => showEditTaskForm(task)}
			>
				{description}
			</p>
			{
				<p className='flex gap-2 mt-2'>
					{labels.map((label) => {
						const labelText =
							label.trim().charAt(0).toUpperCase() +
							label.trim().toLowerCase().slice(1);

						return (
							<span
								key={label}
								className='text-[11px] text-white p-1 px-3 rounded-xl'
								style={{ backgroundColor: color }}
							>
								{labelText}
							</span>
						);
					})}
				</p>
			}

			<button
				className='absolute right-4 top-4 cursor-grab'
				{...listeners}
				{...attributes}
			>
				<DotsSixVertical size={18} weight='bold' />
			</button>
			<button
				className='absolute bottom-4 right-4 group'
				onClick={() => handleDeleteTask(id)}
			>
				<TrashSimple
					size={18}
					weight='bold'
					className='group-hover:text-red-500'
				/>
			</button>
			<button
				className='absolute bottom-12 right-4 group'
				onClick={() => showEditTaskForm(task)}
			>
				<PencilSimple
					size={18}
					weight='bold'
					className='group-hover:text-gray-300'
				/>
			</button>
		</article>
	);
};
