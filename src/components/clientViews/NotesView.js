import React, { useContext } from 'react';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import NotFound from './NotFound';

const NotesView = ({ client }) => {
	const { appearance } = useContext(AppearanceContext);
	const { button } = appearance;

	const history = useHistory();

	return client.notes.length === 0 ? (
		<NotFound component='Notes' action={`/add-client-note/${client.id}`} />
	) : (
		<>
			<Card className='mb-3'>
				<Card.Body>
					{client.notes.map((note, i) => {
						return (
							<Card style={{ width: '50%', marginBottom: '20px' }} key={i}>
								<Card.Body>
									<Card.Title>
										{note.title} - {note.date}
									</Card.Title>
									<Card.Text>{note.text}</Card.Text>
									<Card.Link href='#'>Edit</Card.Link>
									<Card.Link href='#'>Delete</Card.Link>
								</Card.Body>
							</Card>
						);
					})}
				</Card.Body>
				<Card.Footer>
					<Row>
						<Col className='text-center'>
							<Button
								variant='primary float-right'
								size={button}
								onClick={() => {
									history.push(`/add-client-note/${client.id}`);
								}}
							>
								Add New Note
							</Button>
						</Col>
					</Row>
				</Card.Footer>
			</Card>
		</>
	);
};

export default NotesView;
