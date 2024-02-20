import { FunctionComponent } from 'react';
import { TrashSimple } from '@phosphor-icons/react';

type HeaderProps = {
	boardName: string | undefined;
	handleDeleteBoard: () => void;
};

export const Header: FunctionComponent<HeaderProps> = ({
	boardName,
	handleDeleteBoard,
}) => {
	return (
		<header className='z-50 flex items-center bg-primary-color min-h-[80px] text-white w-full fixed'>
			<h1 className='min-w-fit pl-4 inline-flex items-center text-[28px]'>
				<img
					className='inline-block w-8 h-8'
					src='icons/grid.svg'
					alt='Progressio Logo'
				/>
				<span className='pl-2 hidden sm:inline-block'>Progressio</span>
			</h1>
			{boardName && (
				<h2 className='inline-block w-full font-medium text-lg text-center pr-12 sm:pr-28 group'>
					{boardName}
					<button
						onClick={() => {
							handleDeleteBoard();
						}}
					>
						<TrashSimple
							size={20}
							className='hover:text-red-500 relative top-1 left-3'
							weight='bold'
						/>
					</button>
				</h2>
			)}
		</header>
	);
};
