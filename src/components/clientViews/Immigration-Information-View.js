import React, { useContext } from 'react';
// import { ClientContext } from '../../contexts/ClientContextProvider';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Card, Table, Button } from 'react-bootstrap';

const ImmigrationInformationView = ({ client }) => {
	const { size } = useContext(AppearanceContext);
	const { cardTitle, button } = size;
	// const { client } = useContext(ClientContext);
	const { status, passport, lastVisitToUS, detention } = client.immigrationInformation;
	return client.immigrationInformation.status.currentStatus === '' ? (
		<h5>No Immigration Information found</h5>
	) : (
		<>
			<Card className='mb-3'>
				<Card.Header as={cardTitle}>Immigration Information</Card.Header>
				<Card.Body>
					<h5 className='text-center'>Status</h5>
					<Table bordered striped hover size='sm'>
						<tbody>
							<tr>
								<th width='50%'>Current Status:</th>
								<td>{status.currentStatus}</td>
							</tr>
							<tr>
								<th>Expiration Date: </th>
								<td>{status.expirationDate}</td>
							</tr>
							<tr>
								<th>A#:</th>
								<td>{status.aNumber}</td>
							</tr>
						</tbody>
					</Table>

					<h5 className='text-center'>Passport</h5>
					<Table bordered striped hover size='sm'>
						<tbody>
							<tr>
								<th width='50%'>Issuing Country:</th>
								<td>{passport.issuingCountry}</td>
							</tr>
							<tr>
								<th>Expiration Date:</th>
								<td>{passport.expirationDate}</td>
							</tr>
							<tr>
								<th>with Client ?</th>
								<td>{passport.withClient}</td>
							</tr>
						</tbody>
					</Table>

					<h5 className='text-center'>Last visit to the US</h5>
					<Table bordered striped hover size='sm'>
						<tbody>
							<tr>
								<th width='50%'>Date of Entry:</th>
								<td>{lastVisitToUS.dateOfEntry}</td>
							</tr>
							<tr>
								<th>Port of Entery:</th>
								<td>{lastVisitToUS.portOfEntry}</td>
							</tr>
							<tr>
								<th>Status:</th>
								<td>{lastVisitToUS.status}</td>
							</tr>
							<tr>
								<th>Lawful entry ?</th>
								<td>{lastVisitToUS.lawfulEntry}</td>
							</tr>
						</tbody>
					</Table>

					<h5 className='text-center'>Dentention</h5>
					<Table bordered striped hover size='sm'>
						<tbody>
							<tr>
								<th width='50%'>Detained ?</th>
								<td>{detention.isDetained}</td>
							</tr>
							<tr>
								<th>Date of Arrest:</th>
								<td>{detention.dateOfArrest}</td>
							</tr>
							<tr>
								<th>Location:</th>
								<td>{detention.location}</td>
							</tr>
							<tr>
								<th>Date of Release:</th>
								<td>{detention.dateOfRelease}</td>
							</tr>
						</tbody>
					</Table>
				</Card.Body>
				<Card.Footer>
					<Button variant='primary float-right' size={button} type='submit'>
						Edit
					</Button>
				</Card.Footer>
			</Card>
		</>
	);
};

export default ImmigrationInformationView;
