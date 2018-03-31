import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Admin, CreateAccount, Login, Results, Robots } from '@/components';

class Routes extends React.Component {
	render() {
		const {
			errors,
			getAllUsers,
			openModal,
			robots,
			updateRobotState,
			winner
		} = this.props;
		return (
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
	}
};

export default Routes;