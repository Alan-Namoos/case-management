import React, { useState, createContext, useEffect } from 'react';
import uuid from 'uuid/v1';

export const ClientContext = createContext();

const ClientContextProvider = (props) => {
	const [clients, setClients] = useState([]);
	const [client, setClient] = useState({});
	const [lastAddedClient, setLastAddedClient] = useState({});

	const resetClient = () => {
		setClient({
			id: '',
			basicInformation: {
				firstName: '',
				lastName: '',
				mobilePhone: '',
				homePhone: '',
				email: '',
				mailingAddress: '',
				physicalAddress: '',
				aNumber: ''
			},
			personalInformation: {
				otherNamesUsed: '',
				dateOfBirth: '',
				countryOfBirth: '',
				countryOfResidence: '',
				nationalityAtBirth: '',
				currentNationality: '',
				maritalStatus: '',
				numberOfChildren: '',
				religionAndSect: '',
				raceEthnicityTribalGroup: '',
				languagesAndFluency: '',
				bestLanguage: '',
				employer: '',
				jobTitle: '',
				role: '',
				gender: ''
			},

			immigrationInformation: {
				status: {
					currentStatus: '',
					expirationDate: ''
				},
				passport: {
					issuingCountry: '',
					expirationDate: '',
					withClient: ''
				},
				lastVisitToUS: {
					dateOfEntry: '',
					portOfEntry: '',
					status: '',
					lawfulEntry: ''
				},
				detention: {
					isDetained: '',
					dateOfArrest: '',
					location: '',
					dateOfRelease: ''
				}
			},
			medicalHistory: [],
			criminalHistory: []
		});
	};

	const addBasicInformation = (newBasicInformation) => {
		setClients([...clients, { ...client, basicInformation: newBasicInformation, id: uuid() }]);
		resetClient();
	};

	const addPersonalInformation = (newPersonalInformation, id) => {
		const index = clients.findIndex((arrayClient) => {
			return arrayClient.id === id;
		});
		// I MIGHT NEED TO FIND A BETTER WAY TO UPDATE THE STATE (clients array)
		clients[index].personalInformation = newPersonalInformation;
	};

	// const addContactInformation = (newContactInformation, id) => {
	// 	setClients([...clients, { contactInformation: newContactInformation }]);
	// };

	const addImmigrationInformation = (newImmigrationInformation, id) => {
		const index = clients.findIndex((arrayClient) => {
			return arrayClient.id === id;
		});
		// I MIGHT NEED TO FIND A BETTER WAY TO UPDATE THE STATE (clients array)
		clients[index].immigrationInformation = newImmigrationInformation;
	};

	const addMedicalHistory = (newMedicalHistory, id) => {
		const index = clients.findIndex((arrayClient) => {
			return arrayClient.id === id;
		});
		// I MIGHT NEED TO FIND A BETTER WAY TO UPDATE THE STATE (clients array)
		clients[index].medicalHistory.push(newMedicalHistory);
	};

	const addCriminalHistory = (newCriminalHistory, id) => {
		const index = clients.findIndex((arrayClient) => {
			return arrayClient.id === id;
		});
		// I MIGHT NEED TO FIND A BETTER WAY TO UPDATE THE STATE (clients array)
		clients[index].criminalHistory.push(newCriminalHistory);
	};

	// const addBasicInformation = (newBasicInformation) => {
	// 	setClient({ ...client, basicInformation: newBasicInformation, id: uuid() });
	// };

	// const addPersonalInformation = (newPersonalInformation, id) => {
	// 	let index = clients.findIndex((client) => {
	// 		return client.id === id;
	// 	});
	// 	setClient({ ...clients[index], personalInformation: newPersonalInformation });
	// };

	// const addContactInformation = (newContactInformation) => {
	// 	setClient({ ...client, contactInformation: newContactInformation });
	// };

	// const addImmigrationInformation = (newImmigrationInformation) => {
	// 	setClient({ ...client, immigrationInformation: newImmigrationInformation });
	// };

	// const addMedicalHistory = (newMedicalHistory) => {
	// 	setClient({ ...client, medicalHistory: [...client.medicalHistory, newMedicalHistory] });
	// };

	// const addCriminalHistory = (newCriminalHistory) => {
	// 	setClient({ ...client, criminalHistory: [...client.criminalHistory, newCriminalHistory] });

	// Find the updated client in the clients array using client.id then find the index of that item.
	// useEffect(() => {
	// 	let index = clients.findIndex((arrayClient) => {
	// 		return arrayClient.id === client.id;
	// 	});
	// 	if (client.id === '' || client.id === clients[index].id) {
	// 		return;
	// 	}

	// 	setClients((clients) => {
	// 		return [...clients, client];
	// 	});
	// }, [client]);

	useEffect(() => {
		resetClient();
	}, []);

	// useEffect(() => {
	// 	console.log('ClientContext.js - clients: ', clients);
	// }, [clients]);

	useEffect(() => {
		if (clients.length > 0) {
			setLastAddedClient(clients[clients.length - 1]);
		}
	}, [clients]);

	return (
		<ClientContext.Provider
			value={{
				client,
				clients,
				lastAddedClient,
				addBasicInformation,
				addPersonalInformation,
				// addContactInformation,
				addImmigrationInformation,
				addMedicalHistory,
				addCriminalHistory
			}}
		>
			{props.children}
		</ClientContext.Provider>
	);
};

export default ClientContextProvider;
