import React from 'react';
import { RobotCard } from './modules/RobotCard.jsx';

const axios = require('axios');

export class Robots extends React.Component {
    constructor() {
        super();
        this.updateVotes = this.updateVotes.bind(this);
    }

    postRobotData() {
        const opts = { robots: this.props.robots };
        return axios.post('/api/robots', opts);
    }

    updateVotes(e) {
        const target = e.target;
        if (!target.classList.contains('disabled')) {
            const { robots, updateRobots } = this.props;
            const index = e.target.getAttribute('data-index');
            robots[index].votes++;
            updateRobots(robots);
            return this.postRobotData().then(resp => {
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
                action="display"
                index={index}
                isAdmin={false}
                key={index}
                name={bot.name}
                updateVotes={this.updateVotes}
                image={bot.image}
            />
        );
        return (
            <div className="robots-container">{errors.get ? errImg : bots}</div>
        );
    }
}