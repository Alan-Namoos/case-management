import React, { useState, createContext, useEffect } from 'react';
import { auth } from '../firebase';
import { useHistory } from 'react-router-dom';

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
	const [user, setUser] = useState(null);
	let history = useHistory();

	// console.log('AuthContext USER: ', user);
	console.log('**** AuthContext ****');
	console.log('AuthContext USER: ', user);

	useEffect(() => {
		// Check if USER is Signed-in

		auth.onAuthStateChanged(function (user) {
			if (user) {
				setUser(user);
			} else {
				console.log('AuthContext - No user or need to sign-in');
				history.push('/sign-in');
			}
		});
	}, [history]);

	// USER SIGN-IN:
	const userSignIn = (email, password) => {
		auth
			.signInWithEmailAndPassword(email, password)
			.then((user) => {
				setUser(user);
				history.push('/');
			})
			.catch((error) => {
				console.log('AuthContext - Error Code: ', error.code);
				console.log('AuthContext - Error Message: ', error.message);
			});
	};

	// USER SIGN-OUT:
	const userSignOut = () => {
		auth
			.signOut()
			.then(function () {
				setUser(null);
				console.log('AuthContext - User signed-out');
			})
			.catch(function (error) {
				console.log('AuthContext - Error signing-out');
				console.log(error.message);
			});
	};

	return (
		<AuthContext.Provider value={{ user, userSignIn, userSignOut }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
