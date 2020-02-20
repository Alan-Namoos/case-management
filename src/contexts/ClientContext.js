import React, { useState, createContext, useEffect } from 'react';
import firebase from '../firebase';
import { db } from '../firebase';

export const ClientContext = createContext();

const ClientContextProvider = (props) => {
	const [isNewClient, setIsNewClient] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isUpdated, setIsUpdated] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [currentClientID, setCurrentClientID] = useState('');
	// const [currentClient, setCurrentClient] = useState(null);
	const [clients, setClients] = useState([]);
	// const [lastAddedClient, setLastAddedClient] = useState({});
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
		setIsNewClient(true);
	};

	const updateClientInformation = (itemToUpdate, newInformation, id) => {
		db.collection('clients')
			.doc(id)
			.update({
				// contactInformation: newContactInformation
				[itemToUpdate]: newInformation
			})
			.then(() => {
				setIsUpdated(true);
				console.log('ClientContext -> Information was UPDATED!');
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const updateMedicalCriminalHistory = (itemToUpdate, newInformation, id) => {
		db.collection('clients')
			.doc(id)
			.update({
				[itemToUpdate]: firebase.firestore.FieldValue.arrayUnion(newInformation)
			})
			.then(() => {
				setIsUpdated(true);
				console.log('ClientContext -> Information was UPDATED!');
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const deleteClient = (id) => {
		db.collection('clients')
			.doc(id)
			.delete()
			.then(() => {
				console.log('Clients was deleted');
				setRefresh(true);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	// [1] Add New Client to Firestore
	useEffect(() => {
		if (isNewClient) {
			console.log('ClientContext -> useEffect [1] ADD CLIENT STARTED');
			db.collection('clients')
				.add(client)
				.then((docRef) => {
					// console.log('document reference ID: ', docRef.id);
					console.log('ClientContext - useEffect [1] ->  ADD NEW CLIENT promise');
					setCurrentClientID(docRef.id); // set currentID to the document ID from Firestore
					console.log('New Client Added!');
					setIsNewClient(false);
				})
				.catch((error) => {
					console.log('Failed to add New Client');
					console.log('Error Message: ', error.message);
				});
		}
	}, [client, isNewClient]);

	// [2] tracks client and gets all Firestore clients documents
	useEffect(() => {
		setIsLoading(true);
		// db.collection('clients')
		// 	.get()
		// 	.then((snapshot) => {
		// 		const data = snapshot.docs.map((doc) => {
		// 			return { ...doc.data(), id: doc.id };
		// 		});
		// 		// console.log('data: ', data);
		// 		console.log('ClientContext - useEffect [2] ->  GET ALL CLIENTS');
		// 		setClients(data);
		// 		setIsLoading(false);
		// 		setIsUpdated(false);
		// 		setRefresh(false);
		//   });

		const unsubscribe = db.collection('clients').onSnapshot(
			(querySnapshot) => {
				const clients = [];
				querySnapshot.forEach((doc) => {
					clients.push({ ...doc.data(), id: doc.id });
				});
				setClients(clients);
				setIsLoading(false);
				setIsUpdated(false);
				setRefresh(false);
			},
			(error) => {
				console.log(error.message);
			}
		);

		return () => {
			unsubscribe();
		};
	}, [isUpdated, refresh]);

	console.count('ClientContext RENDERED');

	return (
		<ClientContext.Provider
			value={{
				client,
				currentClientID,
				// currentClient,
				clients,
				isLoading,
				// newClient,
				CreateNewClient,
				// lastAddedClient,
				// addPersonalInformation,
				// addContactInformation,
				// addImmigrationInformation,
				// addMedicalHistory,
				// addCriminalHistory,
				updateClientInformation,
				updateMedicalCriminalHistory,
				deleteClient
			}}
		>
			{props.children}
		</ClientContext.Provider>
	);
};

export default ClientContextProvider;
