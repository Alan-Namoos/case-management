import React, { useState, useContext } from 'react';
import { Form, Button, Card, Col, Row, Container } from 'react-bootstrap';
import { ClientContext } from '../../contexts/ClientContext';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { useHistory } from 'react-router-dom';

const NewClientForm = () => {
	const { appearance } = useContext(AppearanceContext);
	const { cardTitle, textField, button } = appearance;
	const { CreateNewClient } = useContext(ClientContext);
	const [personalInformation, setPersonalInformation] = useState({
		firstName: '',
		lastName: '',
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
	const [contactInformation, setContactInformation] = useState({
		mobilePhone: '',
		homePhone: '',
		email: '',
		mailingAddress: '',
		physicalAddress: ''
	});

	const [immigrationInformationStatus, setImmigrationInformationStatus] = useState({
		aNumber: '',
		currentStatus: '',
		expirationDate: ''
	});

	const history = useHistory();

	const handlePersonalInformationChange = (e) => {
		setPersonalInformation({ ...personalInformation, [e.target.name]: e.target.value });
	};

	const handleContactInformationChange = (e) => {
		setContactInformation({ ...contactInformation, [e.target.name]: e.target.value });
	};

	const handleImmigrationInformationChange = (e) => {
		setImmigrationInformationStatus({
			...immigrationInformationStatus,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		CreateNewClient(personalInformation, contactInformation, immigrationInformationStatus);

		history.push('/view-new-client-information');
	};

	return (
		<>
			<Container>
				<Row>
					<Col>
						<Card className='mb-3'>
							<Card.Header as={cardTitle}>New Client - Basic Information</Card.Header>
							<Card.Body>
								<Form onSubmit={handleSubmit}>
									<Row>
										<Col>
											<Form.Group>
												<Form.Label>First Name:</Form.Label>
												<Form.Control
													type='text'
													name='firstName'
													size={textField}
													value={personalInformation.firstName || ''}
													onChange={handlePersonalInformationChange}
													required
												/>
											</Form.Group>
										</Col>
										<Col>
											<Form.Group>
												<Form.Label>Last Name:</Form.Label>
												<Form.Control
													type='text'
													name='lastName'
													size={textField}
													value={personalInformation.lastName || ''}
													onChange={handlePersonalInformationChange}
												/>
											</Form.Group>
										</Col>
										<Col>
											<Form.Group>
												<Form.Label>
													A-Number: <i>{'( if any )'}</i>
												</Form.Label>
												<Form.Control
													type='text'
													name='aNumber'
													size={textField}
													value={immigrationInformationStatus.aNumber || ''}
													onChange={handleImmigrationInformationChange}
												/>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col>
											<Form.Group>
												<Form.Label>Mobile Phone:</Form.Label>
												<Form.Control
													type='text'
													name='mobilePhone'
													size={textField}
													value={contactInformation.mobilePhone || ''}
													onChange={handleContactInformationChange}
													required
												/>
											</Form.Group>
										</Col>
										<Col>
											<Form.Group>
												<Form.Label>Home Phone:</Form.Label>
												<Form.Control
													type='text'
													name='homePhone'
													size={textField}
													value={contactInformation.homePhone || ''}
													onChange={handleContactInformationChange}
												/>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col>
											<Form.Group>
												<Form.Label>Email Address:</Form.Label>
												<Form.Control
													type='text'
													name='email'
													size={textField}
													value={contactInformation.email || ''}
													onChange={handleContactInformationChange}
												/>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col>
											<Form.Group>
												<Form.Label>Mailing Address:</Form.Label>
												<Form.Control
													type='text'
													name='mailingAddress'
													size={textField}
													value={contactInformation.mailingAddress || ''}
													onChange={handleContactInformationChange}
												/>
											</Form.Group>
										</Col>
										<Col>
											<Form.Group>
												<Form.Label>Physical Address:</Form.Label>
												<Form.Control
													type='text'
													name='physicalAddress'
													size={textField}
													value={contactInformation.physicalAddress || ''}
													onChange={handleContactInformationChange}
												/>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col className='text-center'>
											<Button variant='primary' size={button} type='submit'>
												Save
											</Button>{' '}
											<Button variant='primary' size={button} onClick={() => history.push('/')}>
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

export default NewClientForm;
