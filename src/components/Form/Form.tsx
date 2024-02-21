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
			className='relative flex bottom-6 flex-col gap-2 bg-primary-color p-3 text-white rounded-lg sm:p-8 sm:w-[420px] sm:h-75'
		>
			{children}
		</form>
	);
};
