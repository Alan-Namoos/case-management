import React, { useState, useEffect, useContext } from 'react';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import NotFound from './NotFound';
import { ClientContext } from '../../contexts/ClientContext';
import { orderBy } from 'lodash';

const NotesView = ({ client }) => {
	const { appearance } = useContext(AppearanceContext);
	const { button } = appearance;
	const { updateClientNotes } = useContext(ClientContext);
	const history = useHistory();
	const [sortedNotes, setSortedNotes] = useState(null);

	const deleteNote = (noteID) => {
		if (noteID) {
			const noteIndex = client.notes.findIndex((note) => {
				return noteID === note.noteID;
			});

			const updatedNotes = client.notes.filter((note, index) => {
				return noteIndex !== index;
			});
			updateClientNotes('notes', updatedNotes, client.id);
		}
	};

	useEffect(() => {
		if (client.notes) {
			console.log('client.notes: ', client.notes);
			const notesWithconvertedDates = client.notes.map((note) => {
				return { ...note, date: note.date.toDate() };
			});
			console.log('notesWithconvertedDates: ', notesWithconvertedDates);
			const notesSorted = orderBy(notesWithconvertedDates, ['date'], ['desc']);
			setSortedNotes(notesSorted);
		}
	}, [client.notes]);

	// return client.notes.length === 0 ? (
	return !sortedNotes ? (
		<NotFound component='Notes' action={`/add-client-note/${client.id}`} />
	) : (
		<>
			<Card className='mb-3'>
				<Card.Body>
					{sortedNotes.map((note, i) => {
						return (
							<Card style={{ width: '70%', margin: '0 auto 20px' }} key={note.noteID}>
								<Card.Body>
									<Card.Title>
										<Row>
											<Col>{note.title}</Col>
										</Row>
									</Card.Title>
									<Card.Text style={{ whiteSpace: 'pre-wrap' }}>{note.text}</Card.Text>
								</Card.Body>
								<Card.Footer>
									<Row>
										<Col>
											<i className='note-date'>{note.date.toDateString()}</i>
										</Col>
										<Col className='text-right'>
											<Button
												variant='link'
												size={button}
												onClick={() =>
													history.push(`/edit-client-note/${client.id}/${note.noteID}`)
												}
											>
												<i className='far fa-edit'></i> Edit
											</Button>
											{'  '}
											<Button variant='link' size={button} onClick={() => deleteNote(note.noteID)}>
												<i className='far fa-trash-alt'></i> Delete
											</Button>
										</Col>
									</Row>
								</Card.Footer>
							</Card>
						);
					})}
				</Card.Body>
				<Card.Footer>
					<Row>
						<Col className='text-center'>
							<Button
								variant='primary'
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
