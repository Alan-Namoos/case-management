import React, { useState, useContext } from 'react';
import { Form, Button, Card, Col, Row, Container } from 'react-bootstrap';
import { ClientContext } from '../../contexts/ClientContext';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { useHistory } from 'react-router-dom';

const NewClientForm = () => {
	const { appearance } = useContext(AppearanceContext);
	const { cardTitle, textField, button } = appearance;
	const { newClient } = useContext(ClientContext);
	const [basicInformation, setBasicInformation] = useState({
		firstName: '',
		lastName: '',
		aNumber: '',
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

	const handleBasicInformationChange = (e) => {
		setBasicInformation({ ...basicInformation, [e.target.name]: e.target.value });
	};

	const handleImmigrationInformationChange = (e) => {
		setImmigrationInformationStatus({
			...immigrationInformationStatus,
			[e.target.name]: e.target.value
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		newClient(basicInformation, immigrationInformationStatus);
		setBasicInformation({
			firstName: '',
			lastName: '',
			aNumber: '',
			mobilePhone: '',
			homePhone: '',
			email: '',
			mailingAddress: '',
			physicalAddress: ''
		});
		history.push('/view-new-client-information');
	};

	const saveAndContinue = () => {
		newClient(basicInformation);

		history.push('/add-client-personal-information');
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
													value={basicInformation.firstName || ''}
													onChange={handleBasicInformationChange}
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
													value={basicInformation.lastName || ''}
													onChange={handleBasicInformationChange}
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
													value={basicInformation.mobilePhone || ''}
													onChange={handleBasicInformationChange}
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
													value={basicInformation.homePhone || ''}
													onChange={handleBasicInformationChange}
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
													value={basicInformation.email || ''}
													onChange={handleBasicInformationChange}
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
													value={basicInformation.mailingAddress || ''}
													onChange={handleBasicInformationChange}
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
													value={basicInformation.physicalAddress || ''}
													onChange={handleBasicInformationChange}
												/>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col className='text-center'>
											<Button variant='primary' size={button} type='submit'>
												Save -> Exit
											</Button>{' '}
											<Button variant='primary' size={button} onClick={saveAndContinue}>
												Save -> Add Personal Information
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
