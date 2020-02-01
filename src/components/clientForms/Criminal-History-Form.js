import React, { useState, useContext } from 'react';
import { ClientContext } from '../../contexts/ClientContext';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Form, Button, Card, Col, Row, Container } from 'react-bootstrap';

const CriminalHistoryForm = () => {
	const { size } = useContext(AppearanceContext);
	const { cardTitle, textField, button } = size;
	const { addCriminalHistory } = useContext(ClientContext);
	const [criminalHistory, setCriminalHistory] = useState({
		date: '',
		location: '',
		CaseNumber: '',
		description: ''
	});
	const handleChange = (e) => {
		setCriminalHistory({ ...criminalHistory, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addCriminalHistory(criminalHistory);
		setCriminalHistory({
			date: '',
			location: '',
			CaseNumber: '',
			description: ''
		});
	};
	return (
		<>
			<Container>
				<Row>
					<Col>
						<Card className='mb-3'>
							<Card.Header as={cardTitle}>Criminal History</Card.Header>
							<Card.Body>
								<Form onSubmit={handleSubmit}>
									<Row>
										<Col>
											<Form.Group>
												<Form.Label>Date:</Form.Label>
												<Form.Control
													type='text'
													size={textField}
													name='date'
													value={criminalHistory.date}
													onChange={handleChange}
													required
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
													value={criminalHistory.location}
													onChange={handleChange}
													required
												/>
											</Form.Group>
										</Col>
										<Col>
											<Form.Group>
												<Form.Label>Criminal Case #:</Form.Label>
												<Form.Control
													type='text'
													size={textField}
													name='CaseNumber'
													value={criminalHistory.CaseNumber}
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
													value={criminalHistory.description}
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
};

export default CriminalHistoryForm;
