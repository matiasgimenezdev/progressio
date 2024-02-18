import { FunctionComponent, useState } from 'react';
import { Column } from '../../types/';
import { X, CaretDown, DotsSixVertical } from '@phosphor-icons/react';

type DashboardColumnProps = {
	column: Column;
};

export const DashboardColumn: FunctionComponent<DashboardColumnProps> = ({
	column,
}) => {
	const [isMinimized, setIsMinimized] = useState<boolean>(false);

	const { tasks, title, color } = column;
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
				<button className='absolute right-3 top-3'>
					<X size={18} weight='bold' />
				</button>
			</header>
			{!isMinimized &&
				tasks.map((task) => {
					const { id, title, description } = task;
					return (
						<article
							className={`p-4 border-2 min-h-[130px] rounded-lg relative`}
							key={id}
							style={{ borderColor: color }}
						>
							<h4 className='font-bold'>{title}</h4>
							<p className='text-sm py-2'>{description}</p>
							<button className='absolute right-4 top-4 cursor-grab'>
								<DotsSixVertical size={18} weight='bold' />
							</button>
						</article>
					);
				})}
		</section>
	);
};
