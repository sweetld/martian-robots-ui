import { useState } from 'react';
import createUseContext from 'constate';

function useWebSocket() {
    const [socksClient, setSocksClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [xValue, setXValue] = useState(5);
    const [yValue, setYValue] = useState(3);
    const sendMessage = (message) => socksClient.sendMessage('/app/command', JSON.stringify({
        command: message,
    }));

    return {
        socksClient,
        setSocksClient,
        connected,
        setConnected,
        xValue,
        setXValue,
        yValue,
        setYValue,
        sendMessage,
    };
}

export const useWebSocketContext = createUseContext(useWebSocket);
