import React, { useContext } from 'react';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Container, Card, Table, Button, Row, Col } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';

const ImmigrationInformationView = ({ client }) => {
	const { appearance } = useContext(AppearanceContext);
	const { button, notSet } = appearance;
	const history = useHistory();
	const { status, passport, lastVisitToUS, detention } = client.immigrationInformation;

	return client.immigrationInformation === {} ? (
		<Container>
			<Row className='text-center'>
				<Col>
					<h4>No Immigration Information Found!</h4>
					<h4>
						<Link to={`/add-client-immigration-information/${client.id}`}>
							+ Immigration Information
						</Link>
					</h4>
					<h4>
						<Link to='/add-new-client'>+ New Client</Link>
					</h4>
					<h4>
						<Link to='/'>Home</Link>
					</h4>
				</Col>
			</Row>
		</Container>
	) : (
		<>
			<Card className=''>
				<Card.Body>
					<h5 className='text-center'>Status</h5>
					<Table bordered size='sm'>
						<tbody>
							<tr>
								<th>A-Number:</th>
								<td>{status.aNumber || notSet}</td>
							</tr>
							<tr>
								<th width='50%'>Current Status:</th>
								<td>{status.currentStatus || notSet}</td>
							</tr>
							<tr>
								<th>Expiration Date: </th>
								<td>{status.expirationDate || notSet}</td>
							</tr>
						</tbody>
					</Table>

					<h5 className='text-center'>Passport</h5>
					<Table bordered size='sm'>
						<tbody>
							<tr>
								<th width='50%'>Issuing Country:</th>
								<td>{passport.issuingCountry || notSet}</td>
							</tr>
							<tr>
								<th>Expiration Date:</th>
								<td>{passport.expirationDate || notSet}</td>
							</tr>
							<tr>
								<th>Passport with Client ?</th>
								<td>{passport.withClient || notSet}</td>
							</tr>
						</tbody>
					</Table>

					<h5 className='text-center'>Last visit to the US</h5>
					<Table bordered size='sm'>
						<tbody>
							<tr>
								<th width='50%'>Date of Entry:</th>
								<td>{lastVisitToUS.dateOfEntry || notSet}</td>
							</tr>
							<tr>
								<th>Port of Entery:</th>
								<td>{lastVisitToUS.portOfEntry || notSet}</td>
							</tr>
							<tr>
								<th>Status:</th>
								<td>{lastVisitToUS.status || notSet}</td>
							</tr>
							<tr>
								<th>Lawful entry ?</th>
								<td>{lastVisitToUS.lawfulEntry || notSet}</td>
							</tr>
						</tbody>
					</Table>

					<h5 className='text-center'>Dentention</h5>
					<Table bordered striped hover size='sm'>
						<tbody>
							<tr>
								<th width='50%'>Detained ?</th>
								<td>{detention.isDetained || notSet}</td>
							</tr>
							<tr>
								<th>Date of Arrest:</th>
								<td>{detention.dateOfArrest || notSet}</td>
							</tr>
							<tr>
								<th>Location:</th>
								<td>{detention.location || notSet}</td>
							</tr>
							<tr>
								<th>Date of Release:</th>
								<td>{detention.dateOfRelease || notSet}</td>
							</tr>
						</tbody>
					</Table>
				</Card.Body>
				<Card.Footer>
					<Row>
						<Col className='text-center'>
							<Button
								variant='primary'
								size={button}
								type='submit'
								onClick={() => history.push(`/add-client-immigration-information/${client.id}`)}
							>
								Edit
							</Button>
						</Col>
					</Row>
				</Card.Footer>
			</Card>
		</>
	);
};

export default ImmigrationInformationView;
