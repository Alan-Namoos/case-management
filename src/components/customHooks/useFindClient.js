import { useState, useEffect } from 'react';

export const useFindClient = (clients, id, history) => {
	// const [clientFound, setClientFound] = useState(false);
	const [currentClient, setCurrentClient] = useState({});

	useEffect(() => {
		// setClientFound(false);
		if (clients.length === 0) {
			history.push('/');
			return;
		}
		const client = clients.find((arrayClient) => {
			return arrayClient.id === id;
		});
		if (client) {
			// setClientFound(true);
			setCurrentClient(client);
		}
	}, [clients, id, history]);
	return [currentClient];
};
