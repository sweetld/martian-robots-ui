import React, {useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { useWebSocketContext } from './WebSocketContext';
import Typography from '@material-ui/core/Typography';

function ResultsPanel() {
    const { simulationResults } = useWebSocketContext();

    return (
        <Grid item xs={12}>
            <Grid item xs={12} style={{ padding: 5 }}>
                <Typography variant="h6" align="center">
                    Simulation Results
                </Typography>
            </Grid>
            <Grid item xs={12} style={{ padding: 5 }}>
                { simulationResults ?
                    simulationResults.map(robotResult => {
                        return <span >{robotResult}</span>
                    })
                : null}
            </Grid>
        </Grid>
    );
}

export default ResultsPanel;
