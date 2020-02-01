import React, { useContext, useState } from 'react';
import { ClientContext } from '../contexts/ClientContext';
import { AppearanceContext } from '../contexts/AppearanceContext';
import { useHistory, Link } from 'react-router-dom';
import { Container, Row, Col, Table, Card, Button } from 'react-bootstrap';
import { useEffect } from 'react';

const Home = () => {
	const { clients } = useContext(ClientContext);
	const { size } = useContext(AppearanceContext);
	const { cardTitle, button } = size;
	const [lastFiveClients, setLastFiveClients] = useState([]);
	const history = useHistory();

	const viewClient = (id) => {
		history.push(`/client-details/${id}`);
	};

	useEffect(() => {
		if (clients.length > 4) {
			const lastFive = clients.slice(clients.length, clients.length + 1);
			setLastFiveClients(lastFive);
		} else {
			setLastFiveClients(clients);
		}
	}, [clients]);

	console.log('Home page -> clients: ', clients);
	return lastFiveClients.length === 0 ? (
		<Container>
			<Row className='text-center'>
				<Col>
					<h4>No Clients Found!</h4>
					<h4>
						<Link to='/add-client-basic-information'>+ New Client</Link>
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

												<td>{client.basicInformation.aNumber || 'None'}</td>
												<td>{client.basicInformation.mobilePhone}</td>
												<td>
													<Button size={button} onClick={() => viewClient(client.id)}>
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
