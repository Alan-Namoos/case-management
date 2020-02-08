import React, { useContext, useState } from 'react';
import { ClientContext } from '../contexts/ClientContext';
import { AppearanceContext } from '../contexts/AppearanceContext';
import { useHistory, Link } from 'react-router-dom';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import { useEffect } from 'react';

const Home = () => {
	const { clients } = useContext(ClientContext);
	const { appearance } = useContext(AppearanceContext);
	const { cardTitle, button, notSet } = appearance;
	const [lastFiveClients, setLastFiveClients] = useState([]);
	const history = useHistory();

	useEffect(() => {
		if (clients.length > 4) {
			const lastFive = clients.slice(clients.length, clients.length + 1);
			setLastFiveClients(lastFive);
		} else {
			setLastFiveClients(clients);
		}
	}, [clients]);

	return lastFiveClients.length === 0 ? (
		<Container>
			<Row className='text-center'>
				<Col>
					<h4>No Clients Found!</h4>
					<h4>
						<Link to='/add-new-client'>+ New Client</Link>
					</h4>
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
									{lastFiveClients.map((client, i) => {
										return (
											<tr key={client.id}>
												<td>
													{client.basicInformation.firstName} {client.basicInformation.lastName}
												</td>

												<td>{client.immigrationInformation.status.aNumber || notSet}</td>
												<td>{client.basicInformation.mobilePhone}</td>
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
