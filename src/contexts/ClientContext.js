import React, { useState, createContext, useEffect } from 'react';
import uuid from 'uuid/v1';
// import firebase from '../firebase';
import { db } from '../firebase';

export const ClientContext = createContext();

const ClientContextProvider = (props) => {
	const [clients, setClients] = useState([]);
	const [client, setClient] = useState({
		personalInformation: {
			firstName: '',
			lastName: '',
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

		contactInformation: {
			mobilePhone: '',
			homePhone: '',
			email: '',
			mailingAddress: '',
			physicalAddress: ''
		},

		immigrationInformation: {
			status: {
				aNumber: '',
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
	const [lastAddedClient, setLastAddedClient] = useState({});

	const resetClient = () => {
		setClient({
			id: '',
			personalInformation: {
				firstName: '',
				lastName: '',
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

			contactInformation: {
				mobilePhone: '',
				homePhone: '',
				email: '',
				mailingAddress: '',
				physicalAddress: ''
			},

			immigrationInformation: {
				status: {
					aNumber: '',
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

	// const newClient = (
	// 	initialPersonalInformation,
	// 	initialContactInformation,
	// 	immigrationInformationStatus
	// ) => {
	// 	setClients([
	// 		...clients,
	// 		{
	// 			...client,
	// 			personalInformation: initialPersonalInformation,
	// 			contactInformation: initialContactInformation,
	// 			immigrationInformation: {
	// 				...client.immigrationInformation,
	// 				status: immigrationInformationStatus
	// 			},
	// 			id: uuid()
	// 		}
	// 	]);
	// };

	const addContactInformation = (newContactInformation, id) => {
		const index = clients.findIndex((arrayClient) => {
			return arrayClient.id === id;
		});
		// I MIGHT NEED TO FIND A BETTER WAY TO UPDATE THE STATE (clients array)
		clients[index].contactInformation = newContactInformation;
	};

	// const addBasicInformation = (newBasicInformation) => {
	// 	setClients([...clients, { ...client, basicInformation: newBasicInformation, id: uuid() }]);
	// 	resetClient();
	// };

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

	const CreateNewClient = (
		initialPersonalInformation,
		initialContactInformation,
		immigrationInformationStatus
	) => {
		setClient({
			...client,
			personalInformation: initialPersonalInformation,
			contactInformation: initialContactInformation,
			immigrationInformation: {
				...client.immigrationInformation,
				status: immigrationInformationStatus
			}
		});
	};

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

	// useEffect(() => {
	// 	resetClient();
	// }, []);

	// useEffect(() => {
	// 	console.log('ClientContext.js - clients: ', clients);
	// }, [clients]);

	useEffect(() => {
		if (client.personalInformation.firstName) {
			db.collection('clients')
				.add(client)
				.then((docRef) => {
					console.log('document reference ID: ', docRef.id);
				})
				.catch((error) => {
					console.log('Error Message: ', error.message);
				});
		}
	}, [client]);

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
				// newClient,
				CreateNewClient,
				lastAddedClient,
				addPersonalInformation,
				addContactInformation,
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
