import React, { useContext } from 'react';
import { ClientContext } from '../contexts/ClientContext';
import { AppearanceContext } from '../contexts/AppearanceContext';
import { useHistory, Link } from 'react-router-dom';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';

const Home = () => {
	const { clients, isLoading, deleteClient } = useContext(ClientContext);
	const { appearance } = useContext(AppearanceContext);
	const { cardTitle, button, notSet } = appearance;
	// const [lastFiveClients, setLastFiveClients] = useState([]);
	const history = useHistory();
	console.count('Home RENDERED');
	// console.log('Home - clients Array -> ', clients.length);
	console.log('Home -> clients: ', clients);
	console.log('Home -> isLoading: ', isLoading);

	return !clients || clients.length === 0 ? (
		isLoading ? (
			<LoadingSpinner />
		) : (
			<Container>
				<Row>
					<Col className='text-center'>
						<h4>No Clients Found!</h4>
						<h4>
							<Link to='/add-new-client'>+ New Client</Link>
						</h4>
					</Col>
				</Row>
			</Container>
		)
	) : (
		// <>
		// 	<h4>Clients Table Loaded</h4>
		// 	<h4>{typeof isLoading}</h4>
		// 	{/* <h4>{clients[0].immigrationInformation.status.aNumber}</h4> */}
		// 	{clients.map((client) => {
		// 		return (
		// 			<div>
		// 				<span key={client.id}>
		// 					{client.personalInformation.firstName} {client.personalInformation.lastName}
		// 				</span>{' '}
		// 				|<span>{client.immigrationInformation.status.aNumber || 'not set'}</span>
		// 			</div>
		// 		);
		// 	})}
		// </>

		<Container>
			<Row>
				<Col>
					<Card>
						<Card.Header as={cardTitle}>Clients List</Card.Header>
						<Card.Body>
							<Table striped bordered size='sm' className='text-center'>
								<thead>
									<tr>
										<th>Name</th>
										<th>A#</th>
										<th>Phone #</th>
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{clients &&
										clients.map((client, i) => {
											return (
												<tr key={client.id}>
													<td>
														{client.personalInformation.firstName}{' '}
														{client.personalInformation.lastName}
													</td>

													<td>{client.immigrationInformation.status.aNumber || notSet}</td>
													<td>{client.contactInformation.mobilePhone}</td>
													<td>
														<Button
															size={button}
															onClick={() => history.push(`/view-client-details/${client.id}`)}
														>
															<i className='fas fa-info-circle'></i> More details
														</Button>{' '}
														<Button
															variant='danger'
															size={button}
															onClick={() => {
																deleteClient(client.id);
															}}
														>
															<i className='far fa-trash-alt'></i> Delete
														</Button>
													</td>
												</tr>
											);
										})}
								</tbody>
							</Table>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Home;
