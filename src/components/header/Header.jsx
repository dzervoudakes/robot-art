import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const propTypes = {
	toggleOverlay: PropTypes.func.isRequired,
	isUserLoggedIn: PropTypes.bool.isRequired
};

class Header extends React.Component {
	constructor() {
		super();
		this.state = { isMobileMenuOpen: false };
	}

	toggleMobileMenu = () => {
		const { isMobileMenuOpen: open } = this.state;
		this.setState({ isMobileMenuOpen: open ? false : true });
	}

	render() {
		const { toggleOverlay, isUserLoggedIn } = this.props;
		const { isMobileMenuOpen: open } = this.state;
		const handleMobileMenuState = () => {
			if (window.innerWidth <= 480) {
				this.toggleMobileMenu();
				toggleOverlay();
			}
		};
		const createMenuItem = (liClass, label) => (
			<li className={ `list-item ${liClass}` }>
				<NavLink activeClassName="active" onClick={ handleMobileMenuState } to={ `/${label.toLowerCase()}` }>{label}</NavLink>
			</li>
		);
		return (
			<header className="header">
				<a href="/robots">
					<img alt="Mondo Robot" className="logo" src="img/logo.svg" />
				</a>
				<nav className={ `navigation${open ? ' open' : ''}` }>
					<ul className="menu">
						{isUserLoggedIn && createMenuItem('primary', 'Robots')}
						{isUserLoggedIn && createMenuItem('primary', 'Results')}
						<li className="secondary-list-item-container">
							<ul>
								{isUserLoggedIn && createMenuItem('secondary', 'Admin')}
								<li className="list-item secondary">
									<a href={ isUserLoggedIn ? '/account/logout' : '/' } onClick={ handleMobileMenuState }>{isUserLoggedIn ? 'Logout' : 'Login'}</a>
								</li>
							</ul>
						</li>
					</ul>
				</nav>
				<button className={ `responsive-menu-button ${open ? 'selected' : ''}` } onClick={ handleMobileMenuState }>
					<span className="bar"></span>
					<span className="bar"></span>
					<span className="bar"></span>
				</button>
			</header>
		);
	}
}

Header.propTypes = propTypes;

export default Header;
