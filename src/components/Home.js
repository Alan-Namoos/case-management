import React, { useContext, useState } from 'react';
import { ClientContext } from '../contexts/ClientContext';
import { AppearanceContext } from '../contexts/AppearanceContext';
import { useHistory, Link } from 'react-router-dom';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { db } from '../firebase';
import Loader from './Loader';

const Home = () => {
	const { clients } = useContext(ClientContext);
	const { appearance } = useContext(AppearanceContext);
	const { cardTitle, button, notSet } = appearance;
	const [lastFiveClients, setLastFiveClients] = useState([]);
	const [users, setUsers] = useState([]);
	const history = useHistory();

	useEffect(() => {
		if (clients.length > 4) {
			const lastFive = clients.slice(clients.length, clients.length + 1);
			setLastFiveClients(lastFive);
		} else {
			setLastFiveClients(clients);
		}
	}, [clients]);

	useEffect(() => {
		db.collection('clients')
			.get()
			.then((snapshot) => {
				console.log('snapshot.docs: ', snapshot.docs);
				const data = snapshot.docs.map((doc) => {
					return { ...doc.data(), id: doc.id };
					// setUsers((users) => [...users, doc.data()]);
				});
				console.log('data: ', data);
				setUsers(data);
			});
	}, []);

	useEffect(() => {
		console.log('users: ', users);
	}, [users]);

	return users.length === 0 ? (
		<Container>
			<Row className='text-center'>
				<Col>
					{/* <h4>No Clients Found!</h4>
					<h4>
						<Link to='/add-new-client'>+ New Client</Link>
					</h4> */}
					<Loader />
				</Col>
			</Row>
		</Container>
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
										<th>Action</th>
									</tr>
								</thead>
								<tbody>
									{users.map((client, i) => {
										return (
											<tr key={i}>
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
														More details
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
