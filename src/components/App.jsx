import React from 'react';
import { hot } from 'react-hot-loader';
import axios from 'axios';
import Modal from 'common/modal';
import Header from './header';
import Routes from './routes';

class App extends React.Component {
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
			isUserLoggedIn: false,
			voteCounts: [0]
		};
	}

	closeModal = e => {
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

	getAllUsers = context => {
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

	openModal = opts => {
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

	toggleOverlay = () => {
		const { overlayOpen: open } = this.state;
		this.setState({ overlayOpen: open ? false : true });
	}

	updateRobotState = bots => {
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
				const { isUserLoggedIn = false } = resp.data;
				this.setState({ isUserLoggedIn: isUserLoggedIn });
				if (isUserLoggedIn) return this.getRobotData();
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
		const { errors, overlayOpen, robots, isUserLoggedIn, voteCounts } = this.state;
		const { message, open, title } = this.state.modal;
		const winner = voteCounts.length > 0 ? voteCounts.reduce((prev, curr) => Math.max(prev, curr)) : 0;
		return (
			<div className={`robot-art${overlayOpen ? ' overlay-open' : ''}`}>
				<Header
					toggleOverlay={this.toggleOverlay}
					isUserLoggedIn={isUserLoggedIn}
				/>
				<div className="main-content">
					<Routes
						errors={errors}
						getAllUsers={this.getAllUsers}
						openModal={this.openModal}
						robots={robots}
						updateRobotState={this.updateRobotState}
						winner={winner}
					/>
				</div>
				<Modal
					onClick={this.closeModal}
					open={open}
					message={message}
					title={title}
				/>
			</div>
		);
	}
}

export default hot(module)(App);
