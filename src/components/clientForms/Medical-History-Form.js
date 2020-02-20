import React, { useState, useContext } from 'react';
import { ClientContext } from '../../contexts/ClientContext';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { useHistory, useParams } from 'react-router-dom';
import { useFindClient } from '../customHooks/useFindClient';
import { Form, Button, Card, Col, Row, Container } from 'react-bootstrap';

const MedicalHistoryForm = () => {
	const { appearance } = useContext(AppearanceContext);
	const { cardTitle, textField, button } = appearance;
	const { clients, updateMedicalCriminalHistoryNotes } = useContext(ClientContext);
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
		updateMedicalCriminalHistoryNotes('medicalHistory', medicalHistory, id);
		history.push(`/view-client-details/${id}`);
	};

	if (!medicalHistory) {
		return 'No Medical History Found!';
	} else {
		return (
			<>
				<Container>
					<Row>
						<Col>
							<Card className='mb-3'>
								<Card.Header as={cardTitle}>
									{currentClient.personalInformation && currentClient.personalInformation.firstName}{' '}
									{currentClient.personalInformation && currentClient.personalInformation.lastName}{' '}
									- Medical History
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
	}
};
export default MedicalHistoryForm;
