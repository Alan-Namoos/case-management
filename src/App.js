import React from 'react';
import ClientContextProvider from './contexts/ClientContext';
import AppearanceContextProvider from './contexts/AppearanceContext';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import BasicInformationForm from './components/clientForms/Basic-Information-Form';
import PersonalInformationForm from './components/clientForms/Personal-Information-Form';
import ImmigrationInformationForm from './components/clientForms/Immigration-Information-Form';
import MedicalHistoryForm from './components/clientForms/Medical-History-Form';
import CriminalHistoryForm from './components/clientForms/Criminal-History-Form';
import ClientDetailsView from './components/clientViews/Client-Details-View';
import BasicInformationView from './components/clientViews/Basic-Information-View';

function App() {
	return (
		<>
			<Router>
				<ClientContextProvider>
					<AppearanceContextProvider>
						<Navbar />
						<Switch>
							<Route exact path='/' component={Home} />
							<Route path='/add-client-basic-information' component={BasicInformationForm} />
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
							<Route path='/view-client-basic-information' component={BasicInformationView} />
							<Route path='/client-details/:id' component={ClientDetailsView} />
						</Switch>
					</AppearanceContextProvider>
				</ClientContextProvider>
			</Router>
		</>
	);
}

export default App;
