import React from 'react';

import {
    Checkbox,
    InputAdornment,
    IconButton,
    TableCell,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import {
    MoreHoriz as MoreHorizIcon,
} from '@mui/icons-material';

import { LongTextCommonDialogContext } from '../../widgets/dialogs/LongTextCommonDialogContext';

const PlcConnectionHistoryListTableRow = (props) => {

    const { showLongTextCommonDialog } = React.useContext(LongTextCommonDialogContext);

    const [checked, setChecked] = React.useState(false);
    const [focuses, setFocuses] = React.useState({
        description: false,
        eventJson: false
    });
    const [plcConHistory, setPlcConHistory] = React.useState(props.plcConHistInfo);

    React.useEffect(()=>{
        setPlcConHistory(props.plcConHistInfo);
    }, [props.plcConHistInfo]);

    React.useEffect(()=>{
        setChecked(props.checked);
        setPlcConHistory({
            ...plcConHistory,
            checked: props.checked
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.checked]);

    React.useEffect(()=>{
        props.onChecked(props.seq, checked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked]);

    const handleCheckboxClicked = (e) => {
        setPlcConHistory({
            ...plcConHistory,
            checked:!checked
        })
        setChecked(!checked);
    }

    const handleOnDescClick = () => {
        showLongTextCommonDialog({
            title: "Description", 
            text: plcConHistory.description, 
            isOpen: true,
            editMode: false, 
        });
    }

    const handleOnDescBlur = () => {
        const handle=setInterval(()=>{
            setFocuses({ ...focuses, description: false });
            clearInterval(handle);
        }, 500);
    }

    const handleOnEventJsonClick = () => {
        showLongTextCommonDialog({
            title: "Event JSON", 
            text: plcConHistory.eventJson, 
            isOpen: true,
            editMode: false, 
        });
    }

    const handleOnEventJsonBlur = () => {
        const handle=setInterval(()=>{
            setFocuses({ ...focuses, eventJson: false });
            clearInterval(handle);
        }, 500);
    }

     return(
        <TableRow sx={{ }} hover role="checkbox" >
            <TableCell size="small" padding='checkbox'>
                <Checkbox 
                    checked={ checked }
                    onClick={ handleCheckboxClicked }
                    size='small'
                />
            </TableCell>
            <TableCell  size="small">
                <Typography sx={{ fontSize: 14 }}>{ plcConHistory.plcConnectorId }</Typography>
            </TableCell>
            <TableCell size="small">
                <Typography fontSize={ 14}>{ plcConHistory.plcConnectorName }</Typography>
            </TableCell>
            <TableCell size="small">
                <Typography fontSize={ 14}>{ plcConHistory.eventType }</Typography>
            </TableCell>
            {/* <TableCell size="small">
                <Typography fontSize={ 14}>{ plcConHistory.status1 }</Typography>
            </TableCell>
            <TableCell size="small">
                <Typography fontSize={ 14}>{ plcConHistory.status2 }</Typography>
            </TableCell> */}
            <TableCell size="small">
                <Typography fontSize={ 14}>{ new Date(plcConHistory.timestamp).toLocaleString() }</Typography>
            </TableCell>
            <TableCell size="small">
                <Typography fontSize={ 14}>{ plcConHistory.cause }</Typography>
            </TableCell>
            <TableCell size="small">
                <TextField
                    size="small"
                    value={ plcConHistory.description }
                    sx={{ 
                        width: '20ch',
                        "& .MuiInputBase-input": {
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }
                    }}
                    variant="standard"
                    InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                            focuses.description&&
                            <InputAdornment position="end" sx={{ fontSize: '12px' }}>
                                <IconButton onClick={ handleOnDescClick }>
                                    <MoreHorizIcon fontSize='small'/>
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx:{ fontSize: "14px"},
                    }}
                    onFocus={ ()=>setFocuses({ ...focuses, description: true }) }
                    onBlur={ handleOnDescBlur }
                />
            </TableCell>
            <TableCell size="small">
                <TextField
                    size="small"
                    value={ plcConHistory.eventJson }
                    sx={{ 
                        width: '20ch',
                        "& .MuiInputBase-input": {
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }
                    }}
                    variant="standard"
                    InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                            focuses.eventJson&&
                            <InputAdornment position="end" sx={{ fontSize: '12px' }}>
                                <IconButton onClick={ handleOnEventJsonClick }>
                                    <MoreHorizIcon fontSize='small'/>
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx:{ fontSize: "14px"},
                    }}
                    onFocus={ ()=>setFocuses({ ...focuses, eventJson: true }) }
                    onBlur={ handleOnEventJsonBlur }
                />
            </TableCell>
        </TableRow>
     )
}

export default PlcConnectionHistoryListTableRow;