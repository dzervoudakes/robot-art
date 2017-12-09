import React from 'react';
import { RobotCard } from './modules/RobotCard.jsx';

const axios = require('axios');

export class Robots extends React.Component {
    constructor() {
        super();
        this.updateVotes = this.updateVotes.bind(this);
    }

    postRobotData() {
        return axios.post('/api/update-robots', this.props.robots);
    }

    updateVotes(e) {
        const target = e.target;
        if (!target.classList.contains('disabled')) {
            const { robots, updateRobots } = this.props;
            const index = e.target.getAttribute('data-index');
            robots[index].votes++;
            updateRobots(robots);
            this.postRobotData().then(resp => {
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
        const errImg = <img alt="sad robot" className="error-image" src="/images/robots/errors/sad-robot-primary.jpg" />
        const bots = robots.map((bot, index) =>
            <RobotCard
                index={index}
                key={index}
                name={bot.name}
                onClick={this.updateVotes}
                image={bot.image}
            />
        );
        return (
            <div className="robots-container">{errors.get ? errImg : bots}</div>
        );
    }
}