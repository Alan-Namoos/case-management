import React from 'react';
import ClientContextProvider from './contexts/ClientContext';
import AppearanceContextProvider from './contexts/AppearanceContext';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import ContactInformationForm from './components/clientForms/Contact-Information-Form';
import PersonalInformationForm from './components/clientForms/Personal-Information-Form';
import ImmigrationInformationForm from './components/clientForms/Immigration-Information-Form';
import MedicalHistoryForm from './components/clientForms/Medical-History-Form';
import CriminalHistoryForm from './components/clientForms/Criminal-History-Form';
import ClientDetailsView from './components/clientViews/Client-Details-View';
import NewClientInformationView from './components/clientViews/New-Client-Information-View';
import NewClientForm from './components/clientForms/New-Client-Form';

function App() {
	return (
		<>
			<Router>
				<ClientContextProvider>
					<AppearanceContextProvider>
						<Navbar />
						<Switch>
							<Route exact path='/' component={Home} />
							<Route path='/add-new-client' component={NewClientForm} />
							<Route
								path='/add-client-contact-information/:id'
								component={ContactInformationForm}
							/>
							<Route
								path='/add-client-personal-information/:id'
								component={PersonalInformationForm}
							/>

							<Route
								path='/add-client-immigration-information/:id'
								component={ImmigrationInformationForm}
							/>
							<Route path='/add-client-medical-history/:id' component={MedicalHistoryForm} />
							<Route path='/add-client-criminal-history/:id' component={CriminalHistoryForm} />
							<Route path='/view-new-client-information' component={NewClientInformationView} />
							<Route path='/view-client-details/:id' component={ClientDetailsView} />
						</Switch>
					</AppearanceContextProvider>
				</ClientContextProvider>
			</Router>
		</>
	);
}

export default App;
