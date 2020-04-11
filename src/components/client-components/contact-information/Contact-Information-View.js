import React, { useContext } from 'react';
import { AppearanceContext } from '../../../contexts/AppearanceContext';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import NotFound from '../other-client-views/NotFound';

const ContactInformationView = ({ client }) => {
	const { appearance } = useContext(AppearanceContext);
	const { button, notSet } = appearance;
	const history = useHistory();
	const {
		mobilePhone,
		homePhone,
		email,
		mailingAddress,
		physicalAddress
	} = client.contactInformation;

	return !client.contactInformation ? (
		<NotFound
			component='Contact Information'
			action={`/add-client-contact-information/${client.id}`}
		/>
	) : (
		<>
			<Card>
				<Card.Body>
					<Table size='sm'>
						<tbody>
							<tr>
								<th width='30%'>Mobile Phone:</th>
								<td>{mobilePhone}</td>
							</tr>
							<tr>
								<th>Home Phone:</th>
								<td>{homePhone || notSet}</td>
							</tr>
							<tr>
								<th>Email:</th>
								<td>{email || notSet}</td>
							</tr>
							<tr>
								<th>Mailing Address:</th>
								<td>{mailingAddress || notSet}</td>
							</tr>
							<tr>
								<th>Physical Address:</th>
								<td>{physicalAddress || notSet}</td>
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
								onClick={() => history.push(`/add-client-contact-information/${client.id}`)}
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
