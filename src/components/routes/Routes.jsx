import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import { Admin, CreateAccount, Login, Results, Robots } from '@/components';

const propTypes = {
	errors: PropTypes.object.isRequired,
	getAllUsers: PropTypes.func.isRequired,
	openModal: PropTypes.func.isRequired,
	robots: PropTypes.array.isRequired,
	updateRobotState: PropTypes.func.isRequired,
	winner: PropTypes.number.isRequired
};

const Routes = ({ errors, getAllUsers, openModal, robots, updateRobotState, winner }) => (
	<Switch>
		<Route path="/admin">
			<Admin
				errors={errors}
				openModal={openModal}
				robots={robots}
				updateRobots={updateRobotState}
			/>
		</Route>
		<Route path="/create-account">
			<CreateAccount
				getAllUsers={getAllUsers}
				openModal={openModal}
			/>
		</Route>
		<Route exact path="/">
			<Login
				getAllUsers={getAllUsers}
				openModal={openModal}
			/>
		</Route>
		<Route path="/results">
			<Results
				errors={errors}
				robots={robots}
				winner={winner}
			/>
		</Route>
		<Route path="/robots">
			<Robots
				errors={errors}
				openModal={openModal}
				robots={robots}
				updateRobots={updateRobotState}
			/>
		</Route>
	</Switch>
);

Routes.propTypes = propTypes;

export default Routes;