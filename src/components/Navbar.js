import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
const Navbar = () => {
	const { user, userSignIn, userSignOut } = useContext(AuthContext);
	console.log('**** NAVBAR ****');
	return (
		<nav className='nav bg-light mb-3'>
			<Link className='nav-link' to='/'>
				Home
			</Link>
			<Link className='nav-link' to='/add-new-client'>
				+ New Client
			</Link>

			{!user && (
				<Link
					className='nav-link'
					to='/'
					onClick={() => {
						userSignIn('anzarouth.office@gmail.com', 'ZCB135adg');
					}}
				>
					Sign-in
				</Link>
			)}

			{user && (
				<Link
					className='nav-link'
					to='/sign-in'
					onClick={() => {
						userSignOut();
					}}
				>
					Sign-out
				</Link>
			)}

			{user ? <p> signed in as: {user.email}</p> : <p>You're not signed in</p>}
		</nav>
	);
};

export default Navbar;
