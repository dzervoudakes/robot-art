import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Header, Modal, Robots, Results } from './components';
require('../sass/style.scss');

const axios = require('axios');

class RobotArt extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: {
                get: false,
                post: false
            },
            modal: {
                message: '',
                open: false,
                title: ''
            },
            overlayOpen: false,
            robots: [],
            voteCounts: [0]
        };
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
        this.toggleOverlay = this.toggleOverlay.bind(this);
        this.updateRobotState = this.updateRobotState.bind(this);
    }

    closeModal() {
        let modalProps = this.state.modal;
        modalProps.open = false;
        this.setState({ modal: modalProps });
    };

    getRobotData() {
        return axios.get('/data/robots.json');
    }

    openModal(opts) {
        const { get, post } = opts.errors;
        const errors = {
            get: get ? get : false,
            post: post ? post : false
        };
        const modalProps = {
            open: true,
            message: opts.message,
            title: opts.title
        };
        this.setState({ errors: errors, modal: modalProps, overlayOpen: true });
    }

    toggleOverlay() {
        const { overlayOpen:open } = this.state;
        this.setState({ overlayOpen: open ? false : true });
    }

    updateRobotState(bots) {
        const votes = this.updateVoteCounts(bots);
        this.setState({ robots: bots, voteCounts: votes });
    }

    updateVoteCounts(bots) {
        const votesArray = [];
        bots.forEach(bot => {
            votesArray.push(bot.votes);
        });
        return votesArray;
    }

    componentWillMount() {
        return this.getRobotData().then(resp => {
            const bots = resp.data;
            const votes = this.updateVoteCounts(bots);
            this.setState({ robots: bots, voteCounts: votes });
        }).catch(err => {
            console.log(err);
            const opts = {
                errors: { get: true },
                message: 'There was an error grabbing the robot data from Express, :sadrobot:',
                title: 'Oh no!'
            };
            this.openModal(opts);
        });
    }

    render() {
        const { errors, overlayOpen, robots, voteCounts } = this.state;
        const { message, open, title } = this.state.modal;
        const winner = voteCounts.reduce((prev, curr) => {
            return Math.max(prev, curr);
        });
        return (
            <BrowserRouter basename="/">
                <div className={`robot-art${overlayOpen ? ' overlay-open' : ''}`}>
                    <Header toggleOverlay={this.toggleOverlay} />
                    <main className="main-content">
                        <Switch>
                            <Route path="/robots">
                                <Robots
                                    errors={errors}
                                    openModal={this.openModal}
                                    robots={robots}
                                    updateRobots={this.updateRobotState}
                                />
                            </Route>
                            <Route path="/results">
                                <Results
                                    errors={errors}
                                    robots={robots}
                                    winner={winner}
                                />
                            </Route>
                        </Switch>
                    </main>
                    <Modal
                        onClick={this.closeModal}
                        open={open}
                        message={message}
                        title={title}
                    />
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <RobotArt />,
    document.getElementById('app')
);