import React, { useState, useContext } from 'react';
import { ClientContext } from '../../../contexts/ClientContext';
import { AppearanceContext } from '../../../contexts/AppearanceContext';
import { useHistory, useParams } from 'react-router-dom';
import { useFindClient } from '../../customHooks/useFindClient';
import { Form, Button, Card, Col, Row, Container } from 'react-bootstrap';
import uuid from 'uuid/v1';
import DatePicker from 'react-datepicker';

const CriminalHistoryForm = () => {
	const { appearance } = useContext(AppearanceContext);
	const { cardTitle, textField, button } = appearance;
	const { clients, updateClientInformation } = useContext(ClientContext);
	const history = useHistory();
	const { id } = useParams();
	const [currentClient] = useFindClient(clients, id, history); // <= custom hook
	const [criminalRecord, setCriminalRecord] = useState({
		criminalRecordID: '',
		date: new Date(),
		location: '',
		CaseNumber: '',
		description: '',
	});

	const [startDate, setStartDate] = useState(new Date());

	const handleChange = (e) => {
		setCriminalRecord({ ...criminalRecord, [e.target.name]: e.target.value });
	};

	const handleDateChange = (date) => {
		setStartDate(date);
		setCriminalRecord({ ...criminalRecord, date: date });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newCriminalRecord = { ...criminalRecord, criminalRecordID: uuid() };
		updateClientInformation('criminalHistory', newCriminalRecord, id);
		history.push(`/view-client-details/${id}`);
	};

	return !currentClient.criminalHistory ? (
		'No Criminal History Found!'
	) : (
		<>
			<Container>
				<Row>
					<Col>
						<Card className='mb-3'>
							<Card.Header as={cardTitle}>
								{currentClient.personalInformation && currentClient.personalInformation.firstName}{' '}
								{currentClient.personalInformation && currentClient.personalInformation.lastName} -
								Criminal History
							</Card.Header>
							<Card.Body>
								<Form onSubmit={handleSubmit}>
									<Row>
										<Col>
											<Form.Group>
												<Form.Label>Date:</Form.Label>
												<DatePicker
													selected={startDate}
													onChange={handleDateChange}
													className='form-control form-control-sm'
													showMonthDropdown
													showYearDropdown
													dropdownMode='select'
													// showTimeSelect
													// timeFormat='h:mm aa'
													// timeIntervals={15}
													// timeCaption='time'
													// withPortal
													required
												/>
												{/* <Form.Control
													type='text'
													size={textField}
													name='date'
													value={criminalRecord.date}
													onChange={handleChange}
													required
												/> */}
											</Form.Group>
										</Col>
										<Col>
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
										<Col>
											<Form.Group>
												<Form.Label>Criminal Case #:</Form.Label>
												<Form.Control
													type='text'
													size={textField}
													name='CaseNumber'
													value={criminalRecord.CaseNumber}
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

export default CriminalHistoryForm;
