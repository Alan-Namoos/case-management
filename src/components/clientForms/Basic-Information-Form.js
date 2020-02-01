import React, { useState, useContext } from 'react';
import { Form, Button, Card, Col, Row, Container } from 'react-bootstrap';
import { ClientContext } from '../../contexts/ClientContext';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { useHistory } from 'react-router-dom';

const BasicInformationForm = () => {
	const { size } = useContext(AppearanceContext);
	const { cardTitle, textField, button } = size;
	const { addBasicInformation } = useContext(ClientContext);
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

	const history = useHistory();

	const handleChange = (e) => {
		setBasicInformation({ ...basicInformation, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addBasicInformation(basicInformation);
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
		history.push('/view-client-basic-information');
	};

	const saveAndContinue = () => {
		addBasicInformation(basicInformation);

		history.push('/add-client-personal-information');
	};

	return (
		<>
			<Container>
				<Row>
					<Col>
						<Card className='mb-3'>
							<Card.Header as={cardTitle}>Basic Information</Card.Header>
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
													onChange={handleChange}
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
													onChange={handleChange}
												/>
											</Form.Group>
										</Col>
										<Col>
											<Form.Group>
												<Form.Label>
													A-Number:<i>{'(if any)'}</i>
												</Form.Label>
												<Form.Control
													type='text'
													name='aNumber'
													size={textField}
													value={basicInformation.aNumber || ''}
													onChange={handleChange}
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
													onChange={handleChange}
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
													onChange={handleChange}
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
													onChange={handleChange}
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
													onChange={handleChange}
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
													onChange={handleChange}
												/>
											</Form.Group>
										</Col>
									</Row>
									<Row>
										<Col className='text-center'>
											<Button variant='primary' size={button} type='submit'>
												Done
											</Button>{' '}
											<Button variant='primary' size={button} onClick={saveAndContinue}>
												Save & continue
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

export default BasicInformationForm;
