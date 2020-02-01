import React, { useContext } from 'react';
// import { ClientContext } from '../../contexts/ClientContextProvider';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const PersonalInformationView = ({ client }) => {
	const { size } = useContext(AppearanceContext);
	const { cardTitle, button } = size;
	const history = useHistory();

	console.log('Personal-Information-View.js - client: ', client);
	const {
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

	const viewClient = (id) => {
		history.push(`/add-client-personal-information/${id}`);
	};

	return client.personalInformation === {} ? (
		<>
			<h5>No Personal Information Found</h5>
			<h5>
				<Link
					to={{
						pathname: '/add-client-personal-information',
						state: client
					}}
				>
					+ Personal Information
				</Link>
			</h5>
		</>
	) : (
		<>
			<Card className='mb-3'>
				<Card.Header as={cardTitle}>Personal Information</Card.Header>
				<Card.Body>
					<Table bordered striped hover size='sm'>
						<tbody>
							<tr>
								<th width='50%'>Also Known As</th>
								<td>{otherNamesUsed || 'Not set'}</td>
							</tr>

							<tr>
								<th>Date of Birth</th>
								<td>{dateOfBirth || 'Not set'}</td>
							</tr>

							<tr>
								<th>Country of Birth</th>
								<td>{countryOfBirth || 'Not set'}</td>
							</tr>

							<tr>
								<th>Country of Residence</th>
								<td>{countryOfResidence || 'Not set'}</td>
							</tr>

							<tr>
								<th>Nationality at Birth</th>
								<td>{nationalityAtBirth || 'Not set'}</td>
							</tr>

							<tr>
								<th>Current Nationality</th>
								<td>{currentNationality || 'Not set'}</td>
							</tr>

							<tr>
								<th>Marital Status</th>
								<td>{maritalStatus || 'Not set'}</td>
							</tr>

							<tr>
								<th>Number of Children</th>
								<td>{numberOfChildren || 'Not set'}</td>
							</tr>

							<tr>
								<th>Religion and Sect</th>
								<td>{religionAndSect || 'Not set'}</td>
							</tr>

							<tr>
								<th>Race - Ethnicity - Tribal Group</th>
								<td>{raceEthnicityTribalGroup || 'Not set'}</td>
							</tr>

							<tr>
								<th>Languages and Fluency</th>
								<td>{languagesAndFluency || 'Not set'}</td>
							</tr>

							<tr>
								<th>Best Language</th>
								<td>{bestLanguage || 'Not set'}</td>
							</tr>

							<tr>
								<th>Employer</th>
								<td>{employer || 'Not set'}</td>
							</tr>

							<tr>
								<th>Job Title</th>
								<td>{jobTitle || 'Not set'}</td>
							</tr>

							<tr>
								<th>Role</th>
								<td>{role || 'Not set'}</td>
							</tr>

							<tr>
								<th>Gender</th>
								<td>{gender || 'Not set'}</td>
							</tr>
						</tbody>
					</Table>
				</Card.Body>
				<Card.Footer>
					<Button variant='primary float-right' size={button} onClick={() => viewClient(client.id)}>
						Edit
					</Button>
				</Card.Footer>
			</Card>
		</>
	);
};

export default PersonalInformationView;
