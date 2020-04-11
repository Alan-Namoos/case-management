import React, { useState, useEffect, useContext } from 'react';
import { AppearanceContext } from '../../../contexts/AppearanceContext';
import { Card, Table, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import NotFound from '../other-client-views/NotFound';
import { ClientContext } from '../../../contexts/ClientContext';
import { orderBy } from 'lodash';

const CriminalHistoryView = ({ client }) => {
	const { appearance } = useContext(AppearanceContext);
	const { button, notSet } = appearance;
	const { updateClientMedicalCriminalNotes } = useContext(ClientContext);
	const history = useHistory();
	const [sortedCriminalRecords, setSortedCriminalRecords] = useState(null);

	const deleteCriminalRecord = (criminalRecordID) => {
		if (window.confirm('Are you sure you want to DELETE this Criminal Record ?')) {
			if (criminalRecordID) {
				const criminalRecordIndex = sortedCriminalRecords.findIndex((criminalRecord) => {
					return criminalRecordID === criminalRecord.criminalRecordID;
				});

				const updatedCriminalRecords = sortedCriminalRecords.filter((criminalRecord, index) => {
					return criminalRecordIndex !== index;
				});
				updateClientMedicalCriminalNotes('criminalHistory', updatedCriminalRecords, client.id);
			}
		} else {
			return;
		}
	};

	useEffect(() => {
		if (client.criminalHistory.length > 0) {
			// convert the date that is coming form firestore from TIMESTAMP to JS Date Object
			const criminalRecordsWithConvertedDates = client.criminalHistory.map((criminalRecord) => {
				return { ...criminalRecord, date: criminalRecord.date.toDate() };
			});
			const criminalRecordsSorted = orderBy(criminalRecordsWithConvertedDates, ['date'], ['asc']);
			setSortedCriminalRecords(criminalRecordsSorted);
		}
	}, [client.criminalHistory]);

	useEffect(() => {
		if (client.criminalHistory.length === 0) {
			setSortedCriminalRecords(null);
		}
	}, [client.criminalHistory.length]);

	return !sortedCriminalRecords ? (
		<NotFound component='Criminal History' action={`/add-client-criminal-history/${client.id}`} />
	) : (
		<>
			<Card className='mb-3'>
				<Card.Body>
					<Table bordered size='sm'>
						<thead>
							<tr className='text-center'>
								<th>Date</th>
								<th>Locatioin</th>
								<th>Description</th>
								<th>Case #</th>
								<th colSpan='2'>Action</th>
							</tr>
						</thead>
						<tbody>
							{sortedCriminalRecords.map((criminalRecord, i) => {
								return (
									<tr key={i}>
										<td>{criminalRecord.date.toDateString() || notSet}</td>
										<td>{criminalRecord.location || notSet}</td>
										<td>{criminalRecord.description || notSet}</td>
										<td>{criminalRecord.CaseNumber || notSet}</td>
										<td className='text-center'>
											<Button
												variant='link'
												size={button}
												onClick={() =>
													history.push(
														`/edit-client-criminal-record/${client.id}/${criminalRecord.criminalRecordID}`
													)
												}
											>
												<i className='far fa-edit'></i>
											</Button>
										</td>
										<td className='text-center'>
											<Button
												variant='link'
												size={button}
												onClick={() => deleteCriminalRecord(criminalRecord.criminalRecordID)}
											>
												<i className='far fa-trash-alt'></i>
											</Button>
										</td>
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
								variant='primary'
								size={button}
								onClick={() => {
									history.push(`/add-client-criminal-history/${client.id}`);
								}}
							>
								Add Criminal History
							</Button>
						</Col>
					</Row>
				</Card.Footer>
			</Card>
		</>
	);
};

export default CriminalHistoryView;
