import React, { FunctionComponent } from 'react';

type FormProps = {
	children: React.ReactNode;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	errorMessage: string | null;
};

export const Form: FunctionComponent<FormProps> = ({
	handleSubmit,
	children,
	errorMessage,
}) => {
	return (
		<form
			onSubmit={handleSubmit}
			className='relative flex flex-col gap-2 bg-primary-color p-3 py-0 text-white rounded-lg sm:p-8 sm:py-0  sm:w-[420px] sm:h-75'
		>
			{errorMessage && (
				<p className='relative w-[200px] ml-auto mr-auto sm:w-[320px] sm:max-w-[320px] -top-5 rounded-t-none p-2 px-2 rounded-md bg-red-700 font-semibold text-center text-xs'>
					{errorMessage}
				</p>
			)}
			{children}
		</form>
	);
};
