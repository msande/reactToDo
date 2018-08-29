import React, { Component } from "react";
import { AlertService } from '../services/AlertService';
import { HttpService } from '../services/HttpService';
import { UserForm } from "./UserForm";
import { StorageService } from "../services/StorageService";

export class Login extends Component {
    displayName = Login.name

    handleSubmit = async (event, state) => {
        event.preventDefault();

        return HttpService.post(`/api/User/Login`, state)
            .then((response) => {
                if (!response.error && response.data.token) {
                    StorageService.setJWTKey(response.data.token);
                    window.location.href = '/about';
                } else {
                    AlertService.error('Username or password is incorrect.');
                }
                return response;
            });
    }

    render() {
        return (
            <UserForm type="Login" handleSubmit={this.handleSubmit} />
        );
    }
}