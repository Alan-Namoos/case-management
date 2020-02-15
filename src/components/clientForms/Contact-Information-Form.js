import React, { useState, useContext, useEffect } from 'react';
import { ClientContext } from '../../contexts/ClientContext';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { useFindClient } from '../customHooks/useFindClient';
import { useHistory, useParams } from 'react-router-dom';
import { Form, Button, Card, Col, Row, Container } from 'react-bootstrap';

const ContactInformationForm = () => {
	const { appearance } = useContext(AppearanceContext);
	const { cardTitle, textField, button } = appearance;
	const { clients, updateClientInformation } = useContext(ClientContext);
	const history = useHistory();
	const { id } = useParams();
	const [currentClient] = useFindClient(clients, id, history); // <= custom hook
	const [contactInformation, setContactInformation] = useState({});

	useEffect(() => {
		setContactInformation(currentClient.contactInformation);
	}, [currentClient]);

	const handleChange = (e) => {
		setContactInformation({ ...contactInformation, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		updateClientInformation('contactInformation', contactInformation, id);
		history.push(`/view-client-details/${id}`);
	};

	return !contactInformation ? (
		'No Contact Information Found!'
	) : (
		<>
			<Container>
				<Row>
					<Col>
						<Card className='mb-3'>
							<Card.Header as={cardTitle}>
								{currentClient.personalInformation && currentClient.personalInformation.firstName}{' '}
								{currentClient.personalInformation && currentClient.personalInformation.lastName} -
								Contact Information
							</Card.Header>
							<Card.Body>
								<Form onSubmit={handleSubmit}>
									<Row>
										<Col>
											<Form.Group>
												<Form.Label>Mobile Phone:</Form.Label>
												<Form.Control
													type='text'
													name='mobilePhone'
													size={textField}
													value={contactInformation.mobilePhone || ''}
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
													value={contactInformation.homePhone || ''}
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
													value={contactInformation.email || ''}
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
													value={contactInformation.mailingAddress || ''}
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
													value={contactInformation.physicalAddress || ''}
													onChange={handleChange}
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

export default ContactInformationForm;
