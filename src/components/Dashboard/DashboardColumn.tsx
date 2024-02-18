import { FunctionComponent } from 'react';
import { Column } from '../../types/';

type DashboardColumnProps = {
	column: Column;
};

export const DashboardColumn: FunctionComponent<DashboardColumnProps> = ({
	column,
}) => {
	const { tasks, title, color = 'white' } = column;
	return (
		<section className='min-w-[250px]'>
			<header className='py-2 w-full px-1 font-bold'>
				<h3>{title}</h3>
			</header>
			{tasks.map((task) => {
				const { id, title } = task;
				return (
					<article
						className={`p-4 border-2 border-${color} min-h-[100px] rounded-lg`}
						key={id}
					>
						{title}
					</article>
				);
			})}
		</section>
	);
};
