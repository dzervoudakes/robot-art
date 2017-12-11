import React from 'react';

export class RobotCard extends React.Component {
    render() {
        const { action, handleAdd, handleEdit, handleDelete, image, index, isAdmin, name, updateVotes } = this.props;
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
                            <button className="button-standard secondary" data-index={index} onClick={handleEdit}>Edit</button>
                            <button className="button-standard primary" data-index={index} onClick={handleDelete}>Delete</button>
                        </div>
                    }
                </div>
            );
        } else if (action === 'add') {
            return (
                <div className="robot-card">
                    <h3 className="card-title">Add Robot</h3>
                    <form id="addRobotForm" className="add-robot-form form">
                        <div className="form-row">
                            <label className="form-label">Robot Name</label>
                            <input className="form-input" maxLength="50" name="name" type="text" />
                        </div>
                        <div className="form-row">
                            <label className="form-label">Robot Image</label>
                            <input accept="image/*" className="form-input" name="upload" type="file" />
                        </div>
                        <div className="form-row">
                            <input className="button-standard primary submit-button" onClick={handleAdd} type="submit" value="Add Robot" />
                        </div>
                    </form>
                </div>
            );
        }
    }
}