import React, { useContext } from 'react';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Card, Table, Button, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const NotesView = ({ client }) => {
	const { appearance } = useContext(AppearanceContext);
	const { button, notSet } = appearance;
	const history = useHistory();

	return client.notes.length === 0 ? (
		<>
			<Card className='mb-5'>
				<Card.Body className='text-center'>
					<h5>No Notes found</h5>
					<Link to={`/add-client-note/${client.id}`}>+ Add New Notes</Link>
				</Card.Body>
			</Card>
		</>
	) : (
		<>
			<Card className='mb-3'>
				{/* <Card.Header as={cardTitle}>Medical History</Card.Header> */}
				<Card.Body>
					<Table bordered striped hover size='sm'>
						<thead>
							<tr>
								<th>Date</th>
								<th>Title</th>
								<th>Text</th>
							</tr>
						</thead>
						<tbody>
							{client.notes.map((note, i) => {
								return (
									<tr key={i}>
										<td>{note.date || notSet}</td>
										<td>{note.title || notSet}</td>
										<td>{note.text || notSet}</td>
									</tr>
								);
							})}
						</tbody>
					</Table>
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
