import React, { useContext } from 'react';
// import { ClientContext } from '../../contexts/ClientContextProvider';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Card, Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import NotFound from './NotFound';

const CriminalHistoryView = ({ client }) => {
	const { appearance } = useContext(AppearanceContext);
	const { button, notSet } = appearance;
	const history = useHistory();
	// const { client } = useContext(ClientContext);

	return client.criminalHistory.length === 0 ? (
		<NotFound component='Criminal History' action={`/add-client-criminal-history/${client.id}`} />
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
										<td>{criminalCase.date || notSet}</td>
										<td>{criminalCase.location || notSet}</td>
										<td>{criminalCase.description || notSet}</td>
										<td>{criminalCase.CaseNumber || notSet}</td>
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
