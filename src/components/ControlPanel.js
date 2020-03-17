import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { useWebSocketContext } from './WebSocketContext';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import MaskedInput from 'react-text-mask'

function ControlPanel() {
    const {
        connected,
        xValue,
        setXValue,
        yValue,
        setYValue,
        sendSetupMessage,
        sendRobotMessage,
    } = useWebSocketContext();
    const [robotPosition, setRobotPosition] = useState([]);
    const [robotCommands, setRobotCommands] = useState(null);

    const handleXChange = (event, newValue) => {
        setXValue(newValue);
    };

    const handleYChange = (event, newValue) => {
        setYValue(newValue);
    };

    const handleRobotCommandChange = (event) => {
        const newValue = event.target.value;
        if (newValue.includes('(') && newValue.includes(')') && newValue.length > 8) {
            const robotInitialiseString = newValue.substring(newValue.indexOf('(') + 1, newValue.indexOf(')'));
            setRobotPosition(robotInitialiseString.split(' '));
            setRobotCommands(newValue.substring(newValue.lastIndexOf(')') + 2));
        }
    }

    const handleSendRobotMessage = (event) => {
        console.log('Sending Robot Message...');
        sendRobotMessage(robotPosition[0], robotPosition[1], robotPosition[2], robotCommands);
        setRobotPosition([]);
        setRobotCommands(null);

    }

    return (
        <Grid container direction="column">
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Surface Size
                </Typography>
                <Slider
                    defaultValue={xValue}
                    step={1}
                    marks
                    onChange={handleXChange}
                    min={0}
                    max={50}
                    valueLabelDisplay="auto"
                />
                <Slider
                    defaultValue={yValue}
                    step={1}
                    marks
                    onChange={handleYChange}
                    min={0}
                    max={50}
                    valueLabelDisplay="auto"
                />
                <Button size="small" variant="contained" color="primary" onClick={() => sendSetupMessage(xValue, yValue)} disabled={!connected} >
                    Set Coordinates
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                    Robot Creation
                </Typography>
                <MaskedInput
                    mask={['(', /\d/, ' ', /\d/, ' ', /[NESW]/, ')', ' ', /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/, /[FLR]/]}
                    placeholder="Robot command string"
                    guide={false}
                    id="my-input-id"
                    onChange={handleRobotCommandChange}
                    // value={robotPosition}
                    defaultValue={robotPosition}
                />
                <Button size="small" variant="contained" color="primary" onClick={handleSendRobotMessage} disabled={!connected || !setRobotCommands} >
                    Add Robot
                </Button>
            </Grid>
        </Grid>
    );
}

export default ControlPanel;
