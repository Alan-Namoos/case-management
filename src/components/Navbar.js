import React from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
	return (
		<nav className='nav bg-light mb-3'>
			<Link className='nav-link' to='/'>
				Home
			</Link>
			<Link className='nav-link' to='/add-new-client'>
				+ New Client
			</Link>

			{/* <Link className='nav-link' to='/add-client-personal-information'>
				Personal Information
			</Link>
			<Link className='nav-link' to='/add-client-contact-information'>
				Contact Information
			</Link>
			<Link className='nav-link' to='/add-client-immigration-information'>
				Immigration Information
			</Link>
			<Link className='nav-link' to='/add-client-medical-history'>
				Medical History
			</Link>
			<Link className='nav-link' to='/add-client-criminal-history'>
				Criminal History
			</Link> */}
		</nav>
	);
};

export default Navbar;
