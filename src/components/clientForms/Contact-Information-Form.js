// import React, { useState, useContext } from 'react';
// import { Form, Button, Card, Col, Row, Container } from 'react-bootstrap';
// import { ClientContext } from '../../contexts/ClientContextProvider';
// import { AppearanceContext } from '../../contexts/AppearanceContextProvider';

// const ContactInformationForm = () => {
// 	const { size } = useContext(AppearanceContext);
// 	const { cardTitle, textField, button } = size;
// 	const { client, addContactInformatioin } = useContext(ClientContext);
// 	const [contactInformation, setContactInformation] = useState(client.contactInformation);

// 	const handleChange = (e) => {
// 		setContactInformation({ ...contactInformation, [e.target.name]: e.target.value });
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		addContactInformatioin(contactInformation);
// 		setContactInformation({
// 			mobilePhone: '',
// 			homePhone: '',
// 			email: '',
// 			mailingAddress: '',
// 			physicalAddress: ''
// 		});
// 	};

// 	return (
// 		<>
// 			<Container>
// 				<Row>
// 					<Col>
// 						<Card className='mb-3'>
// 							<Card.Header as={cardTitle}>Contact Information</Card.Header>
// 							<Card.Body>
// 								<Form onSubmit={handleSubmit}>
// 									<Row>
// 										<Col>
// 											<Form.Group>
// 												<Form.Label>Mobile Phone:</Form.Label>
// 												<Form.Control
// 													type='text'
// 													name='mobilePhone'
// 													size={textField}
// 													value={contactInformation.mobilePhone}
// 													onChange={handleChange}
// 													required
// 												/>
// 											</Form.Group>
// 										</Col>
// 										<Col>
// 											<Form.Group>
// 												<Form.Label>Home Phone:</Form.Label>
// 												<Form.Control
// 													type='text'
// 													name='homePhone'
// 													size={textField}
// 													value={contactInformation.homePhone}
// 													onChange={handleChange}
// 												/>
// 											</Form.Group>
// 										</Col>
// 									</Row>

// 									<Row>
// 										<Col>
// 											<Form.Group>
// 												<Form.Label>Email Address:</Form.Label>
// 												<Form.Control
// 													type='text'
// 													name='email'
// 													size={textField}
// 													value={contactInformation.email}
// 													onChange={handleChange}
// 												/>
// 											</Form.Group>
// 										</Col>
// 									</Row>

// 									<Row>
// 										<Col>
// 											<Form.Group>
// 												<Form.Label>Mailing Address:</Form.Label>
// 												<Form.Control
// 													type='text'
// 													name='mailingAddress'
// 													size={textField}
// 													value={contactInformation.mailingAddress}
// 													onChange={handleChange}
// 												/>
// 											</Form.Group>
// 										</Col>
// 										<Col>
// 											<Form.Group>
// 												<Form.Label>Physical Address:</Form.Label>
// 												<Form.Control
// 													type='text'
// 													name='physicalAddress'
// 													size={textField}
// 													value={contactInformation.physicalAddress}
// 													onChange={handleChange}
// 												/>
// 											</Form.Group>
// 										</Col>
// 									</Row>

// 									<Button variant='primary float-right' size={button} type='submit'>
// 										Save
// 									</Button>
// 								</Form>
// 							</Card.Body>
// 						</Card>
// 					</Col>
// 				</Row>
// 			</Container>
// 		</>
// 	);
// };

// export default ContactInformationForm;
