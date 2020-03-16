import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useWebSocketContext } from './WebSocketContext';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

function ControlPanel() {
    const { connected, xValue, setXValue, yValue, setYValue, sendMessage } = useWebSocketContext();

    const handleXChange = (event, newValue) => {
        setXValue(newValue);
    };

    const handleYChange = (event, newValue) => {
        setYValue(newValue);
    };

    return (
        <Grid item xs={12}>
            <Typography gutterBottom>
                Upper-right Coordinates
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
            <Button variant="contained" color="primary" onClick={() => sendMessage(`${xValue} ${yValue}`)} disabled={!connected} >
                Set Coordinates
            </Button>
        </Grid>
    );
}

export default ControlPanel;
