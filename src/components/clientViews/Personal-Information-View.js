import React, { useContext } from 'react';
// import { ClientContext } from '../../contexts/ClientContextProvider';
import { AppearanceContext } from '../../contexts/AppearanceContext';
import { Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const PersonalInformationView = ({ client }) => {
	const { appearance } = useContext(AppearanceContext);
	const { button, notSet } = appearance;
	const history = useHistory();

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

	return client.personalInformation === {} ? (
		<>
			<h5>No Personal Information Found</h5>
			<h5>
				<Link to={`/add-client-personal-information/${client.id}`}>+ Personal Information</Link>
			</h5>
		</>
	) : (
		<>
			<Card className='mb-3'>
				<Card.Body>
					{/* <Table bordered striped hover size='sm'> */}
					<Table bordered size='sm'>
						<tbody>
							<tr>
								<th width='50%'>Also Known As:</th>
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
					<Button
						variant='primary float-right'
						size={button}
						onClick={() => history.push(`/add-client-personal-information/${client.id}`)}
					>
						Edit
					</Button>
				</Card.Footer>
			</Card>
		</>
	);
};

export default PersonalInformationView;
