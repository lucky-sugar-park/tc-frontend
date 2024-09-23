import React from 'react';

import {
    Box,
    IconButton,
    TableCell,
    Tooltip,
    Typography 
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

const SortableTableHeadCell = (props) => {

    const [sortSelected, setSortSelected] = React.useState(true);
    const [buttonShow, setButtonShow] = React.useState(false) ;
    const [direction, setDirection] = React.useState("ASC");

    React.useEffect(()=>{
        setSortSelected(props.sortSelected);
    },[props.sortSelected]);

    const handleButtonShow = (show) => {
        setButtonShow(show);
    }

    const handleSort = (direction) => {
        setDirection(direction);
        setSortSelected(true);
        props.onSort(props.columnName, direction);
    }

    return (
        <TableCell
            onMouseOver={ ()=> handleButtonShow(true) }
            onMouseOut={ ()=> handleButtonShow(false) }
            { ...props }
        >
            <Box sx={{ display: "flex", alignContent: "center" }}>
                <Typography sx={{ alignContent: "center" }}>{ props.name }</Typography>
                {
                    props.helperText&&
                    <Tooltip title={ props.helperText }>
                        <Typography fontSize={ 10 } sx={{ ml: 0.5 }}>?</Typography>
                    </Tooltip>
                }
                {
                    props.required&&
                    <Typography fontSize={ 10 } sx={{ ml: 0.5 }}>*</Typography>

                }
                <Box sx={{ display: buttonShow || sortSelected ? "block" : "none" }}>
                {
                direction==="ASC" 
                ? 
                    <Tooltip title="Sort By DESC" sx={{ m:0, ml: 1, p:0 }}>
                        <IconButton onClick={ ()=>handleSort("DESC") }>
                            <ArrowUpwardIcon color={ sortSelected ? "action" : "disabled" } fontSize='small'/>
                        </IconButton>
                    </Tooltip>
                :
                    <Tooltip title="Sort By ASC"  sx={{ m:0, ml: 1, p:0 }}>
                        <IconButton onClick={ ()=>handleSort("ASC") }>
                            <ArrowDownwardIcon color={ sortSelected ? "action" : "disabled" } fontSize='small'/>
                        </IconButton>
                    </Tooltip>
                }
                </Box>
            </Box>
        </TableCell>
    )
}

export default SortableTableHeadCell;