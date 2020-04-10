import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFound = ({ component, action }) => {
	return (
		<Row className='text-center'>
			<Col>
				<Card className='mb-5'>
					<Card.Body className='text-center'>
						<h5>{component} Not Found!</h5>
						<div>
							{action && <Link to={action}> + {component}</Link>} |{' '}
							<Link to='/add-new-client'>Add New Client</Link> | <Link to='/'>Home</Link>
						</div>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	);
};

export default NotFound;
