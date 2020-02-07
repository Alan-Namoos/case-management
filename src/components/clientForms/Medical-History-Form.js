import React, { useState, useContext } from 'react';
import { ClientContext } from '../../contexts/ClientContext';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { useHistory, useParams } from 'react-router-dom';
import { useFindClient } from '../customHooks/useFindClient';
import { Form, Button, Card, Col, Row, Container } from 'react-bootstrap';

const MedicalHistoryForm = () => {
	const { appearance } = useContext(AppearanceContext);
	const { cardTitle, textField, button } = appearance;
	const { clients, addMedicalHistory } = useContext(ClientContext);
	const history = useHistory();
	const { id } = useParams();
	const [currentClient] = useFindClient(clients, id, history); // <= custom hook
	const [medicalHistory, setMedicalHistory] = useState({
		date: '',
		location: '',
		description: ''
	});

	const handleChange = (e) => {
		setMedicalHistory({ ...medicalHistory, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addMedicalHistory(medicalHistory, id);
		history.push('/');
	};

	if (!medicalHistory) {
		return 'Client Not Found - [Medical History]';
	} else {
		return (
			<>
				<Container>
					<Row>
						<Col>
							<Card className='mb-3'>
								<Card.Header as={cardTitle}>
									{currentClient.basicInformation && currentClient.basicInformation.firstName}{' '}
									{currentClient.basicInformation && currentClient.basicInformation.lastName} -
									Medical History
								</Card.Header>
								<Card.Body>
									<Form onSubmit={handleSubmit}>
										<Row>
											<Col xs={4}>
												<Form.Group>
													<Form.Label>Date:</Form.Label>
													<Form.Control
														type='text'
														size={textField}
														name='date'
														value={medicalHistory.date}
														onChange={handleChange}
														required
													/>
												</Form.Group>
											</Col>
											<Col xs={8}>
												<Form.Group>
													<Form.Label>Location:</Form.Label>
													<Form.Control
														type='text'
														size={textField}
														name='location'
														value={medicalHistory.location}
														onChange={handleChange}
														required
													/>
												</Form.Group>
											</Col>
										</Row>

										<Row>
											<Col>
												<Form.Group>
													<Form.Label>Description:</Form.Label>
													<Form.Control
														type='text'
														size={textField}
														name='description'
														value={medicalHistory.description}
														onChange={handleChange}
														required
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
			</>
		);
	}
};
export default MedicalHistoryForm;
