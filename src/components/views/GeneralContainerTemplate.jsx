import React from 'react';
import {
    Box,
    Divider,
} from '@mui/material';

const GeneralContainerTemplate = (props) => {

    return (
        <div style={{ width: "100%" }}>
            <Box>
            { props.searchView }
            </Box>
            <Divider sx={{ mt: 2.5 }} />
            <Box sx={{ flowGrow: 1, mt: 2, mr: 3 }}>
            {/* { React.cloneElement(props.listView, { targets: targets }) } */}
            { props.listTableView }
            </Box>
            {/* { React.cloneElement(props.addDialog, { open: openAddDialog }) } */}
            { props.addDialog }
        </div>
    )
}

export default GeneralContainerTemplate;