import { useState } from 'react';

type useModalReturnTypes = [boolean, () => void, () => void];

export function useModal(): useModalReturnTypes {
	const [isModalOpen, setIsModalOpen] = useState(false);

	function showModal() {
		setIsModalOpen(true);
	}

	function closeModal() {
		setIsModalOpen(false);
	}

	return [isModalOpen, showModal, closeModal];
}
