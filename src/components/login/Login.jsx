import React from 'react';
import { NavLink } from 'react-router-dom';
import { Form } from '@/components';

const axios = require('axios');

class Login extends React.Component {
    constructor() {
        super();
        this.state = { formErrors: false, loginAttempts: 0, unauthorized: false, users: [] };
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        const { loginAttempts } = this.state;
        if (loginAttempts < 3) {
            this.setState({ formErrors: false });
            const { email, password } = document.forms.loginForm;
            this.validateAndSend(email, password);
        }
    }

    submitUserLogin() {
        const opts = { action: 'login', loggedIn: true };
        return axios.post('/api/users', opts);
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
                return this.submitUserLogin()
                    .then(resp => {
                        if (resp.status === 200) window.location.href = '/robots';
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
                if (loginAttempts < 3) {
                    const opts = {
                        errors: {},
                        message: 'We don\'t recognize your email/password combination, O.o',
                        title: 'Howdy, stranger!'
                    };
                    openModal(opts);
                }
            }
        }
    }

    componentWillMount() {
        const { getAllUsers } = this.props;
        return getAllUsers(this);
    }

    render() {
        const { loginAttempts, formErrors } = this.state;
        return (
            <div className="login-container">
                <h2 className="page-title">Login</h2>
                {loginAttempts === 3 && <p className="t-form-error-message">You hackin'? You've attempted to login too many times.</p>}
                {formErrors && <p className="t-form-error-message">Please correct the highlighted errors below.</p>}
                <Form
                    formId="loginForm"
                    loginAttempts={loginAttempts}
                    submitForm={this.submitForm}
                />
                <p className="t-signup">Need an account? <NavLink className="t-signup-link" to="/create-account">Sign Up</NavLink>.</p>
            </div>
        );
    }
}

export default Login;