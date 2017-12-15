import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { Admin, CreateAccount, Header, Login, Modal, Robots, Results } from './components';
require('../sass/style.scss');

const axios = require('axios');

// @TODO: TRY TO CUT DOWN ON THE MODAL CALLS, THAT'S 5 LINES OF CODE FOR EACH 'OPTS' INSTANCE

class RobotArt extends React.Component {
    constructor() {
        super();
        this.state = {
            errors: {
                get: false,
                noRobots: false,
                post: false
            },
            modal: {
                message: '',
                open: false,
                title: ''
            },
            overlayOpen: false,
            robots: [],
            userLoggedIn: false,
            voteCounts: [0]
        };
        this.closeModal = this.closeModal.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.openModal = this.openModal.bind(this);
        this.toggleOverlay = this.toggleOverlay.bind(this);
        this.updateRobotState = this.updateRobotState.bind(this);
    };

    closeModal(e) {
        const isClickable = e.target.classList.contains('clickable');
        if (isClickable) {
            let modalProps = this.state.modal;
            modalProps.open = false;
            this.setState({ modal: modalProps, overlayOpen: false });
        }
    };

    getRobotData() {
        return axios.get('/api/robots')
            .then(resp => {
                const bots = resp.data;
                this.updateRobotState(bots);
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

    getAllUsers(context) {
        return axios.get('/api/users?full=true')
            .then(resp => {
                const users = resp.data;
                context.setState({ users: users });
            }).catch(err => {
                console.log(err);
                const { openModal } = context.props;
                const opts = {
                    errors: {},
                    message: 'There was an error grabbing the user info. New users will be unable to login or create new accounts until this is fixed.',
                    title: 'No bueno.'
                };
                openModal(opts);
            });
    }

    getUserSession() {
        return axios.get('/api/users');
    }

    openModal(opts) {
        const { robots } = this.state;
        const { get = false, post = false } = opts.errors;
        const errors = {
            get: get,
            noRobots: robots.length > 0 ? false : true,
            post: post
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
        const { errors } = this.state;
        errors.noRobots = bots.length > 0 ? false : true;
        this.setState({ errors: errors, robots: bots, voteCounts: votes });
    }

    updateVoteCounts(bots) {
        const votesArray = [];
        bots.forEach(bot => {
            votesArray.push(bot.votes);
        });
        return votesArray;
    }

    componentWillMount() {
        return this.getUserSession()
            .then(resp => {
                const userLoggedIn = resp.data.userLoggedIn;
                this.setState({ userLoggedIn: userLoggedIn });
                if (userLoggedIn) return this.getRobotData();
            }).catch(err => {
                const opts = {
                    errors: { get: true },
                    message: 'We were unable to fetch your user info from the Express server, :whyohwhy:',
                    title: 'Who am I? How did I get here?'
                };
                this.openModal(opts);
            });
    }

    render() {
        const { errors, overlayOpen, robots, userLoggedIn, voteCounts } = this.state;
        const { message, open, title } = this.state.modal;
        const winner = voteCounts.length > 0 ? voteCounts.reduce((prev, curr) => Math.max(prev, curr)) : 0;
        return (
            <BrowserRouter basename="/">
                <div className={`robot-art${overlayOpen ? ' overlay-open' : ''}`}>
                    <Header
                        toggleOverlay={this.toggleOverlay}
                        userLoggedIn={userLoggedIn}
                    />
                    <main className="main-content">
                        <Switch>
                            <Route path="/admin">
                                <Admin
                                    errors={errors}
                                    openModal={this.openModal}
                                    robots={robots}
                                    updateRobots={this.updateRobotState}
                                />
                            </Route>
                            <Route path="/create-account">
                                <CreateAccount
                                    getAllUsers={this.getAllUsers}
                                    openModal={this.openModal}
                                />
                            </Route>
                            <Route exact path="/">
                                <Login
                                    getAllUsers={this.getAllUsers}
                                    openModal={this.openModal}
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
                                    openModal={this.openModal}
                                    robots={robots}
                                    updateRobots={this.updateRobotState}
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