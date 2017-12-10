import React from 'react';
import { NavLink } from 'react-router-dom';

const axios = require('axios');

export class Login extends React.Component {
    constructor() {
        super();
        this.state = { formErrors: false, loginAttempts: 0, unauthorized: false, users: [] }
        this.submitForm = this.submitForm.bind(this);
    }

    getUsers() {
        return axios.get('/data/users.json');
    }

    // @TODO: MODULARIZE THE FORM SUBMISSION STUFF SO YOU CAN ALSO USE WITH CREATE ACCOUNT

    submitForm(e) {
        e.preventDefault();
        const { loginAttempts } = this.state;
        if (loginAttempts < 3) {
            this.setState({ formErrors: false });
            const { email, password } = document.forms.loginForm;
            this.validateAndSend(email, password);
        } else {
            console.log('poop');
        }
    }

    submitUserLogin() {
        return axios.post('/api/user', { loggedIn: true });
    }

    validateAndSend(...inputs) {
        const { openModal } = this.props;
        const { email, password } = document.forms.loginForm;
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
            let authorized = false;
            users.forEach(user => {
                if (email.value === user.email && password.value === user.password) return authorized = true;
            });
            if (authorized) {
                this.submitUserLogin().then(resp => {
                    window.location.href = '/robots';
                }).catch(err => {
                    const opts = {
                        errors: {},
                        message: 'We were unable to log you in due to server difficulties :(',
                        title: 'We\'re sorry...'
                    };
                    openModal(opts);
                });
            } else {
                let { loginAttempts } = this.state;
                loginAttempts++;
                this.setState({ loginAttempts: loginAttempts });
                const opts = {
                    errors: {},
                    message: 'We don\'t recognize your email/password combination, O.o',
                    title: 'Howdy, stranger!'
                };
                openModal(opts);
            }
        }
    }

    componentWillMount() {
        return this.getUsers().then(resp => {
            const users = resp.data;
            this.setState({ users: users });
        }).catch(err => {
            console.log(err);
            const { openModal } = this.props;
            const opts = {
                errors: {},
                message: 'There was an error grabbing the user info. Existing users will be unable to log in until this is fixed.',
                title: 'Well, that\'s embarrassing.'
            };
            openModal(opts);
        });
    }

    render() {
        const { loginAttempts, formErrors } = this.state;
        return (
            <div className="login-container">
                <h2 className="page-title">Login</h2>
                <p id="loginAttemptsErrorMessage" className={`t-form-error-message${loginAttempts === 3 ? '' : ' hidden'}`}>You hackin'? You've attempted to login too many times.</p>
                <p id="formErrorMessage" className={`t-form-error-message${formErrors ? '' : ' hidden'}`}>Please correct the highlighted errors below.</p>
                <form id="loginForm" className="login-form">
                    <div className="form-row">
                        <label className="form-label">Email</label>
                        <input className="form-input" maxLength="50" name="email" placeholder="jane.smith@email.com" type="text" />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Password</label>
                        <input className="form-input" maxLength="50" name="password" type="password" />
                    </div>
                    <div className="form-row">
                        <input className={`button-standard ${loginAttempts === 3 ? 'disabled' : 'primary'} submit-button`} onClick={this.submitForm} type="submit" value="Submit" />
                    </div>
                </form>
                <p className="t-signup">Need an account? <NavLink className="t-signup-link" to="/create-account">Sign Up</NavLink>.</p>
            </div>
        );
    }
}