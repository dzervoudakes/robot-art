import React from 'react';
import PropTypes from 'prop-types';
import './scss/Result';

const propTypes = {
	image: PropTypes.string.isRequired,
	votes: PropTypes.number.isRequired,
	winner: PropTypes.number.isRequired
};

const Result = ({ image, votes, winner }) => {
	const width = votes > 0 ? `${(votes / winner) * 100}%` : '1px';
	const percentageBarStyles = { width: width };
	return (
		<table cellSpacing="0" className="result">
			<tbody>
				<tr>
					<td className="left-col">
						<div className="avatar-container">
							<img alt={name} className="robot-avatar" src={image} />
						</div>
						<p className="vote-count">{votes}</p>
					</td>
					<td className="right-col">
						<div className="vote-percentage-bar" style={percentageBarStyles}></div>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

Result.propTypes = propTypes;
export default Result;
