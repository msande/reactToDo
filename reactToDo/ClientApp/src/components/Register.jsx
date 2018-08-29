import React, { Component } from "react";
import { AlertService } from '../services/AlertService';
import { HttpService } from '../services/HttpService';
import { UserForm } from "./UserForm";
import { StorageService } from "../services/StorageService";

export class Register extends Component {
    displayName = Register.name
    
    handleSubmit = async (event, state) => {
        event.preventDefault();

        return HttpService.post(`/api/User/Register`, state)
            .then((response) => {
                if (!response.error && response.data.token) {
                    StorageService.setJWTKey(response.data.token);
                    window.location.href = '/about';
                } else {
                    AlertService.error(response.data.error);
                }
                return response;
            });
    }

    render() {
        return (
            <UserForm type="Register" handleSubmit={this.handleSubmit} />
        );
    }
}