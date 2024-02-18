export type Task = {
	id: string;
	title: string;
	labels?: string[];
	description: string;
	assignee: string;
	createdAt: string;
};
