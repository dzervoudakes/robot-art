import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';
import Admin from '@/components/admin';
import NewAccount from '@/components/account';
import Login from '@/components/login';
import Results from '@/components/results';
import Robots from '@/components/robots';
import Missing from '@/components/missing';

// @TODO: REFACTOR ME PER THE OTHER APPS

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
		<Route exact path="/">
			<Login
				getAllUsers={ getAllUsers }
				openModal={ openModal }
			/>
		</Route>
		<Route exact path="/admin">
			<Admin
				errors={ errors }
				openModal={ openModal }
				robots={ robots }
				updateRobots={ updateRobotState }
			/>
		</Route>
		<Route exact path="/create-account">
			<NewAccount
				getAllUsers={ getAllUsers }
				openModal={ openModal }
			/>
		</Route>
		<Route exact path="/results">
			<Results
				errors={ errors }
				robots={ robots }
				winner={ winner }
			/>
		</Route>
		<Route exact path="/robots">
			<Robots
				errors={ errors }
				openModal={ openModal }
				robots={ robots }
				updateRobots={ updateRobotState }
			/>
		</Route>
		<Route component={ Missing } />
	</Switch>
);

Routes.propTypes = propTypes;

export default Routes;
