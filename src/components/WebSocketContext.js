import { useState } from 'react';
import createUseContext from 'constate';

function useWebSocket() {
    const [socksClient, setSocksClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [xValue, setXValue] = useState(5);
    const [yValue, setYValue] = useState(3);
    const [numberOfRobots, setNumberOfRobots] = useState(0);
    const [newRobotMessage, setNewRobotMessage] = useState(null);
    const [updatedRobotMessage, setUpdatedRobotMessage] = useState(null);
    const sendCommandMessage = (command) => socksClient.sendMessage('/app/command', JSON.stringify({
        command,
    }));
    const sendSetupMessage = (x, y) => socksClient.sendMessage('/app/setup', JSON.stringify({
        upperRight: {
            x,
            y,
        },
    }));
    const sendRobotMessage = (x, y, orientation, commands) => socksClient.sendMessage('/app/robot', JSON.stringify({
        startingPoint: {
            x,
            y,
        },
        orientation,
        commands,
    }));

    //    Integer robotId;
    //     Position currentPosition;
    //     String message;
    function receivedStatusMessage(message) {
        console.log(message);
        // If successfully setup
        if (message && message.message.includes('Created Mars Surface')) {
            setNumberOfRobots(0);
        }
        // If successfully added Robot
        if (message && message.message.includes('Created new Robot')) {
            setNumberOfRobots(numberOfRobots + 1);
            setNewRobotMessage(message);
        }
        // If a robot has moved
        if (message && message.message.includes('Update')) {
            setUpdatedRobotMessage(message);
        }
    };

    return {
        socksClient,
        setSocksClient,
        connected,
        setConnected,
        xValue,
        setXValue,
        yValue,
        setYValue,
        sendSetupMessage,
        sendRobotMessage,
        sendCommandMessage,
        receivedStatusMessage,
        numberOfRobots,
        newRobotMessage,
        setNewRobotMessage,
        updatedRobotMessage,
        setUpdatedRobotMessage
    };
}

export const useWebSocketContext = createUseContext(useWebSocket);
