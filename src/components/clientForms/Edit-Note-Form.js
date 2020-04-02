import React, { useState, useEffect, useContext } from 'react';
import { ClientContext } from '../../contexts/ClientContext';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { useHistory, useParams } from 'react-router-dom';
import { useFindClient } from '../customHooks/useFindClient';
import { Form, Button, Card, Col, Row, Container } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

const EditNoteForm = () => {
	const { appearance } = useContext(AppearanceContext);
	const { cardTitle, textField, button } = appearance;
	const { clients, updateClientNotes } = useContext(ClientContext);
	const history = useHistory();
	const { id, noteID } = useParams();
	const [currentClient] = useFindClient(clients, id, history); // <= custom hook
	const [note, setNote] = useState({
		noteID: '',
		date: '',
		title: '',
		text: ''
	});

	const [notesWithEditNoteRemoved, setNotesWithEditNoteRemoved] = useState([]);
	const [finalUpdatedNotes, setFinalUpdatedNotes] = useState(null);
	// const [startDate, setStartDate] = useState(new Date());

	const handleChange = (e) => {
		setNote({ ...note, [e.target.name]: e.target.value });
	};

	const handleDateChange = (date) => {
		// setStartDate(date);
		setNote({ ...note, date: date });
		console.log('DatePicker date: ', date);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		updateClientNotes('notes', finalUpdatedNotes, id);
		history.push(`/view-client-details/${id}`);
	};

	useEffect(() => {
		if (currentClient.notes && noteID) {
			const notesWithconvertedDates = currentClient.notes.map((note) => {
				return { ...note, date: note.date.toDate() };
			});
			const noteIndex = notesWithconvertedDates.findIndex((note) => {
				return noteID === note.noteID;
			});

			const foundNoteToEdit = notesWithconvertedDates[noteIndex];
			const notesWithoutEditNote = notesWithconvertedDates.filter((note, index) => {
				return noteIndex !== index;
			});
			setNotesWithEditNoteRemoved(notesWithoutEditNote);
			setNote(foundNoteToEdit);
		}
	}, [currentClient.notes, noteID]);

	useEffect(() => {
		setFinalUpdatedNotes([...notesWithEditNoteRemoved, note]);
	}, [notesWithEditNoteRemoved, note]);
	console.log('note.date: ', note.date);
	return !note ? (
		'No Note Found'
	) : (
		<>
			<Container>
				<Row>
					<Col>
						<Card className='mb-3'>
							<Card.Header as={cardTitle}>
								{currentClient.personalInformation && currentClient.personalInformation.firstName}{' '}
								{currentClient.personalInformation && currentClient.personalInformation.lastName} -
								Notes
							</Card.Header>
							<Card.Body>
								<Form onSubmit={handleSubmit}>
									<Row>
										<Col md={4}>
											{/* <DatePicker selected={startDate} onChange={handleDateChange} /> */}
											<Form.Group>
												<Form.Label>Date:</Form.Label>
												<DatePicker
													// selected={startDate}
													selected={note.date}
													onChange={handleDateChange}
													className='form-control form-control-sm'
													showMonthDropdown
													showYearDropdown
													dropdownMode='select'
												/>
												{/* <Form.Control
													type='text'
													size={textField}
													name='date'
													value={note.date}
													onChange={handleChange}
													required
												/> */}
											</Form.Group>
										</Col>
										<Col md={8}>
											<Form.Group>
												<Form.Label>Title:</Form.Label>
												<Form.Control
													type='text'
													size={textField}
													name='title'
													value={note.title}
													onChange={handleChange}
													required
												/>
											</Form.Group>
										</Col>
									</Row>

									<Row>
										<Col>
											<Form.Group>
												<Form.Label>Note:</Form.Label>
												<Form.Control
													as='textarea'
													rows='3'
													name='text'
													value={note.text}
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

export default EditNoteForm;
