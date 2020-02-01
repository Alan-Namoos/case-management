import React, { useContext, useState, useEffect } from 'react';
import { Row, Col, Tabs, Tab, Container } from 'react-bootstrap';
import PersonalInformationView from './Personal-Information-View';
import ImmigrationInformationView from './Immigration-Information-View';
// import ContactInformationView from './Contact-Information-View';
import MedicalHistoryView from './Medical-History-View';
import CriminalHistoryView from './Criminal-History-View';
import { ClientContext } from '../../contexts/ClientContext';
import { useParams, useHistory } from 'react-router-dom';

const ClientDetailsView = () => {
	const { clients } = useContext(ClientContext);
	const { id } = useParams();
	const [currentClient, setCurrentClient] = useState();
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
						<h4>
							{currentClient.basicInformation.firstName} {currentClient.basicInformation.lastName} -
							A#: {currentClient.basicInformation.aNumber || 'None'}
						</h4>
					</Col>
				</Row>
				<Row>
					<Col>
						<Tabs justify defaultActiveKey='personal-information' id='uncontrolled-tab-example'>
							<Tab eventKey='personal-information' title='Personal Information'>
								<PersonalInformationView client={currentClient} />
							</Tab>

							<Tab eventKey='immigration-information' title='Immigration Information'>
								<ImmigrationInformationView client={currentClient} />
							</Tab>

							<Tab eventKey='medical-history' title='Medical History'>
								<MedicalHistoryView client={currentClient} />
							</Tab>

							<Tab eventKey='criminal-history' title='Criminal History'>
								<CriminalHistoryView client={currentClient} />
							</Tab>
						</Tabs>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ClientDetailsView;
