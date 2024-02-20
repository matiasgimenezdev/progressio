import { FunctionComponent } from 'react';
import { Task } from '../../types';
import { DotsSixVertical, TrashSimple } from '@phosphor-icons/react';

type DashboardTaskProps = {
	task: Task;
	color: string;
	handleDeleteTask: (taskId: string) => void;
};

export const DashboardTask: FunctionComponent<DashboardTaskProps> = ({
	task,
	color,
	handleDeleteTask,
}) => {
	const { id, title, description, labels } = task;
	return (
		<article
			className={`p-4 border-2 min-h-[130px] max-w-[300px] rounded-lg relative`}
			style={{ borderColor: color }}
		>
			<h4 className='font-bold'>{title}</h4>
			<p className='text-sm py-2 max-w-full'>{description}</p>
			{labels && (
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
			)}

			<button className='absolute right-4 top-4 cursor-grab'>
				<DotsSixVertical size={18} weight='bold' />
			</button>
			<button
				className='absolute bottom-4 right-4'
				onClick={() => handleDeleteTask(id)}
			>
				<TrashSimple size={18} weight='bold' />
			</button>
		</article>
	);
};
