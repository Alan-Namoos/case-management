import React from 'react';
import ClientContextProvider from './contexts/ClientContext';
import AppearanceContextProvider from './contexts/AppearanceContext';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import ContactInformationForm from './components/client-components/contact-information/Contact-Information-Form';
import PersonalInformationForm from './components/client-components/personal-information/Personal-Information-Form';
import ImmigrationInformationForm from './components/client-components/immigration-information/Immigration-Information-Form';
import MedicalHistoryForm from './components/client-components/medical-history/Medical-History-Form';
import CriminalHistoryForm from './components/client-components/criminal-history/Criminal-History-Form';
import ClientDetailsView from './components/client-components/other-client-views/Client-Details-View';
import NewClientInformationView from './components/client-components/new-client/New-Client-Information-View';
import NewClientForm from './components/client-components/new-client/New-Client-Form';
import NotesForm from './components/client-components/notes/Notes-Form';
import EditNoteForm from './components/client-components/notes/Edit-Note-Form';
import EditMedicalRecordForm from './components/client-components/medical-history/Edit-Medical-Record-Form';
import EditCriminalRecordForm from './components/client-components/criminal-history/Edit-Criminal-Record-From';

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
							<Route path='/add-client-note/:id/' component={NotesForm} />
							<Route path='/edit-client-note/:id/:noteID' component={EditNoteForm} />
							<Route
								path='/edit-client-medical-record/:id/:medicalRecordID'
								component={EditMedicalRecordForm}
							/>
							<Route
								path='/edit-client-criminal-record/:id/:criminalRecordID'
								component={EditCriminalRecordForm}
							/>
						</Switch>
					</AppearanceContextProvider>
				</ClientContextProvider>
			</Router>
		</>
	);
}

export default App;
