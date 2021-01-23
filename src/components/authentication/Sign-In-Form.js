import React, { useState, useContext } from 'react';
import { Form, Button, Card, Col, Row, Container } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';

const SignInForm = () => {
	const { userSignIn } = useContext(AuthContext);
	const [credentials, setCredentials] = useState({
		userName: '',
		password: '',
	});

	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault(credentials.userName);
		userSignIn(credentials.userName, credentials.password);
	};

	return (
		<>
			<Container>
				<Row className='justify-content-md-center'>
					<Col xs='10' md='8' lg='6'>
						<Card className='mb-3'>
							<Card.Header className='text-center'>
								<h2>Sign In</h2>
							</Card.Header>
							<Card.Body>
								<Form onSubmit={handleSubmit}>
									<Row>
										<Col>
											<Form.Group>
												<Form.Label>Username:</Form.Label>
												<Form.Control
													type='text'
													name='userName'
													value={credentials.userName || ''}
													onChange={handleChange}
													required
												/>
											</Form.Group>

											<Form.Group>
												<Form.Label>Password:</Form.Label>
												<Form.Control
													type='password'
													name='password'
													value={credentials.password || ''}
													onChange={handleChange}
												/>
											</Form.Group>
										</Col>
									</Row>

									<Row>
										<Col className='text-center'>
											<Button variant='primary' size='md' block type='submit'>
												Sign in
											</Button>{' '}
											{/* <Button
												variant='light'
												size={button}
												onClick={() => history.push(`/view-client-details/${id}`)}
											>
												Cancel
											</Button> */}
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

export default SignInForm;
