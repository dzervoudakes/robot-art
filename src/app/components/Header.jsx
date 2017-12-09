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
        const { isMobileMenuOpen:open } = this.state;
        const handleMobileMenuState = () => {
            if (window.innerWidth <= 480) {
                this.toggleMobileMenu();
                this.props.toggleOverlay();
            }
        };
        return (
            <header className="header">
                <NavLink to="/robots">
                    <img alt="Mondo Robot" className="logo" src="images/logo.svg" />
                </NavLink>
                <nav className={`navigation${open ? ' open' : ''}`}>
                    <ul className="menu">
                        <li className="primary">
                            <NavLink to="/robots" exact activeClassName="active" onClick={handleMobileMenuState}>Robots</NavLink>
                        </li>
                        <li className="primary">
                            <NavLink to="/results" activeClassName="active" onClick={handleMobileMenuState}>Results</NavLink>
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