import React from 'react';
import { Form } from './modules/Form.jsx';

const axios = require('axios');

export class CreateAccount extends React.Component {
    constructor() {
        super();
        this.state = { formErrors: false, users: [] };
        this.submitForm = this.submitForm.bind(this);
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
        return axios.post('/api/users', opts);
    }

    submitForm(e) {
        e.preventDefault();
        const { email, name, password } = document.forms.createAccountForm;
        this.validateAndSend(email, name, password);
    }

    validateAndSend(...inputs) {
        const { openModal } = this.props;
        const { email, name, password } = document.forms.createAccountForm;
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
                return this.createAccount(email.value, name.value, password.value)
                    .then(resp => {
                        if (resp.status === 200) window.location.href = '/robots';
                    })
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

    componentWillMount() {
        const { getAllUsers } = this.props;
        return getAllUsers(this);
    }

    render() {
        const { formErrors } = this.state;
        return (
            <div className="login-container">
                <h2 className="page-title">Create Account</h2>
                <p id="formErrorMessage" className={`t-form-error-message${formErrors ? '' : ' hidden'}`}>Please correct the highlighted errors below.</p>
                <Form
                    formId="createAccountForm"
                    includeName={true}
                    submitForm={this.submitForm}
                />
            </div>
        );
    }
}