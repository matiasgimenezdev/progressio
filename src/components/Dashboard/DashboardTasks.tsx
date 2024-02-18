import { FunctionComponent } from 'react';
import { Task } from '../../types/';
import { DotsSixVertical } from '@phosphor-icons/react';

type DashboardTaskProps = {
	task: Task;
	color: string;
};

export const DashboardTask: FunctionComponent<DashboardTaskProps> = ({
	task,
	color,
}) => {
	const { title, description } = task;
	return (
		<article
			className={`p-4 border-2 min-h-[130px] rounded-lg relative`}
			style={{ borderColor: color }}
		>
			<h4 className='font-bold'>{title}</h4>
			<p className='text-sm py-2'>{description}</p>
			<button className='absolute right-4 top-4 cursor-grab'>
				<DotsSixVertical size={18} weight='bold' />
			</button>
		</article>
	);
};
