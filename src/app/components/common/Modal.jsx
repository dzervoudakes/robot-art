import React from 'react';

class Modal extends React.PureComponent {
    render() {
        const { onClick, open, message, title } = this.props;
        return (
            <div className={`modal-container clickable${open ? ' open' : ''}`} onClick={onClick}>
                <div className="modal-content">
                    <h2 className="modal-header">{title}</h2>
                    <p className="modal-text">{message}</p>
                    <button className="button-standard clickable primary" onClick={onClick}>Dismiss</button>
                </div>
            </div>
        );
    }
}

export default Modal;