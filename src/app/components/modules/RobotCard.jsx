import React from 'react';

export class RobotCard extends React.Component {
    render() {
        const { index, name, onClick, image } = this.props;
        return (
            <div className="robot-card">
                <img alt={name} className="robot-avatar" src={image} />
                <p className="robot-name">{name}</p>
                <button className="button-standard primary" data-index={index} onClick={onClick}>Vote</button>
            </div>
        );
    }
}