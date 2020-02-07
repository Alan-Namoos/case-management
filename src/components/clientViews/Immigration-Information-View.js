import React, { useContext } from 'react';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Card, Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const ImmigrationInformationView = ({ client }) => {
	const { appearance } = useContext(AppearanceContext);
	const { button, notSet } = appearance;
	const history = useHistory();
	const { status, passport, lastVisitToUS, detention } = client.immigrationInformation;

	return client.immigrationInformation === {} ? (
		<h5>No Immigration Information found</h5>
	) : (
		<>
			<Card className='mb-3'>
				{/* <Card.Header as={cardTitle}>Immigration Information</Card.Header> */}
				<Card.Body>
					<h5 className='text-center'>Status</h5>
					<Table bordered striped hover size='sm'>
						<tbody>
							{/* <tr>
								<th>A#:</th>
								<td>{status.aNumber || notSet}</td>
							</tr> */}
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
					<Table bordered striped hover size='sm'>
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
					<Table bordered striped hover size='sm'>
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
					<Button
						variant='primary float-right'
						size={button}
						type='submit'
						onClick={() => history.push(`/add-client-immigration-information/${client.id}`)}
					>
						Edit
					</Button>
				</Card.Footer>
			</Card>
		</>
	);
};

export default ImmigrationInformationView;
