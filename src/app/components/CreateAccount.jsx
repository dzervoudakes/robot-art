import React from 'react';

const axios = require('axios');

// @TODO: FOR EVENTUAL CLEANUP BRANCH, HANDLE VALIDATION AND USER ACCOUNT CHECKING ON THE BACK END?

export class CreateAccount extends React.Component {
    constructor() {
        super();
        this.state = { formErrors: false, users: [] };
        this.submitForm = this.submitForm.bind(this);
    }

    getUsers() {
        return axios.get('/data/users.json'); // @TODO: MOVE THIS TO INDEX AND PASS AS PROP??
    }

    createAccount(email, name, password) {
        const { users } = this.state;
        const newUser = {
            email: email,
            id: users.length + 1,
            name: name,
            password: password
        };
        users.push(newUser);
        const opts = { action: 'create_account', users: users };
        return axios.post('/api/user', opts);
    }

    submitForm(e) {
        e.preventDefault();
        const { email, name, password } = document.forms.createAccountForm;
        this.validateAndSend(email, name, password);
    }

    validateAndSend(...inputs) {
        const { openModal } = this.props;
        const { email, name, password } = document.forms.createAccountForm; // @TODO: JANK
        let hasErrors = false;
        inputs.forEach(item => {
            const regx = item === email ? /^\S+@\S+\.\S+$/ : /^\s*\S/;
            const isMatch = item.value.match(regx);
            const method = !isMatch ? 'add' : 'remove';
            item.classList[method]('invalid');
            if (!hasErrors) hasErrors = !isMatch ? true : false;
            this.setState({ formErrors: hasErrors });
        });
        if (!hasErrors) {
            const { users } = this.state;
            let isEmailTaken = false;
            users.forEach(user => {
                if (email.value === user.email) {
                    isEmailTaken = true;
                    const opts = {
                        errors: {},
                        message: 'The email you are trying to use has already been taken in our system by another user. Please use another.',
                        title: 'Dang!'
                    };
                    openModal(opts);
                    return;
                }
            });
            if (!isEmailTaken) {
                // handling redirect in Express
                this.createAccount(email.value, name.value, password.value)
                    .then()
                    .catch(err => {
                        const opts = {
                            errors: {},
                            message: 'There was a server error when trying to create your new account.',
                            title: 'Whoops...'
                        };
                        openModal(opts);
                });
            }
        }
    }

    // @TODO: JANKKKKKK
    componentWillMount() {
        return this.getUsers().then(resp => {
            const users = resp.data;
            this.setState({ users: users });
        }).catch(err => {
            console.log(err);
            const { openModal } = this.props;
            const opts = {
                errors: {},
                message: 'There was an error grabbing the user info. New users will be unable to create an account until this is fixed.',
                title: 'No bueno.'
            };
            openModal(opts);
        });
    }

    render() {
        const { formErrors } = this.state;
        return (
            <div className="login-container">
                <h2 className="page-title">Create Account</h2>
                <p id="formErrorMessage" className={`t-form-error-message${formErrors ? '' : ' hidden'}`}>Please correct the highlighted errors below.</p>
                <form id="createAccountForm" className="form">
                    <div className="form-row">
                        <label className="form-label">Name</label>
                        <input className="form-input" maxLength="50" name="name" placeholder="Jane Smith" type="text" />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Email</label>
                        <input className="form-input" maxLength="50" name="email" placeholder="jane.smith@email.com" type="text" />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Password</label>
                        <input className="form-input" maxLength="50" name="password" type="password" />
                    </div>
                    <div className="form-row">
                        <input className='button-standard primary submit-button' onClick={this.submitForm} type="submit" value="Submit" />
                    </div>
                </form>
            </div>
        );
    }
}