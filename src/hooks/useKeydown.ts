import { useEffect } from 'react';

export function useKeydown(key: string, userHandler: () => void) {
	useEffect(() => {
		function keyDownHandler(event: KeyboardEvent) {
			if (event.key === key) {
				userHandler();
			}
		}

		window.addEventListener('keydown', keyDownHandler);

		return () => {
			window.removeEventListener('keydown', keyDownHandler);
		};
	}, [key, userHandler]);
}
