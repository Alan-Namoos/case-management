import React, { useContext, useState, useEffect } from 'react';
import { Row, Col, Tabs, Tab, Container, Card, ListGroup, Button } from 'react-bootstrap';
import PersonalInformationView from './Personal-Information-View';
import ImmigrationInformationView from './Immigration-Information-View';
// import ContactInformationView from './Contact-Information-View';
import MedicalHistoryView from './Medical-History-View';
import CriminalHistoryView from './Criminal-History-View';
import { ClientContext } from '../../contexts/ClientContext';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { useParams, useHistory } from 'react-router-dom';

const ClientDetailsView = () => {
	const { size } = useContext(AppearanceContext);
	const { cardTitle, button } = size;
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
						<Card>
							<Card.Header as={cardTitle}>
								{currentClient.basicInformation.firstName} {currentClient.basicInformation.lastName}{' '}
								- A# {currentClient.basicInformation.aNumber || 'None'}
							</Card.Header>
							<Card.Body>
								<ListGroup>
									<ListGroup.Item>
										<strong>Mobile Phone:</strong> {currentClient.basicInformation.mobilePhone}
									</ListGroup.Item>
									<ListGroup.Item>
										<strong>Home Phone:</strong>{' '}
										{currentClient.basicInformation.homePhone || 'Not set'}
									</ListGroup.Item>
									<ListGroup.Item>
										<strong>Email:</strong> {currentClient.basicInformation.email || 'Not set'}
									</ListGroup.Item>
									<ListGroup.Item>
										<strong>Mailing Address:</strong>{' '}
										{currentClient.basicInformation.mailingAddress || 'Not set'}
									</ListGroup.Item>
									<ListGroup.Item>
										<strong>Physical Address:</strong>{' '}
										{currentClient.basicInformation.physicalAddress || 'Not set'}
									</ListGroup.Item>
								</ListGroup>
							</Card.Body>
							<Card.Footer>
								<Button
									variant='primary float-right'
									size={button}
									onClick={(currentClient) =>
										history.push(`/add-client-basic-information/${currentClient.id}`)
									}
								>
									Edit
								</Button>
							</Card.Footer>
						</Card>
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
