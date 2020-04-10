import React, { useContext, useState, useEffect } from 'react';
import { ClientContext } from '../../../contexts/ClientContext';
import { AppearanceContext } from '../../../contexts/AppearanceContext';
import { useParams, useHistory } from 'react-router-dom';
import PersonalInformationView from '../personal-information/Personal-Information-View';
import ImmigrationInformationView from '../immigration-information/Immigration-Information-View';
import ContactInformationView from '../contact-information/Contact-Information-View';
import MedicalHistoryView from '../medical-history/Medical-History-View';
import CriminalHistoryView from '../criminal-history/Criminal-History-View';
import { Row, Col, Tabs, Tab, Container, Card } from 'react-bootstrap';
import NotesView from '../notes/Notes-View';
import NotFound from '../other-client-views/NotFound';

const ClientDetailsView = () => {
	const { appearance } = useContext(AppearanceContext);
	const { notSet } = appearance;
	const { clients } = useContext(ClientContext);
	const { id } = useParams();
	const [currentClient, setCurrentClient] = useState(null);
	const history = useHistory();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [aNumber, setaNumber] = useState('');

	useEffect(() => {
		// if (clients.length === 0) {
		if (!clients) {
			history.push('/');
			return;
		}
		const client = clients.find((client) => {
			return client.id === id;
		});
		setCurrentClient(client);
	}, [id, clients, history]);

	useEffect(() => {
		if (currentClient) {
			setFirstName(currentClient.personalInformation.firstName);
			setLastName(currentClient.personalInformation.lastName);
			setaNumber(currentClient.immigrationInformation.status.aNumber);
		}
	}, [currentClient]);

	return !currentClient ? (
		<NotFound component='Client Details' action={null} />
	) : (
		<>
			<Container fluid>
				<Row>
					<Col>
						<Card>
							<Card.Header>
								<Row>
									<Col>
										<h3 className='float-right'>
											{firstName} {lastName}
										</h3>
									</Col>

									<Col>
										<h3 className=''>
											<i>A-{aNumber || notSet}</i>
										</h3>
									</Col>
								</Row>
							</Card.Header>
							<Card.Body>
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
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ClientDetailsView;
