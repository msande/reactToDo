import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Col, Grid, Row } from 'react-bootstrap';

export class UserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "admin",
            password: "4i9S97Dx2@LQM9KCwTabrm"
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        this.props.handleSubmit(event, this.state);
    }

    render() {
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Col className="centered">
                            <h1>Welcome to the overly complex ToDo react app</h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} sm={8} smOffset={2} md={6} mdOffset={3}>
                            <div className={this.props.type}>
                                <form onSubmit={this.handleSubmit}>
                                    <FormGroup controlId="username" bsSize="large">
                                        <ControlLabel>Username</ControlLabel>
                                        <FormControl
                                            autoFocus
                                            type="input"
                                            value={this.state.username}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup controlId="password" bsSize="large">
                                        <ControlLabel>Password</ControlLabel>
                                        <FormControl
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                            type="password"
                                        />
                                    </FormGroup>
                                    <Button
                                        block
                                        bsSize="large"
                                        disabled={!this.validateForm()}
                                        type="submit">
                                        {this.props.type}
                                    </Button>
                                    {this.props.type === 'Login' ? <Link to={'/register'}>Register</Link> : <Link to={'/login'}>Login</Link>}
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
