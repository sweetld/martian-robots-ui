import React from 'react';
import SockJsClient from 'react-stomp';
import Button from '@material-ui/core/Button';
import {WEB_SOCKET_ENDPOINT} from './Constants';

class WebSocketComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clientConnected: false,
            messages: []
        };
    }

    sendMessage = (msg) => {
        this.clientRef.sendMessage('/app/command', JSON.stringify({
            command: msg,
        }));
    };

    render() {
        const wsSourceUrl = window.location.protocol + "//" + WEB_SOCKET_ENDPOINT;
        return (
            <div>
                <SockJsClient url={wsSourceUrl} topics={['/topic/status']}
                              onMessage={(msg) => { console.log(msg); }}
                              ref={ (client) => { this.clientRef = client }}
                              onConnect={ () => { this.setState({ clientConnected: true }) } }
                              onDisconnect={ () => { this.setState({ clientConnected: false }) } }
                />
                <Button variant="contained" color="primary" onClick={() => this.sendMessage("Test")} >
                    Send Message
                </Button>
            </div>
        );
    }
}

export default WebSocketComponent;
