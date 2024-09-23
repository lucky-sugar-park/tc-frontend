import React from 'react';

import {
    Box,
    IconButton,
    Tooltip,
    Typography
} from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import TableRowsIcon from '@mui/icons-material/TableRows'

import VplcListCardView from './VplcListCardView';
import VplcListTableView from './VplcListTableView';

const VplcListView = (props) => {

    const { title, count, operButtons } = props;

    const [viewType, setViewType] = React.useState("CardView");

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
            <Box sx={{ flowGrow: 1, mt: 1, mr: 0 }}>
            {
                viewType==="CardView" ?
                <VplcListCardView 
                    vplcList={ props.vplcList } 
                    onChecked={ ()=>console.log("") }
                    { ...props }
                />
                :
                <VplcListTableView 
                    vplcList={ props.vplcList } 
                    onChecked={ ()=>console.log("") }
                    { ...props }
                />
            }
            </Box>
        </Box>
    )
}

export default VplcListView;