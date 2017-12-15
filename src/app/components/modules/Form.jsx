import React from 'react';

export class Form extends React.Component {
    render() {
        const { formId, includeName, loginAttempts, submitForm } = this.props;
        return (
            <form id={formId} className="form">
                {includeName && 
                    <div className="form-row">
                        <label className="form-label" htmlFor="name">Name</label>
                        <input className="form-input" maxLength="50" name="name" placeholder="Jane Smith" type="text" />
                    </div>
                }
                <div className="form-row">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input className="form-input" maxLength="50" name="email" placeholder="jane.smith@email.com" type="text" />
                </div>
                <div className="form-row">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input className="form-input" maxLength="50" name="password" type="password" />
                </div>
                <div className="form-row">
                    <input className={`button-standard ${loginAttempts && loginAttempts === 3 ? 'disabled' : 'primary'} submit-button`} onClick={submitForm} type="submit" value="Submit" />
                </div>
            </form>
        );
    }
}