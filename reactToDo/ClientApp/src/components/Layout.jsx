import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { NavButtons } from './NavButtons';

export class Layout extends Component {
    displayName = Layout.name
    
    render() {
        return (
            <div>
                <Grid fluid>
                    <Row>
                        <Col>
                            <NavButtons />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={8} smOffset={2}>
                            {this.props.children}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
