import React, { Component } from 'react';
import { UserService } from '../services/UserService';

export class About extends Component {
    displayName = About.name

    render() {
        return (
            <div>
                <h1>Hello {UserService.info().sub}</h1>
                <p className="sub-title">and welcome to the over complex ToDo react app</p>
                <p>What this project includes:</p>
                <ul>
                    <li>ASP.NET Core and C# for cross-platform server-side code</li>
                    <li>React for client-side code</li>
                    <li>IdentityServer for authentication and authorization</li>
                    <li>SASS for layout and styling</li>
                    <li>Logging with NLog</li>
                    <li>Entity Framework and SQLite</li>
                    <li>HTML5 Browser Notifications</li>
                </ul>

                ToDo:
                <ul>
                    <li>SASS / style</li>
                </ul>

                Maybe:
                <ul>
                    <li>Browser Notifications when reminders are hit</li>
                    <li>Add date/time picker</li>
                    <li>Unit testing(C# and js)</li>
                    <li>Get working on old ie</li>
                    <li>Reorder items</li>
                </ul>
            </div>
        );
    }
}
