import React, { useState, useEffect, useContext } from 'react';
import { ClientContext } from '../../../contexts/ClientContext';
import { AppearanceContext } from '../../../contexts/AppearanceContext';
import { useHistory, useParams } from 'react-router-dom';
import { useFindClient } from '../../customHooks/useFindClient';
import { Form, Button, Card, Col, Row, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

const EditMedicalRecordForm = () => {
	const { appearance } = useContext(AppearanceContext);
	const { cardTitle, textField, button } = appearance;
	const { clients, updateClientMedicalCriminalNotes } = useContext(ClientContext);
	const history = useHistory();
	const { id, medicalRecordID } = useParams();
	const [currentClient] = useFindClient(clients, id, history); // <= custom hook
	const [medicalRecord, setMedicalRecord] = useState({
		medicalRecordID: '',
		date: '',
		location: '',
		description: ''
	});

	const [
		medicalRecordsWithoutMedicalRecordToEdit,
		setMedicalRecordsWithoutMedicalRecordToEdit
	] = useState([]);
	const [finalUpdatedMedicalRecords, setFinalUpdatedMedicalRecords] = useState(null);

	const handleChange = (e) => {
		setMedicalRecord({ ...medicalRecord, [e.target.name]: e.target.value });
	};

	const handleDateChange = (date) => {
		setMedicalRecord({ ...medicalRecord, date: date });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		updateClientMedicalCriminalNotes('medicalHistory', finalUpdatedMedicalRecords, id);
		history.push(`/view-client-details/${id}`);
	};

	useEffect(() => {
		if (currentClient.medicalHistory && medicalRecordID) {
			// convert the dates from TIMESTAMP to JavaScript Date Object using firebase toDate() method
			const medicalRecordsWithConvertedDates = currentClient.medicalHistory.map((medicalRecord) => {
				return { ...medicalRecord, date: medicalRecord.date.toDate() };
			});
			// find the Index of the medicalRecord to be edited
			const medicalRecordIndex = medicalRecordsWithConvertedDates.findIndex((medicalRecord) => {
				return medicalRecordID === medicalRecord.medicalRecordID;
			});
			// get the medicalRecord to be edited by it's Index
			const medicalRecordToEdit = medicalRecordsWithConvertedDates[medicalRecordIndex];
			// remove the medicalRecord to-be-edited from the medicalRecords array.
			const medicalRecordsWithoutMedicalRecordToEdit = medicalRecordsWithConvertedDates.filter(
				(medicalRecord, index) => {
					return medicalRecordIndex !== index;
				}
			);
			setMedicalRecordsWithoutMedicalRecordToEdit(medicalRecordsWithoutMedicalRecordToEdit);
			setMedicalRecord(medicalRecordToEdit);
		}
	}, [currentClient.medicalHistory, medicalRecordID]);

	useEffect(() => {
		// update the state with all notes after editing is done
		setFinalUpdatedMedicalRecords([...medicalRecordsWithoutMedicalRecordToEdit, medicalRecord]);
	}, [medicalRecordsWithoutMedicalRecordToEdit, medicalRecord]);

	return !medicalRecord ? (
		'No Medical Record Found!'
	) : (
		<>
			<Container>
				<Row>
					<Col>
						<Card className='mb-3'>
							<Card.Header as={cardTitle}>
								{currentClient.personalInformation && currentClient.personalInformation.firstName}{' '}
								{currentClient.personalInformation && currentClient.personalInformation.lastName} -
								Medical History
							</Card.Header>
							<Card.Body>
								<Form onSubmit={handleSubmit}>
									<Row>
										<Col xs={4}>
											<Form.Group>
												<Form.Label>Date:</Form.Label>
												<DatePicker
													selected={medicalRecord.date}
													onChange={handleDateChange}
													className='form-control form-control-sm'
													showMonthDropdown
													showYearDropdown
													dropdownMode='select'
													required
												/>
												{/* <Form.Control
														type='text'
														size={textField}
														name='date'
														value={medicalHistory.date}
														onChange={handleChange}
														required
													/> */}
											</Form.Group>
										</Col>
										<Col xs={8}>
											<Form.Group>
												<Form.Label>Location:</Form.Label>
												<Form.Control
													type='text'
													size={textField}
													name='location'
													value={medicalRecord.location}
													onChange={handleChange}
													required
												/>
											</Form.Group>
										</Col>
									</Row>

									<Row>
										<Col>
											<Form.Group>
												<Form.Label>Description:</Form.Label>
												<Form.Control
													type='text'
													size={textField}
													name='description'
													value={medicalRecord.description}
													onChange={handleChange}
													required
												/>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col className='text-center'>
											<Button variant='primary' size={button} type='submit'>
												Save
											</Button>{' '}
											<Button
												variant='primary'
												size={button}
												onClick={() => history.push(`/view-client-details/${id}`)}
											>
												Cancel
											</Button>
										</Col>
									</Row>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default EditMedicalRecordForm;
