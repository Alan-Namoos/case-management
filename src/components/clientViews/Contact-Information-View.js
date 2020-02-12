import React, { useContext } from 'react';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';

const ContactInformationView = ({ client }) => {
	const { appearance } = useContext(AppearanceContext);
	const { button, notSet } = appearance;
	const history = useHistory();
	const { id, contactInformation } = client;

	return !contactInformation ? (
		<Container>
			<Row className='text-center'>
				<Col>
					<h4>Contact Information View - Client Not Found!</h4>
					<h4>
						<Link to='/add-new-client'>+ New Client</Link>
					</h4>
				</Col>
			</Row>
		</Container>
	) : (
		<>
			<Card>
				<Card.Body>
					{/* <Table bordered striped hover size='sm'> */}
					<Table size='sm'>
						<tbody>
							<tr>
								<th width='30%'>Mobile Phone:</th>
								<td>{contactInformation.mobilePhone}</td>
							</tr>
							<tr>
								<th>Home Phone:</th>
								<td>{contactInformation.homePhone || notSet}</td>
							</tr>
							<tr>
								<th>Email:</th>
								<td>{contactInformation.email || notSet}</td>
							</tr>
							<tr>
								<th>Mailing Address:</th>
								<td>{contactInformation.mailingAddress || notSet}</td>
							</tr>
							<tr>
								<th>Physical Address:</th>
								<td>{contactInformation.physicalAddress || notSet}</td>
							</tr>
						</tbody>
					</Table>
				</Card.Body>

				<Card.Footer>
					<Row>
						<Col className='text-center'>
							<Button
								variant='primary'
								size={button}
								onClick={() => history.push(`/add-client-contact-information/${id}`)}
							>
								Edit
							</Button>
						</Col>
					</Row>
				</Card.Footer>
			</Card>
		</>
	);
};

export default ContactInformationView;
