import React from 'react';
import { Result } from './modules/Result.jsx';

export class Results extends React.Component {
    render() {
        const { errors, robots, winner } = this.props;
        const errImg = <img alt="sad robot" className="error-image" src="/images/robots/errors/sad-robot-secondary.jpg" />
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
        return (
            <div className="results-container">{errors.get || errors.noRobots ? errImg : results}</div>
        );
    }
}