import React, { useState, useContext, useEffect } from 'react';
import { ClientContext } from '../../contexts/ClientContext';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { useHistory, useParams } from 'react-router-dom';
import { useFindClient } from '../customHooks/useFindClient';
import { Form, Button, Card, Col, Row, Container } from 'react-bootstrap';

const PersonalInformationForm = () => {
	const { size } = useContext(AppearanceContext);
	const { cardTitle, textField, button } = size;
	const { clients, addPersonalInformation } = useContext(ClientContext);
	const history = useHistory();
	const { id } = useParams();
	const [currentClient] = useFindClient(clients, id, history); // <= custom hook
	const [personalInformation, setPersonalInformation] = useState({});

	useEffect(() => {
		setPersonalInformation(currentClient.personalInformation);
	}, [currentClient]);

	const handleChange = (e) => {
		setPersonalInformation({ ...personalInformation, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addPersonalInformation(personalInformation, id);
		history.push('/');
	};

	if (!personalInformation) {
		return 'Client Not Found - [Personal Information]';
	} else {
		// return 'Client Found';
		return (
			<Container>
				<Row>
					<Col>
						<Card className='mb-3'>
							<Card.Header as={cardTitle}>
								{currentClient.basicInformation && currentClient.basicInformation.firstName}{' '}
								{currentClient.basicInformation && currentClient.basicInformation.lastName} -
								Personal Information
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
													value={personalInformation.otherNamesUsed}
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
													value={personalInformation.dateOfBirth}
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
													value={personalInformation.countryOfBirth}
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
													value={personalInformation.countryOfResidence}
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
													value={personalInformation.nationalityAtBirth}
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
													value={personalInformation.currentNationality}
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
													value={personalInformation.maritalStatus}
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
													value={personalInformation.numberOfChildren}
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
													value={personalInformation.religionAndSect}
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
													value={personalInformation.raceEthnicityTribalGroup}
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
													value={personalInformation.languagesAndFluency}
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
													value={personalInformation.bestLanguage}
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
													value={personalInformation.employer}
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
													value={personalInformation.jobTitle}
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
													value={personalInformation.role}
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
													value={personalInformation.gender}
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
	}
};

export default PersonalInformationForm;
