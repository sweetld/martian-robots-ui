import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import { useWebSocketContext } from './WebSocketContext';
import ControlPanel from './ControlPanel';
import WebSocketComponent from './WebSocketComponent';
import MarsSurface from './MarsSurface';

function Mars() {
    return (
        <useWebSocketContext.Provider>
            <WebSocketComponent />
            <Grid container spacing={2} style={{ padding: 10 }}>
                <Grid item xs={12}>
                    <Typography >Mars</Typography>
                </Grid>
                <Grid item xs={12}>
                    <ControlPanel />
                </Grid>
                <Grid item xs={12}>
                    <MarsSurface />
                </Grid>
            </Grid>
        </useWebSocketContext.Provider>
    );
}

export default Mars;
