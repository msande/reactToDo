import React from 'react';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import { isMobile } from 'react-device-detect';

export class AlertService extends React.Component {

    static options = {
        position: (isMobile ? 'top' : 'bottom-right'),
        effect: (isMobile ? 'stackslide' : 'jelly'),
        timeout: 1000
    }

    static save(message) {
        Alert.success(message, this.options);
    }

    static error(message) {
        Alert.error(message, this.options);
    }

    render() {
        return (
            <Alert stack={{ limit: (isMobile ? 1 : 2) }} />
        )
    }
}