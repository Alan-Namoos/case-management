import React from 'react';
import { css } from '@emotion/core';
import { PulseLoader } from 'react-spinners';

const Loader = () => {
	const override = css`
		display: block;
		margin: 0 auto;
		border-color: red;
	`;
	return (
		<>
			<div className='PulseLoader'>
				<PulseLoader
					css=''
					size={20}
					//size={"150px"} this also works
					color={'#3678D7'}
					loading={true}
				/>
			</div>
		</>
	);
};

export default Loader;
