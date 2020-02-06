import React, { useContext } from 'react';
import { ClientContext } from '../../contexts/ClientContext';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Link } from 'react-router-dom';
import { Card, Table, Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useFindClient } from '../customHooks/useFindClient';

const BasicInformationView = () => {
	const { size } = useContext(AppearanceContext);
	const { cardTitle } = size;
	const { clients, lastAddedClient } = useContext(ClientContext);
	const clientID = lastAddedClient.id;
	const history = useHistory();
	const [currentClient] = useFindClient(clients, clientID, history); // <= custom hook

	return !!!currentClient.basicInformation ? (
		<Container>
			<Row className='text-center'>
				<Col>
					<h4>Basic Information View - Client Not Found!</h4>
					<h4>
						<Link to='/add-client-basic-information'>+ New Client</Link>
					</h4>
				</Col>
			</Row>
		</Container>
	) : (
		<>
			<Container>
				<Row className='text-center'>
					<Col>
						<Card className='mb-3'>
							<Card.Header as={cardTitle}>
								{currentClient.basicInformation.firstName} {currentClient.basicInformation.lastName}
							</Card.Header>
							<Card.Body>
								<Table bordered striped size='sm'>
									<tbody>
										<tr>
											<th width='50%'>Mobile Phone:</th>
											<td>{currentClient.basicInformation.mobilePhone || 'None'}</td>
										</tr>
										<tr>
											<th>Home Phone:</th>
											<td>{currentClient.basicInformation.homePhone || 'None'}</td>
										</tr>
										<tr>
											<th>Email Address:</th>
											<td>{currentClient.basicInformation.email || 'None'}</td>
										</tr>
										<tr>
											<th>Mailing Address:</th>
											<td>{currentClient.basicInformation.mailingAddress || 'None'}</td>
										</tr>
										<tr>
											<th>Physical Address:</th>
											<td>{currentClient.basicInformation.physicalAddress || 'None'}</td>
										</tr>
									</tbody>
								</Table>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Header as={cardTitle}>Now you can add:</Card.Header>
							<Card.Body>
								<div className='list-group'>
									<Link
										// to={{
										// 	pathname: '/add-client-personal-information',
										// 	state: lastAddedClient
										// }}
										to={`/add-client-personal-information/${lastAddedClient.id}`}
										className='list-group-item list-group-item-action'
									>
										Personal Information
									</Link>
									<Link
										to={`/add-client-immigration-information/${lastAddedClient.id}`}
										className='list-group-item list-group-item-action'
									>
										Immigration Information
									</Link>
									<Link
										to='/add-client-medical-history'
										className='list-group-item list-group-item-action'
									>
										Medical History
									</Link>
									<Link
										to='/add-client-criminal-history'
										className='list-group-item list-group-item-action'
									>
										Criminal History
									</Link>
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default BasicInformationView;
