import React, { useState, useEffect, useContext } from 'react';
import { AppearanceContext } from '../../../contexts/AppearanceContext';
import { Card, Table, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import NotFound from '../other-client-views/NotFound';
import { ClientContext } from '../../../contexts/ClientContext';
import { orderBy } from 'lodash';

const MedicalHistoryView = ({ client }) => {
	const { appearance } = useContext(AppearanceContext);
	const { button, notSet } = appearance;
	const { updateClientMedicalCriminalNotes } = useContext(ClientContext);
	const history = useHistory();
	const [sortedMedicalRecords, setSortedMedicalRecords] = useState(null);

	const deleteMedicalRecord = (medicalRecordID) => {
		if (window.confirm('Are you sure you want to DELETE this Medical Record ?')) {
			if (medicalRecordID) {
				const medicalRecordIndex = sortedMedicalRecords.findIndex((medicalRecord) => {
					return medicalRecordID === medicalRecord.medicalRecordID;
				});

				const updatedMedicalRecords = sortedMedicalRecords.filter((medicalRecord, index) => {
					return medicalRecordIndex !== index;
				});
				updateClientMedicalCriminalNotes('medicalHistory', updatedMedicalRecords, client.id);
			}
		} else {
			return;
		}
	};

	useEffect(() => {
		if (client.medicalHistory.length > 0) {
			// convert the date that is coming form firestore from TIMESTAMP to JS Date Object
			const medicalRecordsWithConvertedDates = client.medicalHistory.map((medicalRecord) => {
				return { ...medicalRecord, date: medicalRecord.date.toDate() };
			});

			const medicalRecordsSorted = orderBy(medicalRecordsWithConvertedDates, ['date'], ['asc']);
			setSortedMedicalRecords(medicalRecordsSorted);
		}
	}, [client.medicalHistory]);

	useEffect(() => {
		if (client.medicalHistory.length === 0) {
			setSortedMedicalRecords(null);
		}
	}, [client.medicalHistory.length]);

	return !sortedMedicalRecords ? (
		<NotFound component='Medical History' action={`/add-client-medical-history/${client.id}`} />
	) : (
		<>
			<Card className='mb-3'>
				<Card.Body>
					<Table bordered size='sm'>
						<thead>
							<tr className='text-center'>
								<th>Date</th>
								<th>Location</th>
								<th>Description</th>
								<th colSpan='2'>Action</th>
							</tr>
						</thead>
						<tbody>
							{sortedMedicalRecords.map((medicalRecord, i) => {
								return (
									<tr key={i}>
										<td>{medicalRecord.date.toDateString() || notSet}</td>
										<td>{medicalRecord.location || notSet}</td>
										<td>{medicalRecord.description || notSet}</td>
										<td className='text-center'>
											<Button
												variant='link'
												size={button}
												onClick={() =>
													history.push(
														`/edit-client-medical-record/${client.id}/${medicalRecord.medicalRecordID}`
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
												onClick={() => deleteMedicalRecord(medicalRecord.medicalRecordID)}
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
