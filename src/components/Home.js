import React, { useContext, useEffect } from 'react';
import { ClientContext } from '../contexts/ClientContext';
import { AppearanceContext } from '../contexts/AppearanceContext';
import { useHistory, Link } from 'react-router-dom';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
	const { clients, isLoading, deleteClient } = useContext(ClientContext);
	const { appearance } = useContext(AppearanceContext);
	const { cardTitle, button, notSet } = appearance;
	const { user } = useContext(AuthContext);

	const history = useHistory();

	// This checks if user is signed in, if not, redirect to sign-in route
	useEffect(() => {
		if (!user) {
			history.push('/sign-in');
		}
	}, [user, history]);

	console.log('**** HOME ****');

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
										<th>Actions</th>
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
