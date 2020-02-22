import React, { useContext } from 'react';
// import { ClientContext } from '../../contexts/ClientContextProvider';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Card, Table, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import NotFound from './NotFound';

const MedicalHistoryView = ({ client }) => {
	const { appearance } = useContext(AppearanceContext);
	const { button, notSet } = appearance;
	const history = useHistory();
	// const { medicalHistory } = client;

	return client.medicalHistory.length === 0 ? (
		<NotFound component='Medical History' action={`/add-client-medical-history/${client.id}`} />
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
					<Row>
						<Col className='text-center'>
							<Button
								variant='primary float-right'
								size={button}
								onClick={() => {
									history.push(`/add-client-medical-history/${client.id}`);
								}}
							>
								Add Medical History
							</Button>
						</Col>
					</Row>
				</Card.Footer>
			</Card>
		</>
	);
};

export default MedicalHistoryView;
