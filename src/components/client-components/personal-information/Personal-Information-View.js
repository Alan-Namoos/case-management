import React, { useContext } from 'react';
import { AppearanceContext } from '../../../contexts/AppearanceContext';
import { Card, Table, Button, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import NotFound from '../other-client-views/NotFound';

const PersonalInformationView = ({ client }) => {
	const { appearance } = useContext(AppearanceContext);
	const { button, notSet } = appearance;
	const history = useHistory();
	const {
		firstName,
		lastName,
		otherNamesUsed,
		dateOfBirth,
		countryOfBirth,
		countryOfResidence,
		nationalityAtBirth,
		currentNationality,
		maritalStatus,
		numberOfChildren,
		religionAndSect,
		raceEthnicityTribalGroup,
		languagesAndFluency,
		bestLanguage,
		employer,
		jobTitle,
		role,
		gender
	} = client.personalInformation;

	return !client.personalInformation ? (
		<NotFound
			component='Medical History'
			action={`/add-client-personal-information/${client.id}`}
		/>
	) : (
		<>
			<Card className='mb-3'>
				<Card.Body>
					{/* <Table bordered striped hover size='sm'> */}
					<Table bordered size='sm'>
						<tbody>
							<tr>
								<th width='50%'>Name</th>
								<td>
									{firstName} {lastName}
								</td>
							</tr>
							<tr>
								<th>Other Names Used:</th>
								<td>{otherNamesUsed || notSet}</td>
							</tr>

							<tr>
								<th>Date of Birth:</th>
								<td>{dateOfBirth || notSet}</td>
							</tr>

							<tr>
								<th>Country of Birth:</th>
								<td>{countryOfBirth || notSet}</td>
							</tr>

							<tr>
								<th>Country of Residence:</th>
								<td>{countryOfResidence || notSet}</td>
							</tr>

							<tr>
								<th>Nationality at Birth:</th>
								<td>{nationalityAtBirth || notSet}</td>
							</tr>

							<tr>
								<th>Current Nationality:</th>
								<td>{currentNationality || notSet}</td>
							</tr>

							<tr>
								<th>Marital Status:</th>
								<td>{maritalStatus || notSet}</td>
							</tr>

							<tr>
								<th>Number of Children:</th>
								<td>{numberOfChildren || notSet}</td>
							</tr>

							<tr>
								<th>Religion and Sect:</th>
								<td>{religionAndSect || notSet}</td>
							</tr>

							<tr>
								<th>Race - Ethnicity - Tribal Group:</th>
								<td>{raceEthnicityTribalGroup || notSet}</td>
							</tr>

							<tr>
								<th>Languages and Fluency:</th>
								<td>{languagesAndFluency || notSet}</td>
							</tr>

							<tr>
								<th>Best Language:</th>
								<td>{bestLanguage || notSet}</td>
							</tr>

							<tr>
								<th>Employer:</th>
								<td>{employer || notSet}</td>
							</tr>

							<tr>
								<th>Job Title:</th>
								<td>{jobTitle || notSet}</td>
							</tr>

							<tr>
								<th>Role:</th>
								<td>{role || notSet}</td>
							</tr>

							<tr>
								<th>Gender:</th>
								<td>{gender || notSet}</td>
							</tr>
						</tbody>
					</Table>
				</Card.Body>
				<Card.Footer>
					<Row>
						<Col className='text-center'>
							<Button
								variant='primary text-center'
								size={button}
								onClick={() => history.push(`/add-client-personal-information/${client.id}`)}
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

export default PersonalInformationView;
