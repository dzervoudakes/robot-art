import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	onClick: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	message: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired
};

const Modal = ({ onClick, open, message, title }) => (
	<div className={`modal-container clickable${open ? ' open' : ''}`} onClick={onClick}>
		<div className="modal-content">
			<h2 className="modal-header">{title}</h2>
			<p className="modal-text">{message}</p>
			<button className="button-standard clickable primary" onClick={onClick}>Dismiss</button>
		</div>
	</div>
);

Modal.propTypes = propTypes;

export default Modal;