import React, { FunctionComponent } from 'react';

type FormProps = {
	children: React.ReactNode;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const Form: FunctionComponent<FormProps> = ({
	handleSubmit,
	children,
}) => {
	return (
		<form
			onSubmit={handleSubmit}
			className='relative flex flex-col gap-2 bg-primary-color p-5 text-white rounded-lg sm:p-8 sm:w-80 sm:h-75'
		>
			{children}
		</form>
	);
};
