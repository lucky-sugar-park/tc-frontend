import React from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Divider,
    FormControl,
    InputLabel,
    LinearProgress,
    MenuItem,
    Paper,
    Popper,
    Select,
    Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DataGridPro, GridLogicOperator, GridToolbar, useGridApiRef } from '@mui/x-data-grid-pro';

import getServerPushEventDispatcher from '../../../utils/ServerPushEventDisparcher';
import { makeColumnDefinitions } from './ColumnDefinitions';
import { RowingSharp } from '@mui/icons-material';

const selectableMaxCount = [10, 25, 50, 100, 200, 400, 500, 1000]

const InterfsMsgAuditMonitor = (props) => {

    const apiRef = useGridApiRef();

    const [loading, setLoading] = React.useState(false);

    const auditMsgListRef = React.useRef({ value: [] });
    const rowsRef = React.useRef({ value: [] }); 
    const maxRowsCountRef = React.useRef({ value: 200 });
    const [gridRowsCount, setGridRowsCount] = React.useState(200);

    const [popperOpen, setPopperOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [detailValue, setDetailValue] = React.useState("");
    const handlePopperClick = (event, detailValue) => {
        setAnchorEl(anchorEl?null:event.currentTarget);
        setPopperOpen(!popperOpen);
        setDetailValue(detailValue);
    };

    React.useEffect(()=>{
        const dispatcher=getServerPushEventDispatcher("http://localhost:8080/connect/ispark");
        dispatcher.addConsumer("audit_message", {
            name: "audit_message_monitor",
            onMessage: handleSeverSideEvent
        });

        apiRef.current.sortColumn("timestamp", "desc");

        return () => {
            console.log("unmount audit message monitor component!")
            dispatcher.removeConsumer("audit_message", "audit_message_monitor");
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const handleSeverSideEvent = (ename, data) => {
        if(ename!=="audit_message") return;

        setLoading(true);
        var msg=JSON.parse(data);
        const curr=auditMsgListRef.current.value;
        const next=[...curr, msg];
        if(next.length<=1000) {
            auditMsgListRef.current.value=next;
        } else {
            auditMsgListRef.current.value=next.slice(1);
        }

        const crows=rowsRef.current.value;
        const nrows=[...crows, msg];
        if(nrows.length <= maxRowsCountRef.current.value) {
            rowsRef.current.value=nrows;
            apiRef.current.setRows(rowsRef.current.value);
        } else {
            rowsRef.current.value=nrows.slice(1);
            apiRef.current.setRows(rowsRef.current.value);
        }
        setLoading(false);
    }

    const handleMasRowsCountChange = (e) => {
        const cnt=e.target.value;
        maxRowsCountRef.current.value=cnt;
        setGridRowsCount(cnt);
        const nrows = [];
        var p=0;
        for(var i=auditMsgListRef.current.value.length-1;i>=0;i--) {
            if(p>=cnt) break;
            nrows.push(auditMsgListRef.current.value[i]);
            p++;
        }
        rowsRef.current.value=nrows;
        apiRef.current.setRows(nrows);
    }

    const handleClipboardCopy = (data) => {
        console.log("COPYED=>" + data);
    }

    const getRowId = (row) => {
        return row.id;
    }

    return (
        <Box sx={{ pr: 3 }}>
            <Box>
                <Typography>Audit Message Realtime Monitor</Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        Audit Message Analysis 
                    </AccordionSummary>
                    <AccordionDetails>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                        malesuada lacus ex, sit amet blandit leo lobortis eget.
                    </AccordionDetails>
                </Accordion>
            </Box>
            <Divider sx={{ mb: 1.5 }} />
            <Box sx={{ width: '100%', display: "flex", justifyContent: "space-between", alignItems:"center", pt: 1, pb: 1 }}>
                <Typography sx={{ ml: 2 }}>Readtime Audit Message</Typography>
                <FormControl sx={{ "& .MuiInputBase-root": { height: 40 } }}>
                    <InputLabel sx={{  m: 0, p:0 }} shrink>Select max row</InputLabel>
                    <Select
                        InputLabelProps={{ shrink: true }}
                        label="Max row count"
                        sx={{ width: '20ch'}}
                        value={ maxRowsCountRef.current.value }
                        onChange={ handleMasRowsCountChange }
                    >
                    {
                        selectableMaxCount && selectableMaxCount.map((v, i)=>{
                            return (
                        <MenuItem value={ v }>{ v }</MenuItem>
                            )
                        })
                    }
                    </Select>
                </FormControl>
            </Box >
            <Box style={{ height: "800px", width: '100%' }}>
                <DataGridPro
                    rows={ rowsRef.current.value }
                    columns={ makeColumnDefinitions({ handleClick: handlePopperClick }) }
                    loading={ loading }
                    apiRef={ apiRef }
                    // hideFooterPagination
                    pinnedRows={{
                        top: [  ],
                    }}
                    rowReordering
                    // onRowOrderChange={}
                    slots={{ 
                        toolbar: GridToolbar,
                        loadingOverlay: LinearProgress, 
                    }}
                    slotProps={{
                        toolbar: {
                            showQuickFilter: true
                        },
                        filterPanel: {
                            logicOperators: [GridLogicOperator.And, GridLogicOperator.Or]
                        },
                    }}
                    rowCount={ gridRowsCount }
                    onClipboardCopy={ handleClipboardCopy }
                    sx={{ pt: 2, mt: 0.5 }}
                    getRowId={ getRowId }
                />
                <Popper open={ popperOpen } placement="auto" anchorEl={ anchorEl } disablePortal sx={{ width: "450px", height: "500px" }}>
                    <Box component={ Paper } sx={{ border: 1, p: 1, alignItems: "center", mt: 1 }}>
                    <pre><code>{ JSON.stringify(detailValue, null, 2) }</code></pre>
                    </Box>
                </Popper>
            </Box>
        </Box>
    )
}

export default InterfsMsgAuditMonitor;