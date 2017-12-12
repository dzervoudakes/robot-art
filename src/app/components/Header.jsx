import React from 'react';
import { NavLink } from 'react-router-dom';

export class Header extends React.Component {
    constructor() {
        super();
        this.state = { isMobileMenuOpen: false };
        this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    }

    toggleMobileMenu() {
        const { isMobileMenuOpen:open } = this.state;
        this.setState({ isMobileMenuOpen: open ? false : true });
    }
    
    render() {
        const { toggleOverlay, userLoggedIn } = this.props;
        const { isMobileMenuOpen:open } = this.state;
        const handleMobileMenuState = () => {
            if (window.innerWidth <= 480) {
                this.toggleMobileMenu();
                toggleOverlay();
            }
        };
        const createMenuItem = (liClass, label) => {
            return (
                <li className={`list-item ${liClass}`}>
                    <NavLink activeClassName="active" onClick={handleMobileMenuState} to={`/${label.toLowerCase()}`}>{label}</NavLink>
                </li>
            );
        };
        return (
            <header className="header">
                <a href="/robots">
                    <img alt="Mondo Robot" className="logo" src="images/logo.svg" />
                </a>
                <nav className={`navigation${open ? ' open' : ''}`}>
                    <ul className="menu">
                        {userLoggedIn && createMenuItem('primary', 'Robots')}
                        {userLoggedIn && createMenuItem('primary', 'Results')}
                        <li className="secondary-list-item-container">
                            <ul>
                                {userLoggedIn && createMenuItem('secondary', 'Admin')}
                                <li className="list-item secondary">
                                    <a href={userLoggedIn ? '/account/logout' : '/'} onClick={handleMobileMenuState}>{userLoggedIn ? 'Logout' : 'Login'}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
                <button className={`responsive-menu-button ${open ? 'selected' : ''}`} onClick={handleMobileMenuState}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </header>
        );
    }
}