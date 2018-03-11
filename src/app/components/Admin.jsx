import React from 'react';
import { RobotCard } from './modules/RobotCard.jsx';

const axios = require('axios');

export class Admin extends React.Component {
    constructor() {
        super();
        this.state = { formErrors: false };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    addRobot(data) {
        return axios.post('/api/robots/add', data);
    }

    postRobotData() {
        const opts = { robots: this.props.robots };
        return axios.post('/api/robots', opts);
    }

    handleAdd(e) {
        e.preventDefault();
        let hasErrors = false;
        const { name, upload } = document.forms.addRobotForm;
        const regx = /^\s*\S/;
        const isNameValid = name.value.match(regx);
        const isUploadValid = upload.value !== '';
        name.classList[!isNameValid ? 'add' : 'remove']('invalid');
        upload.classList[!isUploadValid ? 'add' : 'remove']('invalid');
        if (!hasErrors) hasErrors = !isNameValid || !isUploadValid ? true : false;
        this.setState({ formErrors: hasErrors });
        if (hasErrors) return false;
        if (!hasErrors) {
            const { robots, updateRobots } = this.props;
            const newRobot = {
                image: `/images/robots/contenders/${upload.files[0].name}`,
                name: name.value,
                votes: 0
            };
            const newRobotsArray = robots.slice(0);
            newRobotsArray.push(newRobot);
            const data = new FormData();
            data.append('robots', JSON.stringify(newRobotsArray));
            data.append('uploadFile', upload.files[0]);
            this.addRobot(data)
                .then(resp => {
                    robots.push(newRobot);
                    updateRobots(robots);
                    name.value = '';
                    upload.value = '';
                    const { openModal } = this.props;
                    const opts = {
                        errors: {},
                        message: 'You have successfully added a new competitor, :happyrobot:',
                        title: 'Success!'
                    };
                    openModal(opts);
                }).catch(err => {
                    const { openModal } = this.props;
                    const opts = {
                        errors: {},
                        message: 'There was a server error while trying to upload the new robot.',
                        title: 'Danger, Will Robinson, Danger!'
                    };
                    openModal(opts);
                });
            return true;
        }
    }

    handleDelete(e) {
        e.preventDefault();
        const { robots, updateRobots } = this.props;
        const index = e.target.getAttribute('data-index');
        robots.splice(index, 1);
        return this.postRobotData()
            .then(resp => {
                updateRobots(robots);
                const { openModal } = this.props;
                const opts = {
                    errors: {},
                    message: 'The contender was removed.',
                    title: 'Success!'
                };
                openModal(opts);
            }).catch(err => {
                const { openModal } = this.props;
                const opts = {
                    errors: {},
                    message: 'There was a server error while trying to delete the contender.',
                    title: 'Darn...'
                };
                openModal(opts);
            });
    }

    handleEdit(e) {
        e.preventDefault();
        const { robots } = this.props;
        const index = e.target.getAttribute('data-index');
        let hasErrors = false;
        const { name, upload } = document.forms.editRobotForm;
        const regx = /^\s*\S/;
        const isNameValid = name.value.match(regx);
        const isUploadValid = upload.value !== '';
        name.classList[!isNameValid ? 'add' : 'remove']('invalid');
        upload.classList[!isUploadValid ? 'add' : 'remove']('invalid');
        if (!hasErrors) hasErrors = !isNameValid || !isUploadValid ? true : false;
        this.setState({ formErrors: hasErrors });
        if (hasErrors) return false;
        if (!hasErrors) {
            const { robots, updateRobots } = this.props;
            const newRobotsArray = robots.slice(0);
            newRobotsArray[index] = {
                image: `/images/robots/contenders/${upload.files[0].name}`,
                name: name.value,
                votes: newRobotsArray[index].votes
            };
            const data = new FormData();
            data.append('robots', JSON.stringify(newRobotsArray));
            data.append('uploadFile', upload.files[0]);
            this.addRobot(data)
                .then(resp => {
                    updateRobots(newRobotsArray);
                    name.value = '';
                    upload.value = '';
                    const { openModal } = this.props;
                    const opts = {
                        errors: {},
                        message: 'You have successfully edited the robot, :happyrobot:',
                        title: 'Nice!'
                    };
                    openModal(opts);
                }).catch(err => {
                    const { openModal } = this.props;
                    const opts = {
                        errors: {},
                        message: 'There was a server error while trying to edit the robot.',
                        title: 'Does... Not... Compute...'
                    };
                    openModal(opts);
                });
            return true;
        }
    }

    render() {
        const { errors, robots } = this.props;
        const errImg = <img alt="sad robot" className="error-image" src="/images/robots/errors/sad-robot-tertiary.jpg" />
        let bots = [];
        if (robots.length !== 0) {
            bots = robots.map((bot, index) =>
                <RobotCard
                    action="display"
                    handleDelete={this.handleDelete}
                    handleEdit={this.handleEdit}
                    index={index}
                    isAdmin={true}
                    key={index}
                    name={bot.name}
                    image={bot.image}
                />
            );
        }
        bots.push(
            <RobotCard
                action="add"
                handleAdd={this.handleAdd}
                key="add-robot"
            />
        );
        return (
            <div className="admin-container">
                {!errors.get && <h2 className="page-title">Admin</h2>}
                {errors.get ? errImg : bots}
            </div>
        );
    }
}