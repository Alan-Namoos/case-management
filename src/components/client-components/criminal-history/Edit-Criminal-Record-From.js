import React, { useState, useEffect, useContext } from 'react';
import { ClientContext } from '../../../contexts/ClientContext';
import { AppearanceContext } from '../../../contexts/AppearanceContext';
import { useHistory, useParams } from 'react-router-dom';
import { useFindClient } from '../../customHooks/useFindClient';
import { Form, Button, Card, Col, Row, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

const EditCriminalRecordForm = () => {
	const { appearance } = useContext(AppearanceContext);
	const { cardTitle, textField, button } = appearance;
	const { clients, updateClientMedicalCriminalNotes } = useContext(ClientContext);
	const history = useHistory();
	const { id, criminalRecordID } = useParams();
	const [currentClient] = useFindClient(clients, id, history); // <= custom hook
	const [criminalRecord, setCriminalRecord] = useState({
		criminalRecordID: '',
		date: '',
		location: '',
		CaseNumber: '',
		description: ''
	});

	const [
		criminalRecordsWithoutCriminalRecordToEdit,
		setCriminalRecordsWithoutCriminalRecordToEdit
	] = useState([]);
	const [finalUpdatedCriminalRecords, setFinalUpdatedCriminalRecords] = useState(null);

	const handleChange = (e) => {
		setCriminalRecord({ ...criminalRecord, [e.target.name]: e.target.value });
	};

	const handleDateChange = (date) => {
		setCriminalRecord({ ...criminalRecord, date: date });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		updateClientMedicalCriminalNotes('criminalHistory', finalUpdatedCriminalRecords, id);
		history.push(`/view-client-details/${id}`);
	};

	useEffect(() => {
		if (currentClient.criminalHistory && criminalRecordID) {
			// convert the dates from TIMESTAMP to JavaScript Date Object using firebase toDate() method
			const criminalRecordsWithConvertedDates = currentClient.criminalHistory.map(
				(criminallRecord) => {
					return { ...criminallRecord, date: criminallRecord.date.toDate() };
				}
			);
			// find the Index of the criminalRecord to be edited
			const criminalRecordIndex = criminalRecordsWithConvertedDates.findIndex((criminalRecord) => {
				return criminalRecordID === criminalRecord.criminalRecordID;
			});
			// get the criminalRecord to be edited by it's Index
			const criminalRecordToEdit = criminalRecordsWithConvertedDates[criminalRecordIndex];
			// remove the criminalRecord to-be-edited from the criminalRecords array.
			const criminalRecordsWithoutCriminalRecordToEdit = criminalRecordsWithConvertedDates.filter(
				(criminalRecord, index) => {
					return criminalRecordIndex !== index;
				}
			);
			setCriminalRecordsWithoutCriminalRecordToEdit(criminalRecordsWithoutCriminalRecordToEdit);
			setCriminalRecord(criminalRecordToEdit);
		}
	}, [currentClient.criminalHistory, criminalRecordID]);

	useEffect(() => {
		// update the state with all notes after editing is done
		setFinalUpdatedCriminalRecords([...criminalRecordsWithoutCriminalRecordToEdit, criminalRecord]);
	}, [criminalRecordsWithoutCriminalRecordToEdit, criminalRecord]);

	return !criminalRecord ? (
		'No Criminal Record Found!'
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
													selected={criminalRecord.date}
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
														value={criminalHistory.date}
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
													value={criminalRecord.location}
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
													value={criminalRecord.description}
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

export default EditCriminalRecordForm;
