import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { RobotCard } from '@/components/common';
import './scss/Robots';

const propTypes = {
	robots: PropTypes.array.isRequired,
	updateRobots: PropTypes.func.isRequired,
	openModal: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired
};

class Robots extends React.PureComponent {
	postRobotData() {
		const { robots } = this.props;
		const opts = { robots: robots };
		return axios.post('/api/robots', opts);
	}

	updateVotes = e => {
		const target = e.target;
		if (!target.classList.contains('disabled')) {
			const { robots, updateRobots } = this.props;
			const index = e.target.getAttribute('data-index');
			robots[index].votes++;
			return this.postRobotData()
				.then(resp => {
					updateRobots(robots);
					// @TODO: REPLACE THIS WITH SOMETHING STATE RELATED
					target.classList.remove('primary');
					target.classList.add('disabled');
					target.innerHTML = 'Vote Cast';
				}).catch(err => {
					console.log(err);
					const { openModal } = this.props;
					const opts = {
						errors: { post: true },
						message: 'There was an error saving the votes, :sadrobot:',
						title: 'That\'s an error...'
					};
					openModal(opts);
				});
		}
	}

	render() {
		const { errors, robots } = this.props;
		const errImg = <img alt="sad robot"
			className="error-image"
			src="/img/robots/errors/sad-robot-primary.jpg"
		/>
		let bots = [];
		if (robots.length > 0) {
			bots = robots.map((bot, index) =>
				<RobotCard
					action="display"
					index={ index }
					isAdmin={ false }
					key={ index }
					name={ bot.name }
					updateVotes={ this.updateVotes }
					image={ bot.image }
				/>
			);
		}
		const markup = errors.get || errors.noRobots ? errImg : bots;
		return <div className="robots-container">{ markup }</div>;
	}
}

Robots.propTypes = propTypes;

export default Robots;
