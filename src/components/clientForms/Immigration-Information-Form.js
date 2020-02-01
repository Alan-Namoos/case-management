import React, { useState, useContext, useEffect } from 'react';
import { Card, Row, Col, Form, Button, ListGroup, Container } from 'react-bootstrap';
import { ClientContext } from '../../contexts/ClientContext';
import { AppearanceContext } from '../../contexts/AppearanceContext';

const ImmigrationInformationForm = () => {
	const { size } = useContext(AppearanceContext);
	const { cardTitle, textField, button } = size;
	const { client, addImmigrationInformation } = useContext(ClientContext);
	const [immigrationInformation, setImmigrationInformation] = useState(
		client.immigrationInformation
	);
	const [status, setStatus] = useState({
		currentStatus: '',
		expirationDate: ''
		// aNumber: ''
	});
	const [passport, setPassport] = useState({
		issuingCountry: '',
		expirationDate: '',
		withClient: ''
	});
	const [lastVisitToUS, setLastVisitToUS] = useState({
		dateOfEntry: '',
		portOfEntry: '',
		status: '',
		lawfulEntry: ''
	});
	const [detention, setDetention] = useState({
		isDetained: '',
		dateOfArrest: '',
		location: '',
		dateOfRelease: ''
	});

	const handleStatusChange = (e) => {
		setStatus({ ...status, [e.target.name]: e.target.value });
	};

	const handlePassportChange = (e) => {
		setPassport({ ...passport, [e.target.name]: e.target.value });
	};

	const handleLastVisitToUSChange = (e) => {
		setLastVisitToUS({ ...lastVisitToUS, [e.target.name]: e.target.value });
	};

	const handleDetentionChange = (e) => {
		setDetention({ ...detention, [e.target.name]: e.target.value });
	};

	useEffect(() => {
		setImmigrationInformation({
			...immigrationInformation,
			status,
			passport,
			lastVisitToUS,
			detention
		});
		// eslint-disable-next-line
	}, [status, passport, lastVisitToUS, detention]);

	const handleSubmit = (e) => {
		e.preventDefault();
		addImmigrationInformation(immigrationInformation);
	};
	return (
		<>
			<Container>
				<Row>
					<Col>
						<Card className='mb-3'>
							<Card.Header as={cardTitle}>Immigration Information</Card.Header>
							<Card.Body>
								<Form onSubmit={handleSubmit}>
									<ListGroup>
										<ListGroup.Item>
											<h5>Status</h5>
											<Row>
												<Col>
													<Form.Group>
														<Form.Label>Current Status:</Form.Label>
														<Form.Control
															type='text'
															size={textField}
															name='currentStatus'
															vlaue={status.currentStatus}
															onChange={handleStatusChange}
														/>
													</Form.Group>
												</Col>
												<Col>
													<Form.Group>
														<Form.Label>
															Expiration Date: <i>{'(if any)'}</i>
														</Form.Label>
														<Form.Control
															type='text'
															size={textField}
															name='expirationDate'
															vlaue={status.expirationDate}
															onChange={handleStatusChange}
														/>
													</Form.Group>
												</Col>
												{/* <Col>
													<Form.Group>
														<Form.Label>
															A#: <i>{'(if any)'}</i>
														</Form.Label>
														<Form.Control
															type='text'
															size={textField}
															name='aNumber'
															vlaue={status.aNumber}
															onChange={handleStatusChange}
														/>
													</Form.Group>
												</Col> */}
											</Row>
										</ListGroup.Item>
										<ListGroup.Item>
											<h5>Passport:</h5>
											<Row>
												<Col>
													<Form.Group>
														<Form.Label>Issuing Country:</Form.Label>
														<Form.Control
															type='text'
															size={textField}
															name='issuingCountry'
															vlaue={passport.issuingCountry}
															onChange={handlePassportChange}
														/>
													</Form.Group>
												</Col>
												<Col>
													<Form.Group>
														<Form.Label>Expiration Date:</Form.Label>
														<Form.Control
															type='text'
															size={textField}
															name='expirationDate'
															vlaue={passport.expirationDate}
															onChange={handlePassportChange}
														/>
													</Form.Group>
												</Col>
												<Col>
													<Form.Group>
														<Form.Label>with Client ?</Form.Label>
														<Form.Control
															as='select'
															size={textField}
															name='withClient'
															vlaue={passport.withClient}
															onChange={handlePassportChange}
														>
															<option value=''>Select One</option>
															<option value='Yes'>Yes</option>
															<option value='No, with ICE'>No, with ICE</option>
														</Form.Control>
													</Form.Group>
												</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item>
											<h5>Last visit to the US:</h5>
											<Row>
												<Col>
													<Form.Group>
														<Form.Label>Date of Entry:</Form.Label>
														<Form.Control
															type='text'
															size={textField}
															name='dateOfEntry'
															vlaue={lastVisitToUS.dateOfEntry}
															onChange={handleLastVisitToUSChange}
														/>
													</Form.Group>
												</Col>
												<Col>
													<Form.Group>
														<Form.Label>Port of Entery:</Form.Label>
														<Form.Control
															type='text'
															size={textField}
															name='portOfEntry'
															vlaue={lastVisitToUS.portOfEntry}
															onChange={handleLastVisitToUSChange}
														/>
													</Form.Group>
												</Col>
												<Col>
													<Form.Group>
														<Form.Label>Status:</Form.Label>
														<Form.Control
															type='text'
															size={textField}
															name='status'
															vlaue={lastVisitToUS.status}
															onChange={handleLastVisitToUSChange}
														/>
													</Form.Group>
												</Col>
												<Col>
													<Form.Group>
														<Form.Label>Lawful entry ?</Form.Label>
														<Form.Control
															as='select'
															size={textField}
															name='lawfulEntry'
															vlaue={lastVisitToUS.lawfulEntry}
															onChange={handleLastVisitToUSChange}
														>
															<option value=''>Select One</option>
															<option value='Yes'>Yes</option>
															<option value='No'>No</option>
														</Form.Control>
													</Form.Group>
												</Col>
											</Row>
										</ListGroup.Item>
										<ListGroup.Item>
											<h5>Dentention:</h5>
											<Row>
												<Col>
													<Form.Group>
														<Form.Label>Detained: </Form.Label>
														<Form.Control
															as='select'
															size={textField}
															name='isDetained'
															vlaue={detention.isDetained}
															onChange={handleDetentionChange}
														>
															<option value=''>Select One</option>
															<option value='Yes'>Yes</option>
															<option value='No'>No</option>
														</Form.Control>
													</Form.Group>
												</Col>
												<Col>
													<Form.Group>
														<Form.Label>Date of Arrest:</Form.Label>
														<Form.Control
															type='text'
															size={textField}
															name='dateOfArrest'
															vlaue={detention.dateOfArrest}
															onChange={handleDetentionChange}
														/>
													</Form.Group>
												</Col>
												<Col>
													<Form.Group>
														<Form.Label>Location:</Form.Label>
														<Form.Control
															type='text'
															size={textField}
															name='location'
															vlaue={detention.location}
															onChange={handleDetentionChange}
														/>
													</Form.Group>
												</Col>
												<Col>
													<Form.Group>
														<Form.Label>Date of Release:</Form.Label>
														<Form.Control
															type='text'
															size={textField}
															name='dateOfRelease'
															vlaue={detention.dateOfRelease}
															onChange={handleDetentionChange}
														/>
													</Form.Group>
												</Col>
											</Row>
										</ListGroup.Item>
									</ListGroup>
									<Button variant='primary float-right' size={button} type='submit'>
										Save
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default ImmigrationInformationForm;
