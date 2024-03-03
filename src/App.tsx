import { useState } from 'react';
import { Dashboard, Header, BoardSelector } from './components';
import { Board, Task } from './types';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

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
							id: '1-1',
							title: 'Task 1',
							description: 'Description 1',
							labels: [],
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
							id: '2-1',
							title: 'Task 1',
							description: 'Description 1',
							labels: ['Label 1', 'Label 2'],
							createdAt: '2021-01-01',
						},
						{
							id: '2-2',
							title: 'Task 2',
							description: 'Description 2',
							labels: [],
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

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (!over) return;

		let draggedTask: Task | null;
		currentBoard?.columns.forEach((column) => {
			column.tasks.forEach((task) => {
				if (task.id === active.id) {
					draggedTask = { ...task };
				}
			});
		});

		const nextColumns = currentBoard?.columns.map((column) => {
			if (column.id !== over?.id) {
				const nextTasks = column.tasks.filter(
					(task) => task.id !== active.id
				);
				return { ...column, tasks: nextTasks };
			}

			if (column.id === over.id) {
				if (!draggedTask) return column;
				return { ...column, tasks: [...column.tasks, draggedTask] };
			}
		});

		const nextBoard = { ...currentBoard, columns: nextColumns ?? [] };

		handleUpdateBoard(nextBoard as Board);
	}

	return (
		<>
			<Header
				boardName={currentBoard?.name}
				handleDeleteBoard={handleDeleteBoard}
			/>
			{currentBoard ? (
				<DndContext onDragEnd={handleDragEnd}>
					<Dashboard
						currentBoard={currentBoard}
						handleUpdateBoard={handleUpdateBoard}
					/>
				</DndContext>
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
				handleUpdateBoard={handleUpdateBoard}
			/>
		</>
	);
}

export default App;
