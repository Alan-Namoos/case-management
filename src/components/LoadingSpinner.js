import React from 'react';
// import { css } from '@emotion/core';
import { PulseLoader } from 'react-spinners';
import { Container, Row, Col } from 'react-bootstrap';

const LoadingSpinner = () => {
	// const override = css`
	// 	display: block;
	// 	margin: 0 auto;
	// `;
	return (
		<Container>
			<Row>
				<Col className='text-center'>
					<PulseLoader
						css='override'
						size={20}
						//size={"20px"} this also works
						color={'#3678D7'}
						loading={true}
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default LoadingSpinner;
