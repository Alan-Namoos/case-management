import React, { useContext, useState, useEffect } from 'react';
import { ClientContext } from '../../contexts/ClientContext';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { useParams, useHistory } from 'react-router-dom';
import PersonalInformationView from './Personal-Information-View';
import ImmigrationInformationView from './Immigration-Information-View';
import ContactInformationView from './Contact-Information-View';
import MedicalHistoryView from './Medical-History-View';
import CriminalHistoryView from './Criminal-History-View';
import { Row, Col, Tabs, Tab, Container } from 'react-bootstrap';
import NotesView from './NotesView';

const ClientDetailsView = () => {
	const { appearance } = useContext(AppearanceContext);
	const { notSet } = appearance;
	const { clients } = useContext(ClientContext);
	const { id } = useParams();
	const [currentClient, setCurrentClient] = useState(null);
	const history = useHistory();

	useEffect(() => {
		if (clients.length === 0) {
			history.push('/');
			return;
		}
		const client = clients.find((client) => {
			return client.id === id;
		});
		setCurrentClient(client);
	}, [id, clients, history]);

	return !currentClient ? (
		'Loding...'
	) : (
		<>
			<Container>
				<Row>
					<Col>
						<h2 className='text-center'>
							{currentClient.personalInformation.firstName}{' '}
							{currentClient.personalInformation.lastName}
							{/* {' | '} */}
							{/* <i>A-Number: {currentClient.immigrationInformation.status.aNumber || notSet}</i> */}
						</h2>
						<h4 className='text-center'>
							<i>A-Number: {currentClient.immigrationInformation.status.aNumber || notSet}</i>
						</h4>
						<hr />
						<Tabs justify defaultActiveKey='contact-information' id='uncontrolled-tab'>
							<Tab eventKey='contact-information' title='Contact Information'>
								<ContactInformationView client={currentClient} notSet={notSet} />
							</Tab>

							<Tab eventKey='personal-information' title='Personal Information'>
								<PersonalInformationView client={currentClient} notSet={notSet} />
							</Tab>

							<Tab eventKey='immigration-information' title='Immigration Information'>
								<ImmigrationInformationView client={currentClient} notSet={notSet} />
							</Tab>

							<Tab eventKey='medical-history' title='Medical History'>
								<MedicalHistoryView client={currentClient} notSet={notSet} />
							</Tab>

							<Tab eventKey='criminal-history' title='Criminal History'>
								<CriminalHistoryView client={currentClient} notSet={notSet} />
							</Tab>

							<Tab eventKey='client-notes' title='Notes'>
								<NotesView client={currentClient} notSet={notSet} />
							</Tab>
						</Tabs>

						{/* </Card.Body>
						</Card> */}
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ClientDetailsView;
