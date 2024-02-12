import { FunctionComponent, useState } from 'react';
import { Board } from '../../types';
import { CaretDoubleRight, Cube, SignOut, Plus } from '@phosphor-icons/react';
import { getUUID } from '../../utils';

type BoardSelectorProps = {
	boards: Board[];
	currentBoardId: string;
	handleBoardSelect: (board: Board) => void;
	handleCreateBoard: (board: Board) => void;
};

export const BoardSelector: FunctionComponent<BoardSelectorProps> = ({
	boards,
	currentBoardId,
	handleBoardSelect,
	handleCreateBoard,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	function handleBoardItemClick(board: Board) {
		if (board.id === currentBoardId) return;
		handleBoardSelect(board);
		setIsOpen(false);
	}

	function handleCreateBoardClick() {
		// TODO - Implement this function with a modal
		const newBoard = {
			id: getUUID(),
			name: `Board 3`,
		};
		handleCreateBoard(newBoard);
		handleBoardItemClick(newBoard);
	}

	return (
		<aside
			className={`absolute h-[calc(100%-80px)] ${
				isOpen
					? 'w-[250px] animate-openmenu'
					: 'w-[40px] animate-closemenu'
			} bg-primary-color left-0 top-[80px] text-white`}
		>
			<nav
				className={`w-full h-full relative ${
					isOpen ? 'text-right' : 'text-center'
				} `}
			>
				<button
					className={`h-10 w-10 mt-4 cursor-pointer ${
						isOpen && 'rotate-180 mr-3 right-0'
					} `}
					onClick={() => setIsOpen(!isOpen)}
				>
					<CaretDoubleRight
						size={14}
						weight='bold'
						className='ml-auto mr-auto'
					/>
				</button>
				<ul
					className={`transition-transform mt-2 h-auto ${
						isOpen
							? 'w-[230px] opacity-1 animate-openmenuitems'
							: 'w-0 opacity-0 animate-closemenuitems'
					}`}
				>
					{boards.map((board) => {
						const { name, id } = board;
						return (
							<li
								className={`text-left w-[190px] mt-2 h-[60px] flex items-center gap-2 pl-1.5 ${
									currentBoardId === id
										? 'bg-secondary-color rounded-r-full'
										: 'hover:opacity-80 hover:bg-secondary-color rounded-r-full cursor-pointer'
								} ${!isOpen && 'hidden'}`}
								key={id}
								onClick={() => handleBoardItemClick(board)}
								onKeyDown={(event) =>
									event.key === 'Enter' &&
									handleBoardItemClick(board)
								}
								tabIndex={0}
							>
								<Cube size={22} weight='light' />
								{name}
							</li>
						);
					})}
				</ul>
				<button
					className={`text-center ml-auto mr-auto block text-sm font-medium rounded-lg bg-secondary-color p-2 px-6 pr-5 mt-6 w-fit ${
						!isOpen && 'hidden'
					} hover:brightness-90 group animate-opacity`}
					onClick={() => handleCreateBoardClick()}
				>
					New board{' '}
					<Plus
						size={14}
						weight='bold'
						className='inline-block ml-1 relative group:hover:cursor-pointer'
					/>
				</button>
				<button
					className={`absolute bottom-8 left-4 group ${
						!isOpen && 'hidden'
					}`}
				>
					Logout{' '}
					<SignOut
						size={28}
						className='inline-block ml-1 relative bottom-0.5 group-hover:fill-red-600'
					/>
				</button>
			</nav>
		</aside>
	);
};
