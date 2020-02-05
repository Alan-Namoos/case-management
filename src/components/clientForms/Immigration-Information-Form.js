import React, { useState, useContext, useEffect } from 'react';
import { Card, Row, Col, Form, Button, ListGroup, Container } from 'react-bootstrap';
import { ClientContext } from '../../contexts/ClientContext';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { useHistory, useParams } from 'react-router-dom';
import { useFindClient } from '../customHooks/useFindClient';

const ImmigrationInformationForm = () => {
	const { size } = useContext(AppearanceContext);
	const { cardTitle, textField, button } = size;
	const { clients, addImmigrationInformation } = useContext(ClientContext);
	const [immigrationInformation, setImmigrationInformation] = useState({});
	const history = useHistory();
	const { id } = useParams();
	const [clientFound, currentClient] = useFindClient(clients, id, history);

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
		addImmigrationInformation(immigrationInformation, id);
		history.push('/');
	};

	console.log(currentClient);
	return !!!clientFound ? (
		'Client Not Found'
	) : (
		<>
			<Container>
				<Row>
					<Col>
						<Card className='mb-3'>
							<Card.Header as={cardTitle}>
								{currentClient.basicInformation.firstName || ''}{' '}
								{currentClient.basicInformation.lastName || ''} - Immigration Information
							</Card.Header>
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
															vlaue={
																currentClient.immigrationInformation.status.currentStatus ||
																status.currentStatus
															}
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
															vlaue={
																currentClient.immigrationInformation.status.expirationDate ||
																status.expirationDate
															}
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
															vlaue={
																currentClient.immigrationInformation.passport.issuingCountry ||
																passport.issuingCountry
															}
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
															vlaue={
																currentClient.immigrationInformation.passport.expirationDate ||
																passport.expirationDate
															}
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
															selected={currentClient.immigrationInformation.passport.withClient}
															vlaue={
																currentClient.immigrationInformation.passport.withClient ||
																passport.withClient
															}
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
															vlaue={
																currentClient.immigrationInformation.lastVisitToUS.dateOfEntry ||
																lastVisitToUS.dateOfEntry
															}
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
															vlaue={
																currentClient.immigrationInformation.lastVisitToUS.portOfEntry ||
																lastVisitToUS.portOfEntry
															}
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
															vlaue={
																currentClient.immigrationInformation.lastVisitToUS.status ||
																lastVisitToUS.status
															}
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
															selected={
																currentClient.immigrationInformation.lastVisitToUS.lawfulEntry
															}
															vlaue={
																currentClient.immigrationInformation.lastVisitToUS.lawfulEntry ||
																lastVisitToUS.lawfulEntry
															}
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
															selected={currentClient.immigrationInformation.detention.isDetained}
															vlaue={
																currentClient.immigrationInformation.detention.isDetained ||
																detention.isDetained
															}
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
															vlaue={
																currentClient.immigrationInformation.detention.dateOfArrest ||
																detention.dateOfArrest
															}
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
															vlaue={
																currentClient.immigrationInformation.detention.location ||
																detention.location
															}
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
															vlaue={
																currentClient.immigrationInformation.detention.dateOfRelease ||
																detention.dateOfRelease
															}
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
