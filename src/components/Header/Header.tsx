import { FunctionComponent } from 'react';

type HeaderProps = {
	boardName: string;
};

export const Header: FunctionComponent<HeaderProps> = ({ boardName }) => {
	return (
		<header className='flex items-center bg-primary-color min-h-[80px] text-white'>
			<h1 className='w-fit pl-4 inline-flex items-center text-[28px]  '>
				<img
					className='inline-block w-8 h-8'
					src='icons/grid.svg'
					alt='Progressio Logo'
				/>
				<span className='pl-2 hidden sm:inline-block'>Progressio</span>
			</h1>
			<p className='inline-block w-full font-medium text-lg text-center'>
				{boardName}
			</p>
		</header>
	);
};
