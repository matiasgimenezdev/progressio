import { useState } from 'react';
import { Dashboard, Header, BoardSelector } from './components';
import { Board } from './types';

function App() {
	const [userBoards, setUserBoards] = useState<Board[]>([
		{
			id: '1',
			name: 'Board 1',
			columns: [
				{
					id: '1',
					title: 'Column 1',
					color: '#4404ac',
					tasks: [
						{
							id: '1',
							title: 'Task 1',
							description: 'Description 1',
							assignee: 'User 1',
							createdAt: '2021-01-01',
						},
					],
				},
				{
					id: '2',
					title: 'Column 2',
					color: '#f72585',
					tasks: [
						{
							id: '1',
							title: 'Task 1',
							description: 'Description 1',
							assignee: 'User 1',
							labels: ['Label 1', 'Label 2'],
							createdAt: '2021-01-01',
						},
						{
							id: '2',
							title: 'Task 2',
							description: 'Description 2',
							assignee: 'User 1',
							createdAt: '2021-01-01',
						},
					],
				},
			],
		},
		{
			id: '2',
			name: 'Board 2',
			columns: [],
		},
	]);

	const [currentBoard, setCurrentBoard] = useState<Board | undefined>(
		userBoards[0] ?? undefined
	);

	function handleBoardSelect(board: Board) {
		setCurrentBoard(board);
	}

	function handleCreateBoard(newBoard: Board) {
		const nextBoards = [...userBoards, newBoard];
		setUserBoards(nextBoards);
	}

	function handleDeleteBoard() {
		const nextBoards = userBoards.filter(
			(board) => currentBoard?.id !== board.id
		);
		setCurrentBoard(nextBoards[0]);
		setUserBoards(nextBoards);
	}

	function handleUpdateBoard(board: Board) {
		const nextBoards = userBoards.map((b) =>
			b.id === board.id ? board : b
		);

		setUserBoards(nextBoards);
		setCurrentBoard(board);
	}

	return (
		<>
			<Header
				boardName={currentBoard?.name}
				handleDeleteBoard={handleDeleteBoard}
			/>
			{currentBoard ? (
				<Dashboard
					currentBoard={currentBoard}
					handleUpdateBoard={handleUpdateBoard}
				/>
			) : (
				<p className='w-full mt-48 pl-6 text-lg font-bold text-white text-center absolute top-[100px] lg:text-3xl'>
					No board selected
				</p>
			)}
			<BoardSelector
				boards={userBoards}
				currentBoardId={currentBoard?.id ?? undefined}
				handleBoardSelect={handleBoardSelect}
				handleCreateBoard={handleCreateBoard}
			/>
		</>
	);
}

export default App;
