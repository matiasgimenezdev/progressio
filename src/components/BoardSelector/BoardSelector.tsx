import { FunctionComponent, useState } from 'react';
import { Board } from '../../types';
import { useKeydown } from '../../hooks';
import { CreateBoardForm } from '../Form/CreateBoardForm';
import { CaretDoubleRight, Cube, SignOut, Plus } from '@phosphor-icons/react';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';

type BoardSelectorProps = {
	boards: Board[];
	currentBoardId: string | undefined;
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
	const [showModal, setShowModal] = useState<boolean>(false);
	useKeydown('Escape', () => setIsOpen(false));

	function handleBoardItemClick(board: Board) {
		if (board.id === currentBoardId) return;
		handleBoardSelect(board);
		setIsOpen(false);
	}

	function closeModal() {
		setShowModal(false);
	}

	return (
		<RemoveScroll enabled={isOpen}>
			<FocusLock disabled={!isOpen}>
				<aside
					className={`fixed h-[calc(100%-80px)] ${
						isOpen
							? 'w-[250px] max-w-[250px]'
							: 'w-[40px] max-w-[40px]'
					} bg-primary-color left-0 top-[80px] text-white transition-all duration-500`}
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
							onClick={() => {
								setIsOpen(!isOpen);
								setShowModal(false);
							}}
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
							{boards.length > 0 ? (
								boards.map((board) => {
									const { name, id } = board;
									return (
										<li
											className={`text-left w-[190px] mt-2 h-[60px] flex items-center gap-2 pl-1.5 ${
												currentBoardId === id
													? 'bg-secondary-color rounded-r-full'
													: 'hover:opacity-80 hover:bg-secondary-color rounded-r-full cursor-pointer'
											} ${
												!isOpen &&
												'translate-x-[-100%] opacity-0'
											}`}
											key={id}
											onClick={() =>
												handleBoardItemClick(board)
											}
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
								})
							) : (
								<li className='text-center font-medium'>
									No boards yet
								</li>
							)}
						</ul>
						<button
							className={`text-center min-w-[160px] opacity-1 ml-auto mr-auto  bg-secondary-color p-2 px-6 pr-5 mt-6 w-fit group transition-opacity duration-300 delay-150 ${
								!isOpen &&
								'translate-x-[-100%] text-transparent bg-transparent opacity-0'
							} block text-sm font-medium rounded-lg hover:brightness-90`}
							onClick={() => {
								setShowModal(true);
								setIsOpen(false);
							}}
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
				<CreateBoardForm
					showModal={showModal}
					closeModal={closeModal}
					handleBoardItemClick={handleBoardItemClick}
					handleCreateBoard={handleCreateBoard}
				/>
			</FocusLock>
		</RemoveScroll>
	);
};
