import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import { useWebSocketContext } from './WebSocketContext';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

function buildCols(xValue) {
    const colDefs = [];
    for (let i = 0; i < xValue; i++) {
        colDefs.push({
            headerName: `${i}`,
            field: `${i}`,
            enableCellChangeFlash: true,
        })
    }
    return colDefs;
}

function buildRows(xValue, yValue) {
    const rowData = [];
    for (let i = 0; i < yValue; i++) {
        const cells = {};
        for (let j = 0; j < xValue; j++) {
            cells[j] = "";
        }
        rowData.push(cells);
    }
    return rowData;
}

function MarsSurface() {
    const { connected, xValue, yValue, sendCommandMessage, newRobotMessage, updatedRobotMessage, numberOfRobots } = useWebSocketContext();
    const [cols, setCols] = useState([]);
    const [rows, setRows] = useState([]);
    const [gridApi, setGridApi] = useState(null);

    const onGridReady = (params) => {
        window.onresize = () => {
            params.api.sizeColumnsToFit();
        }
        setGridApi(params.api);
        params.api.sizeColumnsToFit();
    }

    useEffect(() => {
        if (gridApi) {
            gridApi.sizeColumnsToFit();
        }
    }, [xValue, gridApi])

    useEffect(() => {
        if (gridApi && numberOfRobots === 0) {
            gridApi.setRowData(buildRows(xValue, yValue));
        }
    },[gridApi, numberOfRobots, xValue, yValue]);

    useEffect(() => {
        if (gridApi && newRobotMessage && newRobotMessage.message && newRobotMessage.currentPosition) {
            const col = newRobotMessage.currentPosition.point.x;
            const row = newRobotMessage.currentPosition.point.y;
            const orientation = newRobotMessage.currentPosition.orientation;
            const value = `${orientation} [${newRobotMessage.robotId}]`;
            const itemsToUpdate = [];
            gridApi.forEachNodeAfterFilterAndSort( function(rowNode, index) {
                if (index !== row) {
                    return;
                }
                let data = rowNode.data;
                data[col] = value;
                itemsToUpdate.push(data);
            });
            gridApi.updateRowData({update: itemsToUpdate});
        }
    }, [gridApi, newRobotMessage]);

    return (
        <Grid item xs={12}>
            <Typography variant="h5" align="center">
                Mars
            </Typography>
            <Grid item xs={12} style={{ padding: 5 }}>
                <Button size="small" variant="contained" color="primary" onClick={() => sendCommandMessage('RUN')} disabled={!connected} >
                    Run Simulation
                </Button>
                <div className="ag-theme-balham" style={{ height: '500px', width: '100%' }}>
                    <AgGridReact
                        columnDefs={buildCols(xValue)}
                        rowData={buildRows(xValue, yValue)}
                        onGridReady={onGridReady}>
                    </AgGridReact>
                </div>
            </Grid>
        </Grid>
    );
}

export default MarsSurface;
