import React, { useState, useContext, useEffect } from 'react';
import { Card, Row, Col, Form, Button, ListGroup, Container } from 'react-bootstrap';
import { ClientContext } from '../../contexts/ClientContext';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { useHistory, useParams } from 'react-router-dom';
import { useFindClient } from '../customHooks/useFindClient';

const ImmigrationInformationForm = () => {
	const { appearance } = useContext(AppearanceContext);
	const { cardTitle, textField, button } = appearance;
	const { clients, updateClientInformation } = useContext(ClientContext);
	const history = useHistory();
	const { id } = useParams();
	const [currentClient] = useFindClient(clients, id, history); // <= custom hook
	const [immigrationInformation, setImmigrationInformation] = useState({});

	const [status, setStatus] = useState({
		aNumber: '',
		currentStatus: '',
		expirationDate: ''
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

	useEffect(() => {
		if (currentClient.immigrationInformation) {
			setStatus(currentClient.immigrationInformation.status);
			setPassport(currentClient.immigrationInformation.passport);
			setLastVisitToUS(currentClient.immigrationInformation.lastVisitToUS);
			setDetention(currentClient.immigrationInformation.detention);
			return;
		}
		if (!currentClient) {
			console.log('1st useEffect - currentClient is not set');
		}
	}, [currentClient]);

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
		updateClientInformation('immigrationInformation', immigrationInformation, id);
		history.push(`/view-client-details/${id}`);
	};

	return !immigrationInformation ? (
		'No Immigration Information Found!'
	) : (
		<>
			<Container>
				<Row>
					<Col>
						<Card className='mb-3'>
							<Card.Header as={cardTitle}>
								{currentClient.personalInformation && currentClient.personalInformation.firstName}{' '}
								{currentClient.personalInformation && currentClient.personalInformation.lastName} -
								Immigration Information
							</Card.Header>
							<Card.Body>
								<Form onSubmit={handleSubmit}>
									<ListGroup>
										<ListGroup.Item>
											<h5>Status</h5>
											<Row>
												<Col>
													<Form.Group>
														<Form.Label>
															A-Number:<i>{'(if any)'}</i>
														</Form.Label>
														<Form.Control
															type='text'
															name='aNumber'
															size={textField}
															value={status.aNumber || ''}
															onChange={handleStatusChange}
														/>
													</Form.Group>
												</Col>
												<Col>
													<Form.Group>
														<Form.Label>Current Statu:</Form.Label>
														<Form.Control
															type='text'
															size={textField}
															name='currentStatus'
															value={status.currentStatus}
															onChange={handleStatusChange}
															// onChange={handleChange}
														/>
													</Form.Group>
												</Col>
												<Col>
													<Form.Group>
														<Form.Label>
															Expiration Date:
															<i>{'(if any)'}</i>
														</Form.Label>
														<Form.Control
															type='text'
															size={textField}
															name='expirationDate'
															value={status.expirationDate}
															onChange={handleStatusChange}
															// onChange={handleChange}
														/>
													</Form.Group>
												</Col>
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
															value={passport.issuingCountry}
															onChange={handlePassportChange}
															// onChange={handleChange}
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
															value={passport.expirationDate}
															onChange={handlePassportChange}
															// onChange={handleChange}
														/>
													</Form.Group>
												</Col>
												<Col>
													<Form.Group>
														<Form.Label>Passport with Client ?</Form.Label>
														<Form.Control
															as='select'
															size={textField}
															name='withClient'
															selected={passport.withClient}
															value={passport.withClient}
															onChange={handlePassportChange}
															// onChange={handleChange}
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
															value={lastVisitToUS.dateOfEntry}
															onChange={handleLastVisitToUSChange}
															// onChange={handleChange}
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
															value={lastVisitToUS.portOfEntry}
															onChange={handleLastVisitToUSChange}
															// onChange={handleChange}
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
															value={lastVisitToUS.status}
															onChange={handleLastVisitToUSChange}
															// onChange={handleChange}
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
															selected={lastVisitToUS.lawfulEntry}
															value={lastVisitToUS.lawfulEntry}
															onChange={handleLastVisitToUSChange}
															// onChange={handleChange}
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
															selected={detention.isDetained}
															value={detention.isDetained}
															onChange={handleDetentionChange}
															// onChange={handleChange}
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
															value={detention.dateOfArrest}
															onChange={handleDetentionChange}
															// onChange={handleChange}
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
															value={detention.location}
															onChange={handleDetentionChange}
															// onChange={handleChange}
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
															value={detention.dateOfRelease}
															onChange={handleDetentionChange}
															// onChange={handleChange}
														/>
													</Form.Group>
												</Col>
											</Row>
										</ListGroup.Item>
									</ListGroup>
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

export default ImmigrationInformationForm;
