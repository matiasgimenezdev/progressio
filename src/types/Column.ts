import { Task } from './Task';

export type Column = {
	id: string;
	title: string;
	color: string;
	tasks: Task[];
};
