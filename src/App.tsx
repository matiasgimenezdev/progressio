import { useState } from 'react';
import { Board, Header, BoardSelector } from './components';
import { Board as BoardType } from './types';

function App() {
	const [userBoards, setUserBoards] = useState<BoardType[]>([
		{
			id: '1',
			name: 'Board 1',
		},
		{
			id: '2',
			name: 'Board 2',
		},
	]);

	const [currentBoard, setCurrentBoard] = useState<BoardType | undefined>(
		userBoards[0] ?? undefined
	);

	function handleBoardSelect(board: BoardType) {
		setCurrentBoard(board);
	}

	function handleCreateBoard(newBoard: BoardType) {
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

	return (
		<>
			<Header
				boardName={currentBoard?.name}
				handleDeleteBoard={handleDeleteBoard}
			/>
			<Board />
			<BoardSelector
				boards={userBoards}
				currentBoardId={currentBoard?.id}
				handleBoardSelect={handleBoardSelect}
				handleCreateBoard={handleCreateBoard}
			/>
		</>
	);
}

export default App;
