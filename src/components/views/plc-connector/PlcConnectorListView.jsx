import React from 'react';

import {
    Box,
    Divider,
    IconButton,
    Tooltip,
    Typography
} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows'

import PlcListCardView from './PlcConnectorListCardView';
import PlcListTableView from './PlcConnectorListTableView';
import PlcConnectionHistoryListDialog from './PlcConnectionHistoryListDialog';

const PlcConnectorListView = (props) => {

    const { title, count, operButtons } = props;

    const [plcConHistoryInfo, setPlcConHistoryInfo] = React.useState({
        open: false,
        plcConId: ""
    });
    const [viewType, setViewType] = React.useState("CardView");

    const handleOnShowPlcConHistory = (plcConId) => {
        setPlcConHistoryInfo({
            open: true,
            plcConId: plcConId
        })
    }

    const handleOnChecked = () => {

    }

    return (
        <Box>
            <Box sx={{ m:0, p:0, mt: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                        <Typography variant='h7'>{ title } ( { count } )</Typography>
                    </Box>
                    <Box sx={{ m: 0, mt: 0, pr: 0 }}>
                        <Tooltip title="Card view" sx={{ m: 0, p: 0 }}>
                            <IconButton onClick={ e=>setViewType("CardView") }>
                                <GridViewIcon 
                                    color={ viewType==="CardView"?"primary":"disabled" } 
                                    fontSize={ viewType==="CardView"?'medium':"small" }
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Table view" sx={{ m: 0, p: 0, mr: 2 }}>
                            <IconButton onClick={e=>setViewType("TableView")}>
                                <TableRowsIcon 
                                    color={viewType==="CardView"?"disabled":"primary"} 
                                    fontSize={ viewType==="TableView"?'medium':"small" }
                                />
                            </IconButton>
                        </Tooltip>
                        { operButtons }
                    </Box>
                </Box>
            </Box>
            {/* <Divider sx={{ mt: 1 }} /> */}
            <Box sx={{ flowGrow: 1, mt: 1, mr: 0 }}>
            {
                viewType==="CardView" ?
                <PlcListCardView 
                    plcConList={ props.plcConList } 
                    onChecked={ handleOnChecked }
                    onShowPlcConHistory={ handleOnShowPlcConHistory }
                    { ...props }
                />
                :
                <PlcListTableView 
                    plcConList={ props.plcConList } 
                    onChecked={ handleOnChecked }
                    onShowPlcConHistory={ handleOnShowPlcConHistory }
                    { ...props }
                />
            }
            </Box>
            <PlcConnectionHistoryListDialog 
                open={ plcConHistoryInfo.open }
                onClose={ ()=>setPlcConHistoryInfo({ plcConId: "", open: false}) }
                onCancel={ ()=>setPlcConHistoryInfo({ plcConId: "", open: false}) }
                plcConId={ plcConHistoryInfo.plcConId }
            />
        </Box>
    )
}

export default PlcConnectorListView;