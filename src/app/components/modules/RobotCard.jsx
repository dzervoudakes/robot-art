import React from 'react';
import { RobotCardForm } from './includes/RobotCardForm.jsx';

export class RobotCard extends React.Component {
    constructor(props) {
        super();
        this.state = { action: props.action };
        this.updateAction = this.updateAction.bind(this);
    }

    updateAction(action) {
        this.setState({ action: action });
    }

    render() {
        const { action } = this.state;
        const { handleAdd, handleEdit, handleDelete, image, index, isAdmin, name, updateaction, updateVotes } = this.props;
        if (action === 'display') {
            return (
                <div className="robot-card">
                    <img alt={name} className="robot-avatar" src={image} />
                    <p className="robot-name">{name}</p>
                    {!isAdmin && 
                        <button className="button-standard primary" data-index={index} onClick={updateVotes}>Vote</button>
                    }
                    {isAdmin && 
                        <div className="button-container">
                            <button className="button-standard secondary" data-index={index} onClick={() => { this.updateAction('edit'); }}>Edit</button>
                            <button className="button-standard primary" data-index={index} onClick={handleDelete}>Delete</button>
                        </div>
                    }
                </div>
            );
        } else if (action === 'add') {
            return (
                <RobotCardForm
                    formId="addRobotForm"
                    index={index}
                    onClick={handleAdd}
                    text="Add"
                />
            );
        } else if (action === 'edit') {
            return (
                <RobotCardForm
                    cancel={() => { this.updateAction('display'); }}
                    formId="editRobotForm"
                    index={index}
                    name={name}
                    onClick={handleEdit}
                    text="Edit"
                    updateAction={this.updateAction}
                />
            );
        }
    }
}