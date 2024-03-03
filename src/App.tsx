import { useState } from 'react';
import { Dashboard, Header, BoardSelector } from './components';
import { Board, Task } from './types';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { getUUID } from './utils';

function App() {
	const [userBoards, setUserBoards] = useState<Board[]>([
		{
			id: '1',
			name: 'My board',
			columns: [
				{
					id: getUUID(),
					title: 'To Do',
					color: '#9564e4',
					tasks: [
						{
							id: getUUID(),
							title: 'Edit "About" page',
							description:
								'Add new team members and update contact information',
							labels: ['Frontend'],
							createdAt: '2021-01-01',
						},
					],
				},
				{
					id: getUUID(),
					title: 'In progress',
					color: '#f72585',
					tasks: [
						{
							id: getUUID(),
							title: 'Fix issues with payment gateway',
							description: 'Payments are not being processed',
							labels: ['Urgent'],
							createdAt: '2021-01-01',
						},
						{
							id: getUUID(),
							title: 'Update pricing page',
							description: 'Add new plans and update pricing',
							labels: [],
							createdAt: '2021-01-01',
						},
					],
				},
				{
					id: getUUID(),
					title: 'Done',
					color: '#4e9c66',
					tasks: [],
				},
			],
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
		let draggedTask: Task | null;
		if (!over) return;
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
				if (column.tasks.some((task) => task.id === draggedTask?.id))
					return column;

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
