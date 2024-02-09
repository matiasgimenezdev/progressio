import { FunctionComponent, useState } from 'react';
import { Board } from '../../types';
import { CaretDoubleRight, Cube } from '@phosphor-icons/react';

type BoardSelectorProps = {
	boards: Board[];
	currentBoardId: string;
	handleBoardSelect: (board: Board) => void;
};

export const BoardSelector: FunctionComponent<BoardSelectorProps> = ({
	boards,
	currentBoardId,
	handleBoardSelect,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<aside
			className={`absolute h-[calc(100%-80px)] ${
				isOpen ? 'w-[200px]' : 'w-[40px]'
			} bg-primary-color left-0 top-[80px] text-white`}
		>
			<nav className={`w-full ${isOpen ? 'text-right' : 'text-center'} `}>
				<button
					className={`mt-4 mr-1 cursor-pointer ${
						isOpen && 'rotate-180 mr-3'
					}`}
					onClick={() => setIsOpen(!isOpen)}
				>
					<CaretDoubleRight size={14} weight='bold' />
				</button>
				<ul
					className={`transition-all mt-4 ${
						isOpen
							? 'block translate-x-0  w-[200px] opacity-1'
							: 'hidden opacity-0 -translate-x-[500px] '
					}`}
				>
					{boards.map((board) => {
						const { name, id } = board;
						return (
							<li
								className={`text-left mt-1 h-[60px] flex items-center gap-2 pl-1.5 ${
									currentBoardId === id
										? 'bg-secondary-color rounded-r-full'
										: 'hover:opacity-70 hover:bg-secondary-color rounded-r-full cursor-pointer '
								}`}
								key={id}
								onClick={() => handleBoardSelect(board)}
							>
								<Cube size={22} weight='light' />
								{name}
							</li>
						);
					})}
				</ul>
			</nav>
		</aside>
	);
};
