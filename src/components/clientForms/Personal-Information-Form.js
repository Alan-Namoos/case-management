import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Card, Col, Row, Container } from 'react-bootstrap';
import { ClientContext } from '../../contexts/ClientContext';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { useHistory, useParams } from 'react-router-dom';
import { useFindClient } from '../customHooks/useFindClient';

const PersonalInformationForm = () => {
	const { size } = useContext(AppearanceContext);
	const { cardTitle, textField, button } = size;
	const { clients, addPersonalInformation } = useContext(ClientContext);
	// const [currentClient, setCurrentClient] = useState({});
	// const [clientFound, setClientFound] = useState(false);
	const [personalInformation, setPersonalInformation] = useState({});
	const history = useHistory();
	const { id } = useParams();
	const [clientFound, currentClient] = useFindClient(clients, id, history);

	// useEffect(() => {
	// 	setClientFound(false);
	// 	if (clients.length === 0) {
	// 		history.push('/');
	// 		return;
	// 	}
	// 	const client = clients.find((arrayClient) => {
	// 		return arrayClient.id === id;
	// 	});
	// 	if (client) {
	// 		setClientFound(true);
	// 		setCurrentClient(client);
	// 		setPersonalInformation(client.personalInformation);
	// 	}
	// }, [clients, id, history]);

	const handleChange = (e) => {
		setPersonalInformation({ ...personalInformation, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addPersonalInformation(personalInformation, id);
		setPersonalInformation({
			otherNamesUsed: '',
			dateOfBirth: '',
			countryOfBirth: '',
			countryOfResidence: '',
			nationalityAtBirth: '',
			currentNationality: '',
			maritalStatus: '',
			numberOfChildren: '',
			religionAndSect: '',
			raceEthnicityTribalGroup: '',
			languagesAndFluency: '',
			bestLanguage: '',
			employer: '',
			jobTitle: '',
			role: '',
			gender: ''
		});
		history.push('/');
	};

	return !!!clientFound ? (
		'Not Found'
	) : (
		<Container>
			<Row>
				<Col>
					<Card className='mb-3'>
						<Card.Header as={cardTitle}>
							{currentClient.basicInformation.firstName || ''}{' '}
							{currentClient.basicInformation.lastName || ''} - Personal Information
						</Card.Header>
						<Card.Body>
							<Form onSubmit={handleSubmit}>
								<Row>
									<Col>
										<Form.Group>
											<Form.Label>
												Other Names Used: <i>{'(if any)'}</i>
											</Form.Label>
											<Form.Control
												type='text'
												size={textField}
												name='otherNamesUsed'
												value={
													currentClient.personalInformation.otherNamesUsed ||
													personalInformation.otherNamesUsed
												}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>

									<Col>
										<Form.Group>
											<Form.Label>Date of Birth:</Form.Label>
											<Form.Control
												type='text'
												size={textField}
												name='dateOfBirth'
												value={
													currentClient.personalInformation.dateOfBirth ||
													personalInformation.dateOfBirth
												}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>
								</Row>

								<Row>
									<Col>
										<Form.Group>
											<Form.Label>Country of Birth:</Form.Label>
											<Form.Control
												type='text'
												size={textField}
												name='countryOfBirth'
												value={
													currentClient.personalInformation.countryOfBirth ||
													personalInformation.countryOfBirth
												}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group>
											<Form.Label>Country of Residence:</Form.Label>
											<Form.Control
												type='text'
												size={textField}
												name='countryOfResidence'
												value={
													currentClient.personalInformation.countryOfResidence ||
													personalInformation.countryOfResidence
												}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>
								</Row>

								<Row>
									<Col>
										<Form.Group>
											<Form.Label>Nationality at Birth:</Form.Label>
											<Form.Control
												type='text'
												size={textField}
												name='nationalityAtBirth'
												value={
													currentClient.personalInformation.nationalityAtBirth ||
													personalInformation.nationalityAtBirth
												}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group>
											<Form.Label>Current Nationality:</Form.Label>
											<Form.Control
												type='text'
												size={textField}
												name='currentNationality'
												value={
													currentClient.personalInformation.currentNationality ||
													personalInformation.currentNationality
												}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>
								</Row>

								<Row>
									<Col>
										<Form.Group>
											<Form.Label>Marital Status:</Form.Label>
											<Form.Control
												type='text'
												size={textField}
												name='maritalStatus'
												value={
													currentClient.personalInformation.maritalStatus ||
													personalInformation.maritalStatus
												}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group>
											<Form.Label>
												Number of Children: <i>{'(if any)'}</i>
											</Form.Label>
											<Form.Control
												type='text'
												size={textField}
												name='numberOfChildren'
												value={
													currentClient.personalInformation.numberOfChildren ||
													personalInformation.numberOfChildren
												}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>
								</Row>

								<Row>
									<Col>
										<Form.Group>
											<Form.Label>Religion and Sect:</Form.Label>
											<Form.Control
												type='text'
												size={textField}
												name='religionAndSect'
												value={
													currentClient.personalInformation.religionAndSect ||
													personalInformation.religionAndSect
												}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group>
											<Form.Label>Race - Ethnicity - Tribal Group:</Form.Label>
											<Form.Control
												type='text'
												size={textField}
												name='raceEthnicityTribalGroup'
												value={
													currentClient.personalInformation.raceEthnicityTribalGroup ||
													personalInformation.raceEthnicityTribalGroup
												}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>
								</Row>

								<Row>
									<Col>
										<Form.Group>
											<Form.Label>Languages and Fluency:</Form.Label>
											<Form.Control
												type='text'
												size={textField}
												name='languagesAndFluency'
												value={
													currentClient.personalInformation.languagesAndFluency ||
													personalInformation.languagesAndFluency
												}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group>
											<Form.Label>Best Language:</Form.Label>
											<Form.Control
												type='text'
												size={textField}
												name='bestLanguage'
												value={
													currentClient.personalInformation.bestLanguage ||
													personalInformation.bestLanguage
												}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>
								</Row>

								<Row>
									<Col>
										<Form.Group>
											<Form.Label>Employer:</Form.Label>
											<Form.Control
												type='text'
												size={textField}
												name='employer'
												value={
													currentClient.personalInformation.employer || personalInformation.employer
												}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group>
											<Form.Label>Job Title:</Form.Label>
											<Form.Control
												type='text'
												size={textField}
												name='jobTitle'
												value={
													currentClient.personalInformation.jobTitle || personalInformation.jobTitle
												}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>
								</Row>

								<Row>
									<Col>
										<Form.Group>
											<Form.Label>Role:</Form.Label>
											<Form.Control
												type='text'
												size={textField}
												name='role'
												value={currentClient.personalInformation.role || personalInformation.role}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>
									<Col>
										<Form.Group>
											<Form.Label>Gender:</Form.Label>
											<Form.Control
												type='text'
												size={textField}
												name='gender'
												value={
													currentClient.personalInformation.gender || personalInformation.gender
												}
												onChange={handleChange}
											/>
										</Form.Group>
									</Col>
								</Row>

								<Button variant='primary float-right' size={button} type='submit'>
									Save
								</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default PersonalInformationForm;
