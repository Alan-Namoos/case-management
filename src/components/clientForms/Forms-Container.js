import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PersonalInformationForm from './Personal-Information-Form';
import ContactInformationForm from './Contact-Information-Form';
import ImmigrationInformationForm from './Immigration-Information-Form';
import MedicalHistoryForm from './Medical-History-Form';
import CriminalHistoryForm from './Criminal-History-Form';

const FormsContainer = () => {
	return (
		<>
			<Row>
				<Col>
					<PersonalInformationForm />
					<ContactInformationForm />
					<ImmigrationInformationForm />
					<MedicalHistoryForm />
					<CriminalHistoryForm />
				</Col>
			</Row>
		</>
	);
};

export default FormsContainer;
