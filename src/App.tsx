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

	const [currentBoard, setCurrentBoard] = useState<BoardType>(userBoards[0]);

	function handleBoardSelect(board: BoardType) {
		setCurrentBoard(board);
	}

	return (
		<>
			<Header boardName={currentBoard.name} />
			<Board />
			<BoardSelector
				boards={userBoards}
				currentBoardId={currentBoard.id}
				handleBoardSelect={handleBoardSelect}
			/>
		</>
	);
}

export default App;
