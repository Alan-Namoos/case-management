import React, { useContext } from 'react';
import { ClientContext } from '../contexts/ClientContextProvider';
import { Table } from 'react-bootstrap';

const ClientPersonalInformationTable = () => {
	const { client } = useContext(ClientContext);

	console.log('Table component');
	console.log('client object: ', client);
	return client.personalInformation.firstName === '' ? (
		'No Information found'
	) : (
		<Table bordered hover size='sm' className='client-personal-information-table'>
			<thead>
				<tr>
					<th>Name</th>
					<th>Also Known As</th>
					<th>Date of Birth</th>
					<th>Country of Birth</th>
					<th>Country of Residence</th>
					<th>Nationality at Birth</th>
					<th>Current Nationality</th>
					<th>Marital Status</th>
					<th>Number of Children</th>
					<th>Religion and Sect</th>
					<th>Race - Ethnicity - Tribal Group</th>
					<th>Langyages and Fluency</th>
					<th>Best Language</th>
					<th>Employer</th>
					<th>Job Title</th>
					<th>Role</th>
					<th>Gender</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>
						{client.personalInformation.firstName} {client.personalInformation.lastName}
					</td>
					<td>{client.personalInformation.otherNames}</td>
					<td>{client.personalInformation.dateOfBirth}</td>
					<td>{client.personalInformation.countryOfBirth}</td>
					<td>{client.personalInformation.countryOfResidence}</td>
					<td>{client.personalInformation.nationalityAtBirth}</td>
					<td>{client.personalInformation.currentNationality}</td>
					<td>{client.personalInformation.maritalStatus}</td>
					<td>{client.personalInformation.numberOfChildren}</td>
					<td>{client.personalInformation.religionAndSect}</td>
					<td>{client.personalInformation.raceEthnicityTribalGroup}</td>
					<td>{client.personalInformation.languagesAndFluency}</td>
					<td>{client.personalInformation.bestLanguage}</td>
					<td>{client.personalInformation.employer}</td>
					<td>{client.personalInformation.jobTitle}</td>
					<td>{client.personalInformation.role}</td>
					<td>{client.personalInformation.gender}</td>
				</tr>
			</tbody>
		</Table>
	);
};

export default ClientPersonalInformationTable;
