import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientContextProvider from './contexts/ClientContext';
import AppearanceContextProvider from './contexts/AppearanceContext';
import AuthContextProvider from './contexts/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
// import './bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

ReactDOM.render(
	<Router>
		<AuthContextProvider>
			<ClientContextProvider>
				<AppearanceContextProvider>
					<App />{' '}
				</AppearanceContextProvider>
			</ClientContextProvider>
		</AuthContextProvider>
	</Router>,
	document.getElementById('root')
);
