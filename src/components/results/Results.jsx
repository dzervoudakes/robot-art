import React from 'react';
import PropTypes from 'prop-types';
import Result from './Result';

const propTypes = {
	errors: PropTypes.object.isRequired,
	robots: PropTypes.array.isRequired,
	winner: PropTypes.number.isRequired
};

const Results = ({ errors, robots, winner }) => {
	const errImg = <img alt="sad robot"
		className="error-image"
		src="/images/robots/errors/sad-robot-secondary.jpg" />
	const newRobotsArray = robots.slice(0);
	newRobotsArray.sort((a, b) => b.votes - a.votes);
	let results = [];
	if (robots.length > 0) {
		results = newRobotsArray.map((bot, index) =>
			<Result
				key={index}
				image={bot.image}
				votes={bot.votes}
				winner={winner}
			/>
		);
	}
	const markup = errors.get || errors.noRobots ? errImg : results;
	return <div className="results-container">{markup}</div>;
};

Results.propTypes = propTypes;

export default Results;