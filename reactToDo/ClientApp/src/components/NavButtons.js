import React from 'react';
import { Link } from 'react-router-dom';
import { UserService } from '../services/UserService';
import { StorageService } from '../services/StorageService';

export class NavButtons extends React.Component {
    displayName = NavButtons.name

    logout = event => {
        event.preventDefault();
        StorageService.removeJWTKey();
        window.location.href = '/login';
    }

    toDoItems = event => {
        event.preventDefault();
        StorageService.removeJWTKey();
        window.location.href = '/login';
    }

    renderItems = () => {
        if (UserService.info()) {
            return this.renderLoggedInItems();
        } else {
            return null;
        }
    }

    renderLoggedInItems = () => {
        return (
            <div className="NavButtons">
                <Link to={'/about'}>About</Link>
                <Link to={'/todo'}>ToDo Items</Link>
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }

    render() {
        return (
            this.renderItems()
        );
    }
}
