import React, { useContext } from 'react';
// import { ClientContext } from '../../contexts/ClientContextProvider';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Card, Table, Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const CriminalHistoryView = ({ client }) => {
	const { size } = useContext(AppearanceContext);
	const { cardTitle, button } = size;
	const history = useHistory();
	// const { client } = useContext(ClientContext);

	return client.criminalHistory.length === 0 ? (
		<>
			<Card className='mb-5'>
				<Card.Body className='text-center'>
					<h5>No Criminal History found</h5>
					<Link to={`/add-client-criminal-history/${client.id}`}>+ Add Criminal History</Link>
				</Card.Body>
			</Card>
		</>
	) : (
		<>
			<Card className='mb-3'>
				{/* <Card.Header as={cardTitle}>Criminal History</Card.Header> */}
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
					<Button
						variant='primary float-right'
						size={button}
						onClick={() => {
							history.push(`/add-client-criminal-history/${client.id}`);
						}}
					>
						Add Criminal History
					</Button>
				</Card.Footer>
			</Card>
		</>
	);
};

export default CriminalHistoryView;
