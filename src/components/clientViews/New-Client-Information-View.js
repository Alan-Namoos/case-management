import React, { useContext, useEffect } from 'react';
import { ClientContext } from '../../contexts/ClientContext';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Link } from 'react-router-dom';
import { Card, Table, Container, Row, Col, ListGroup } from 'react-bootstrap';
import LoadingSpinner from '../LoadingSpinner';
import { useHistory } from 'react-router-dom';
import { useFindClient } from '../customHooks/useFindClient';

const NewClientInformationView = () => {
	const { appearance } = useContext(AppearanceContext);
	const { cardTitle, notSet } = appearance;
	// const { clients, lastAddedClient, currentClientID, currentClient } = useContext(ClientContext);
	const { clients, lastAddedClient, currentClientID, isLoading } = useContext(ClientContext);
	// const clientID = lastAddedClient.id;
	const history = useHistory();
	const [currentClient] = useFindClient(clients, currentClientID, history); // <= custom hook

	console.log('New Client Info -> currentClientID: ', currentClientID);
	console.log('New Client Info -> clients: ', clients.length);
	console.log('New Client Info -> currentClient: ', currentClient);
	console.log('New Client Info -> isLoading: ', isLoading);

	useEffect(() => {
		if (clients.length === 0) {
			console.log('clients === []');
			history.push('/');
			return;
		}
	}, [clients, history]);

	return !currentClient.id ? (
		isLoading ? (
			<LoadingSpinner />
		) : (
			<Container>
				<Row className='text-center'>
					<Col>
						<h4>No New Client Information!</h4>
						<h4>
							<Link to='/add-new-client'>+ New Client</Link>
						</h4>
						<h4>
							<Link to='/'>Home</Link>
						</h4>
					</Col>
				</Row>
			</Container>
		)
	) : (
		<Container>
			<Row className='text-center'>
				<Col lg={8}>
					<Card className='mb-3'>
						<Card.Header as='h2'>
							{currentClient.personalInformation && currentClient.personalInformation.firstName}{' '}
							{currentClient.personalInformation && currentClient.personalInformation.lastName}
						</Card.Header>
						<Card.Body>
							<Table bordered striped size='sm'>
								<tbody>
									<tr>
										<th width='50%'>Mobile Phone:</th>
										<td>{currentClient.contactInformation.mobilePhone || notSet}</td>
									</tr>
									<tr>
										<th>Home Phone:</th>
										<td>{currentClient.contactInformation.homePhone || notSet}</td>
									</tr>
									<tr>
										<th>Email Address:</th>
										<td>{currentClient.contactInformation.email || notSet}</td>
									</tr>
									<tr>
										<th>Mailing Address:</th>
										<td>{currentClient.contactInformation.mailingAddress || notSet}</td>
									</tr>
									<tr>
										<th>Physical Address:</th>
										<td>{currentClient.contactInformation.physicalAddress || notSet}</td>
									</tr>
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Col>
				<Col lg={4}>
					<Card>
						<Card.Header as={cardTitle}>Continue:</Card.Header>
						<Card.Body>
							<ListGroup>
								<ListGroup.Item>
									<Link to={`/add-client-personal-information/${lastAddedClient.id}`}>
										+ Add Personal Information
									</Link>
								</ListGroup.Item>
								<ListGroup.Item>
									<Link to={`/add-client-immigration-information/${lastAddedClient.id}`}>
										+ Add Immigration Information
									</Link>
								</ListGroup.Item>
								<ListGroup.Item>
									<Link to={`/add-client-medical-history/${lastAddedClient.id}`}>
										+ Add Medical History
									</Link>
								</ListGroup.Item>
								<ListGroup.Item>
									<Link to={`/add-client-criminal-history/${lastAddedClient.id}`}>
										+ Add Criminal History
									</Link>
								</ListGroup.Item>
							</ListGroup>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default NewClientInformationView;
