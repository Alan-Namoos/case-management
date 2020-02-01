import React, { useContext } from 'react';
// import { ClientContext } from '../../contexts/ClientContextProvider';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Card, Table, Button } from 'react-bootstrap';

const MedicalHistoryView = ({ client }) => {
	const { size } = useContext(AppearanceContext);
	const { cardTitle, button } = size;
	// const { client } = useContext(ClientContext);
	return client.medicalHistory.length === 0 ? (
		<h5>No Medical Records found</h5>
	) : (
		<>
			<Card className='mb-3'>
				<Card.Header as={cardTitle}>Medical History</Card.Header>
				<Card.Body>
					<Table bordered striped hover size='sm'>
						<tr>
							<th>Date</th>
							<th>Location</th>
							<th>Description</th>
						</tr>
						<tbody>
							{client.medicalHistory.map((event, i) => {
								return (
									<tr key={i}>
										<td>{event.date}</td>
										<td>{event.location}</td>
										<td>{event.description}</td>
									</tr>
								);
							})}
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

export default MedicalHistoryView;
