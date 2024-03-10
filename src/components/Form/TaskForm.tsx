import { Modal } from '..';
import { Form } from './Form';
import { FunctionComponent, useEffect, useState } from 'react';
import { Task } from '../../types';
import { getUUID } from '../../utils';
import { X } from '@phosphor-icons/react';

type CreateTaskFormProps = {
	showModal: boolean;
	closeModal: () => void;
	taskToEdit: Task | null;
	handleCreateTask: (task: Task) => void;
	handleUpdateTask: (task: Task) => void;
};

export const TaskForm: FunctionComponent<CreateTaskFormProps> = ({
	showModal,
	closeModal,
	handleCreateTask,
	taskToEdit,
	handleUpdateTask,
}) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [labels, setLabels] = useState<string[]>([]);
	const [currentLabel, setCurrentLabel] = useState<string>('');
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	function resetForm() {
		setTitle('');
		setLabels([]);
		setDescription('');
		setCurrentLabel('');
		setErrorMessage(null);
	}

	useEffect(() => {
		if (taskToEdit) {
			const { title, description, labels } = taskToEdit;
			setTitle(title);
			setDescription(description);
			setLabels(labels);
		}
	}, [taskToEdit]);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!title.trim()) {
			setErrorMessage("Task title can't be empty");
			return;
		}

		if (taskToEdit) {
			const updatedTask: Task = {
				...taskToEdit,
				title,
				description,
				labels,
			};
			handleUpdateTask(updatedTask);
		} else {
			const newTask: Task = {
				id: getUUID(),
				title,
				description,
				labels,
				createdAt: new Date().toISOString(),
			};
			handleCreateTask(newTask);
		}

		resetForm();
	}

	return (
		<Modal
			isOpen={showModal}
			closeModal={() => {
				closeModal();
				resetForm();
			}}
		>
			<Form handleSubmit={handleSubmit} errorMessage={errorMessage}>
				<h3 className='text-lg font-bold'>Create task</h3>
				<label htmlFor='task-title' className='text-sm'>
					Title
				</label>
				<input
					type='text'
					id='task-title'
					name='task-title'
					maxLength={30}
					value={title}
					className='bg-transparent border border-white rounded-md p-2 focus:outline-none focus-within:border-2'
					onChange={(event) => setTitle(event.target.value)}
					autoComplete='off'
				/>
				<label htmlFor='task-label' className='text-sm'>
					Labels{' '}
					<span className='inline-block ml-1 text-xs text-gray-400'>
						(max. 2)
					</span>
				</label>
				<p>
					<input
						type='text'
						id='task-label'
						name='task-label'
						value={currentLabel}
						maxLength={12}
						className='bg-transparent border border-white rounded-md w-3/5 p-2 focus:outline-none focus-within:border-2'
						onChange={(event) =>
							setCurrentLabel(event.target.value)
						}
						autoComplete='off'
					/>
					<button
						type='button'
						className='bg-secondary-color w-fit p-2 px-4 text-sm inline-block ml-4 rounded-md'
						onClick={() => {
							if (
								labels.length === 2 ||
								taskToEdit?.labels.length === 2
							) {
								setErrorMessage('Maximum 2 labels allowed');
								return;
							}

							if (currentLabel.trim() === '') {
								setErrorMessage("Label can't be empty");
								return;
							}

							setLabels([...labels, currentLabel.trim()]);
							setCurrentLabel('');
							setErrorMessage(null);
						}}
					>
						Add label
					</button>
				</p>
				<p className='flex gap-1 mt-1'>
					{labels.map((label) => (
						<span
							key={label}
							className='text-[10px] text-white p-1 px-3 rounded-xl flex items-center gap-1'
							style={{ backgroundColor: '#4B5563' }}
						>
							{label}
							<button
								onClick={() => {
									if (taskToEdit) {
										const nextLabels =
											taskToEdit.labels.filter(
												(currentLabel) =>
													currentLabel !== label
											);
										setLabels(nextLabels);
									} else {
										const nextLabels = labels.filter(
											(currentLabel) =>
												currentLabel !== label
										);
										setLabels(nextLabels);
									}
								}}
							>
								<X size={10} />
							</button>
						</span>
					))}
				</p>
				<label htmlFor='task-description' className='text-sm'>
					Description
				</label>
				<textarea
					id='task-description'
					className='resize-none bg-transparent border border-white rounded-md p-2 focus:outline-none focus-within:border-2'
					name='task-description'
					cols={30}
					rows={4}
					maxLength={60}
					value={description}
					onChange={(event) => setDescription(event.target.value)}
				/>
				<input
					type='submit'
					className='font-medium mt-4 bg-secondary-color py-2 rounded-md cursor-pointer hover:brightness-90'
					value={taskToEdit ? `Update task` : `Create task`}
				/>
				<button
					className='font-medium rounded-full hover:bg-white hover:bg-opacity-15 transition-colors duration-150 p-1 absolute top-4 right-0'
					onClick={() => {
						closeModal();
						resetForm();
					}}
				>
					<X size={16} weight='bold' />
				</button>
			</Form>
		</Modal>
	);
};
