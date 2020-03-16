import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useWebSocketContext } from './WebSocketContext';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

const columnDefs = [{
        headerName: "1", field: "1"
    }, {
        headerName: "2", field: "2"
    }, {
        headerName: "3", field: "3"
    }];

const rowData = [{
        1: "X", 2: "", 3: "Lost"
    }, {
        1: "Lost", 2: "", 3: ""
    }, {
        1: "", 2: "X", 3: ""
    }];

function MarsSurface() {
    const { connected, xValue, yValue } = useWebSocketContext();
    return (
        <Grid item xs={12}>
            <div className="ag-theme-balham" style={{ height: '500px', width: '100%' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}>
                </AgGridReact>
            </div>
        </Grid>
    );
}

export default MarsSurface;
