import React, { useContext, useEffect } from 'react';
import { ClientContext } from '../../../contexts/ClientContext';
import { AppearanceContext } from '../../../contexts/AppearanceContext';
import { Link } from 'react-router-dom';
import { Card, Table, Container, Row, Col, ListGroup } from 'react-bootstrap';
import LoadingSpinner from '../../LoadingSpinner';
import { useHistory } from 'react-router-dom';
import { useFindClient } from '../../customHooks/useFindClient';
import NotFound from '../other-client-views/NotFound';

const NewClientInformationView = () => {
	const { appearance } = useContext(AppearanceContext);
	const { cardTitle, notSet } = appearance;
	// const { clients, lastAddedClient, currentClientID, currentClient } = useContext(ClientContext);
	const { clients, currentClientID, isLoading } = useContext(ClientContext);
	// const clientID = lastAddedClient.id;
	const history = useHistory();
	const [currentClient] = useFindClient(clients, currentClientID, history); // <= custom hook

	console.log('NewClientInfoView -> currentClientID:  ', currentClientID);
	// console.log('NewClientInfoView -> clients:          ', clients.length);
	console.log('NewClientInfoView -> currentClient:    ', currentClient);
	console.log('NewClientInfoView -> isLoading:        ', isLoading);

	useEffect(() => {
		// if (clients.length === 0) {
		if (!clients) {
			history.push('/');
			return;
		}
	}, [clients, history]);

	return !currentClient.id ? (
		isLoading ? (
			<LoadingSpinner />
		) : (
			<NotFound component='New Client Information' action={null} />
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
									<Link to={`/add-client-personal-information/${currentClient.id}`}>
										+ Add Personal Information
									</Link>
								</ListGroup.Item>
								<ListGroup.Item>
									<Link to={`/add-client-immigration-information/${currentClient.id}`}>
										+ Add Immigration Information
									</Link>
								</ListGroup.Item>
								<ListGroup.Item>
									<Link to={`/add-client-medical-history/${currentClient.id}`}>
										+ Add Medical History
									</Link>
								</ListGroup.Item>
								<ListGroup.Item>
									<Link to={`/add-client-criminal-history/${currentClient.id}`}>
										+ Add Criminal History
									</Link>
								</ListGroup.Item>
								<ListGroup.Item>
									<Link to={`/add-client-note/${currentClient.id}`}>+ Add Note</Link>
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
