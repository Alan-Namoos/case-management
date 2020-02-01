import React, { useContext } from 'react';
// import { ClientContext } from '../../contexts/ClientContextProvider';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Card, Table, Button } from 'react-bootstrap';

const CriminalHistoryView = ({ client }) => {
	const { size } = useContext(AppearanceContext);
	const { cardTitle, button } = size;
	// const { client } = useContext(ClientContext);
	return client.criminalHistory.length === 0 ? (
		<h5>No Criminal History found</h5>
	) : (
		<>
			<Card className='mb-3'>
				<Card.Header as={cardTitle}>Criminal History</Card.Header>
				<Card.Body>
					<Table bordered striped hover size='sm'>
						<thead>
							<tr>
								<th>Date</th>
								<th>Locatioin</th>
								<th>Description</th>
								<th>Case #</th>
							</tr>
						</thead>
						<tbody>
							{client.criminalHistory.map((criminalCase, i) => {
								return (
									<tr key={i}>
										<td>{criminalCase.date}</td>
										<td>{criminalCase.location}</td>
										<td>{criminalCase.description}</td>
										<td>{criminalCase.CaseNumber}</td>
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

export default CriminalHistoryView;
