import React, { useState, createContext, useEffect } from 'react';
import firebase from '../firebase';
import { db } from '../firebase';
// import { AuthContext } from './AuthContext';

export const ClientContext = createContext();

const ClientContextProvider = (props) => {
	// const { user } = useContext(AuthContext);
	const [isNewClient, setIsNewClient] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [currentClientID, setCurrentClientID] = useState(null);
	const [clients, setClients] = useState(null);
	const clientInitialValue = {
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
			gender: '',
		},

		contactInformation: {
			mobilePhone: '',
			homePhone: '',
			email: '',
			mailingAddress: '',
			physicalAddress: '',
		},

		immigrationInformation: {
			status: {
				aNumber: '',
				currentStatus: '',
				expirationDate: '',
			},
			passport: {
				issuingCountry: '',
				expirationDate: '',
				withClient: '',
			},
			lastVisitToUS: {
				dateOfEntry: '',
				portOfEntry: '',
				status: '',
				lawfulEntry: '',
			},
			detention: {
				isDetained: '',
				dateOfArrest: '',
				location: '',
				dateOfRelease: '',
			},
		},
		medicalHistory: [],
		criminalHistory: [],
		notes: [],
	};
	const [client, setClient] = useState(clientInitialValue);
	// const [appUser, setAppUser] = useState(user);

	console.log('**** ClientContext ****');

	// ==================== METHODS ============================
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
				status: immigrationInformationStatus,
			},
		});
		setIsNewClient(true);
	};

	// ---------------------------------------------------------------------------------------------------------

	const updateClientInformation = (itemToUpdate, newInformation, id) => {
		let updateOperation = {};
		if (
			itemToUpdate === 'contactInformation' ||
			itemToUpdate === 'personalInformation' ||
			itemToUpdate === 'immigrationInformation'
		) {
			updateOperation = { [itemToUpdate]: newInformation };
		} else {
			updateOperation = {
				[itemToUpdate]: firebase.firestore.FieldValue.arrayUnion(newInformation),
			};
		}
		db.collection('clients')
			.doc(id)
			.update(updateOperation)
			.then(() => {
				console.log('ClientContext -> Information was UPDATED!');
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	// ---------------------------------------------------------------------------------------------------------

	const updateClientMedicalCriminalNotes = (itemToUpdate, newInformation, id) => {
		db.collection('clients')
			.doc(id)
			.update({
				[itemToUpdate]: newInformation,
			})
			.then(() => {
				console.log(`ClientContext -> ${itemToUpdate} was UPDATED!`);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	// ---------------------------------------------------------------------------------------------------------

	const deleteClient = (id) => {
		if (window.confirm('Are you sure you want to DELETE this Client ?')) {
			db.collection('clients')
				.doc(id)
				.delete()
				.then(() => {
					console.log('Client was deleted');
				})
				.catch((error) => {
					console.log(error.message);
				});
		} else {
			return;
		}
	};

	// ---------------------------------------------------------------------------------------------------------

	// [1] Gets all Firestore clients documents (if any)
	useEffect(() => {
		// console.log('ClientContext - USER: ', appUser);
		// console.log('ClientContext - Getting All Clients');

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
		//   });
		// if (appUser) {

		const unsubscribe = db.collection('clients').onSnapshot(
			(querySnapshot) => {
				const firestoreClients = [];
				querySnapshot.forEach((doc) => {
					firestoreClients.push({ ...doc.data(), id: doc.id });
				});
				// console.log('ClientContext -> useEffect -> Get all Firestore clients: ', firestoreClients);
				setClients(firestoreClients);
				setIsLoading(false);
			},
			(error) => {
				console.log('ClientContext - Error Message: ', error.message);
				console.log('ClientContext - ****** OFF LINE *******');
			}
		);

		return () => {
			unsubscribe();
		};
	}, []);

	// [2] Add New Client to Firestore
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

	return (
		<ClientContext.Provider
			value={{
				client,
				currentClientID,
				clients,
				isLoading,
				CreateNewClient,
				updateClientInformation,
				deleteClient,
				updateClientMedicalCriminalNotes,
			}}
		>
			{props.children}
		</ClientContext.Provider>
	);
};

export default ClientContextProvider;
