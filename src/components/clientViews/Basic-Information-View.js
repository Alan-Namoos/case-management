import React, { useContext } from 'react';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';

const BasicInformationView = ({ client }) => {
	const { appearance } = useContext(AppearanceContext);
	const { button, notSet } = appearance;
	const history = useHistory();
	const { id, basicInformation } = client;

	return !basicInformation ? (
		<Container>
			<Row className='text-center'>
				<Col>
					<h4>Basic Information View - Client Not Found!</h4>
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
								<td>{basicInformation.mobilePhone}</td>
							</tr>
							<tr>
								<th>Home Phone:</th>
								<td>{basicInformation.homePhone || notSet}</td>
							</tr>
							<tr>
								<th>Email:</th>
								<td>{basicInformation.email || notSet}</td>
							</tr>
							<tr>
								<th>Mailing Address:</th>
								<td>{basicInformation.mailingAddress || notSet}</td>
							</tr>
							<tr>
								<th>Physical Address:</th>
								<td>{basicInformation.physicalAddress || notSet}</td>
							</tr>
						</tbody>
					</Table>
				</Card.Body>

				<Card.Footer>
					<Button
						variant='primary float-right'
						size={button}
						onClick={() => history.push(`/add-client-basic-information/${id}`)}
					>
						Edit
					</Button>
				</Card.Footer>
			</Card>
		</>
	);
};

export default BasicInformationView;
