import React from 'react';

import {
    Box,
    TableCell,
    Tooltip,
    Typography 
} from '@mui/material';

const TableHeadCell = (props) => {

    return (
        <TableCell>
            <Box sx={{ display: "flex", alignContent: "center" }}>
                <Typography sx={{ alignContent: "center" }}>{ props.name }</Typography>
                {
                    props.helperText&&
                    <Tooltip title={ props.helperText }>
                        <Typography fontSize={ 10 } sx={{ ml: 1 }}>?</Typography>
                    </Tooltip>
                }
                {
                    props.required&&
                    <Typography fontSize={ 10 } sx={{ ml: 0.5 }}>*</Typography>

                }
            </Box>
        </TableCell>
    )
}

export default TableHeadCell;