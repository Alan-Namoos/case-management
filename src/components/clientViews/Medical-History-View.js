import React, { useContext } from 'react';
// import { ClientContext } from '../../contexts/ClientContextProvider';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Card, Table, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const MedicalHistoryView = ({ client }) => {
	const { appearance } = useContext(AppearanceContext);
	const { button, notSet } = appearance;
	const history = useHistory();
	// const { client } = useContext(ClientContext);

	return client.medicalHistory.length === 0 ? (
		<>
			<Card className='mb-5'>
				<Card.Body className='text-center'>
					<h5>No Medical Records found</h5>
					<Link to={`/add-client-medical-history/${client.id}`}>+ Add Medical History</Link>
				</Card.Body>
			</Card>
		</>
	) : (
		<>
			<Card className='mb-3'>
				{/* <Card.Header as={cardTitle}>Medical History</Card.Header> */}
				<Card.Body>
					<Table bordered striped hover size='sm'>
						<thead>
							<tr>
								<th>Date</th>
								<th>Location</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{client.medicalHistory.map((event, i) => {
								return (
									<tr key={i}>
										<td>{event.date || notSet}</td>
										<td>{event.location || notSet}</td>
										<td>{event.description || notSet}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
				</Card.Body>
				<Card.Footer>
					<Button
						variant='primary float-right'
						size={button}
						onClick={() => {
							history.push(`/add-client-medical-history/${client.id}`);
						}}
					>
						Add Medical History
					</Button>
				</Card.Footer>
			</Card>
		</>
	);
};

export default MedicalHistoryView;
