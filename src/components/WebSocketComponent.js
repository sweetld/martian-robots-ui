import React from 'react';
import SockJsClient from 'react-stomp';
import {WEB_SOCKET_ENDPOINT} from './Constants';
import { useWebSocketContext } from './WebSocketContext';

function WebSocketComponent() {
    const { setConnected, setSocksClient, receivedStatusMessage } = useWebSocketContext();
    const wsSourceUrl = window.location.protocol + "//" + WEB_SOCKET_ENDPOINT;

    return (
        <div>
            <SockJsClient url={wsSourceUrl} topics={['/topic/status', '/topic/command', '/topic/robot']}
                          onMessage={(message) => { receivedStatusMessage(message); }}
                          ref={(client) => { setSocksClient(client) }}
                          onConnect={() => { setConnected(true) }}
                          onDisconnect={() => { setConnected(false) }}
            />
        </div>
    );
}

export default WebSocketComponent;
