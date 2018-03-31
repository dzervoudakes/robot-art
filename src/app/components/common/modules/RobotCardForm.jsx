import React from 'react';

class RobotCardForm extends React.PureComponent {
    render() {
        const { cancel, formId, index, name = '', onClick, text, updateAction } = this.props;
        return (
            <div className="robot-card">
                <h3 className="card-title">{text} Robot</h3>
                <form id={formId} className="add-robot-form form">
                    <div className="form-row">
                        <label className="form-label" htmlFor="name">Robot Name</label>
                        <input className="form-input" maxLength="50" name="name" placeholder={name} type="text" />
                    </div>
                    <div className="form-row">
                        <label className="form-label" htmlFor="upload">Robot Image</label>
                        <input accept="image/*" className="form-input" name="upload" type="file" />
                    </div>
                    <div className="form-row">
                        <input className="button-standard primary submit-button" data-index={index} onClick={e => { const success = onClick(e); if (success && updateAction) updateAction('display'); }} type="submit" value={`${text} Robot`} />
                        {text === 'Edit' && <a className="t-edit-cancel" onClick={cancel}>Cancel</a>}
                    </div>
                </form>
            </div>
        );
    }
}

export default RobotCardForm;