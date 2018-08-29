import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { About } from './components/About';
import { ToDo } from './components/ToDo';
import { AlertService } from './services/AlertService';
import { NotificationService } from './services/NotificationService';
import './App.min.css';
import PrivateRoute from './components/PrivateRoute';

const notificationService = new NotificationService();

export default class App extends Component {
    displayName = App.name;

    constructor(props) {
        super(props);

        notificationService.requestPermission();
    }

    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                    <PrivateRoute path='/about' component={About} />
                    <PrivateRoute path='/todo' component={ToDo} />
                    <Route exact path="/" render={() => (
                        <Redirect to="/about" />
                    )} />
                </Switch>
                <AlertService />
            </Layout>
        );
    }
}
