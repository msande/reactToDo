import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { UserService } from '../services/UserService';

export class NavMenu extends React.Component {
    displayName = NavMenu.name
    
    renderItems = () => {
        if (UserService.info()) {
            return this.renderLoggedInItems();
        } else {
            return this.renderLoggedOutItems();
        }
    }

    renderHeader = () => {
        return (
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to={'/'}>react</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
        )
    }

    renderLinkContainer = (path, glyph, label) => {
        return (
            <LinkContainer to={path} exact>
                <NavItem>
                    <Glyphicon glyph='{glyph}' /> {label}
                </NavItem>
            </LinkContainer>
        )
    }

    renderLoggedOutItems = () => {
        return (
            <Navbar inverse fixedTop fluid collapseOnSelect>
                {this.renderHeader()}
                <Navbar.Collapse>
                    <Nav>
                        {this.renderLinkContainer('/login', 'login', 'Login')}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }

    renderLoggedInItems = () => {
        return (
            <Navbar inverse fixedTop fluid collapseOnSelect>
                {this.renderHeader()}
                <Navbar.Collapse>
                    <Nav>
                        {this.renderLinkContainer('/about', 'th-list', 'About')}
                        {this.renderLinkContainer('/todo', 'th-list', 'ToDo')}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }

    render() {
        return (
            <div>
                {this.renderItems()}
            </div>
        );
    }
}
