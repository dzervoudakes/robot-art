import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// @TODO: STYLE THIS COMPONENT

const Missing = () => (
	<Fragment>
		<h3>That's a 404</h3>
		<p>You must be lost... Click <Link to="/">here</Link> to return to the main application.</p>
	</Fragment>
);

export default Missing;
