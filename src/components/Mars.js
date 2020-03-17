import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import { useWebSocketContext } from './WebSocketContext';
import ControlPanel from './ControlPanel';
import WebSocketComponent from './WebSocketComponent';
import MarsSurface from './MarsSurface';
import ResultsPanel from './ResultsPanel';

function Mars() {
    return (
        <useWebSocketContext.Provider>
            <WebSocketComponent />
            <Grid container style={{ padding: 10 }}>
                <Grid item xs={12} style={{ border: "black", borderStyle:"solid", borderWidth: 1, margin: 5 }}>
                    <Typography align="center" variant="h3">Martian Robots</Typography>
                </Grid>
                <Grid item xs={12} style={{ border: "black", borderStyle:"solid", borderWidth: 1, margin: 5 }}>
                    <ControlPanel />
                </Grid>
                <Grid item xs={12} style={{ border: "black", borderStyle:"solid", borderWidth: 1, margin: 5 }}>
                    <MarsSurface />
                </Grid>
                <Grid item xs={12} style={{ border: "black", borderStyle:"solid", borderWidth: 1, margin: 5 }}>
                    <ResultsPanel />
                </Grid>
            </Grid>
        </useWebSocketContext.Provider>
    );
}

export default Mars;
