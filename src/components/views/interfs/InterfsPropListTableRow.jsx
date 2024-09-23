import React from 'react';

import {
    Checkbox,
    IconButton,
    InputAdornment,
    MenuItem,
    Select,
    TableCell,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import UndoIcon from '@mui/icons-material/Undo';

import LongTextDialog from '../../widgets/dialogs/LongTextDialog';
import { AlertContext } from '../../widgets/dialogs/AlertContext';

const debounce = (callback, delay=500) => {
    let timer;
    
    return (seq, propName, value) => {
        if(timer) {
            clearTimeout(timer);
        }
        timer=setTimeout(()=>{
            callback(seq, propName, value);
        }, delay);
    };
};

const InterfsPropListTableRow = (props) => {

    const [checked, setChecked] = React.useState(props.checked);
    const [descDialogOpen, setDescDialogOpen] = React.useState(false);
    const [row, setRow] = React.useState(props.row);
    const [focuses, setFocuses] = React.useState({
        name: false,
        order: false,
        type: false,
        length: false,
        value: false,
        description: false
    })

    const { Notifier } = React.useContext(AlertContext);

    React.useEffect(()=>{
        setRow(props.row)
    }, [props.row]);

     React.useEffect(()=>{
        setChecked(props.checked);
    }, [props.checked]);

    React.useEffect(()=>{
        props.onChecked(props.seq, checked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked])

    const handleOnChange = (seq, propName, val) => {
        if(row.oper==='D') {
            Notifier.alert("You cannot change in state of DELETE!", true);
            return;
        }

        var state = row.oper;
        if(state!=='N') {
            state="U";
        }
        props.onUpdate(seq, propName, val);
        props.onUpdate(seq, "oper", state);
    }

    const handleOnCheck = () => {
        setChecked(!checked);
    }

    const handleOnDelete = (seq) => {
        if(row.oper==='N') {
            props.onDelete(seq); 
        } else {
            setRow({ ...row, oper: "D" });
            props.onUpdate(seq, "oper", "D");
        }
    }

    const handleUndo = (seq) => {
        if(row.oper!=='D') return;
        setRow({ ...row, oper: "R" });
        props.onUpdate(seq, "oper", "R");
    }

    const handleOnDescClick = () => {
        setDescDialogOpen(true);
    }

    const handleOnDescCancel = () => {
        setDescDialogOpen(false);
    }

    const handleOnDescConfirm = (desc) => {
        setDescDialogOpen(false);
        setRow({
            ...row,
            description: desc
        })
    }

    const handleDescOnBlur = () => {
        const handle=setInterval(()=>{
            setFocuses({ ...focuses, description: false });
            clearInterval(handle);
        }, 500);
    }

    return (
        <>
        <TableRow>
            <TableCell type="small" padding='checkbox'>
                <Checkbox 
                    checked={ checked | row.oper==="D" | row.oper==='U' | row.oper==='N' }
                    size='small'
                    onClick={ handleOnCheck }
                    color={ row.oper==="D" ? "error" : row.oper==='U' ? "success" : row.oper==="N" ? "secondary" : "primary" }
                />
            </TableCell>
            <TableCell>
                {
                props.editMode ?
                <TextField
                    size="small"
                    value={ row.name }
                    sx={{ width: '20ch' }}
                    InputProps={{ 
                        disableUnderline: focuses.name?false:true, 
                        sx:{ 
                            fontSize: "14px", 
                            textDecoration: row.oper==='D' ? 'line-through' : "none",
                        }
                    }}
                    variant="standard"
                    onChange={ e=>handleOnChange(props.seq, "name", e.target.value) }
                    onFocus={ ()=>setFocuses({ ...focuses, name: true }) }
                    onBlur={ ()=>setFocuses({ ...focuses, name: false }) }
                />
                :
                <Typography sx={{ fontSize: '14px' }}>
                    { row.name }
                </Typography>
                }
            </TableCell>
            <TableCell align='right'>
                {
                props.editMode ?
                <TextField
                    size="small"
                    value={ row.order }
                    sx={{ width: '5ch' }}
                    InputProps={{ disableUnderline: focuses.order?false:true, sx:{ fontSize: "14px", }}}
                    variant="standard"
                    onChange={ e=>handleOnChange(props.seq, "order", e.target.value) }
                    onFocus={ ()=>setFocuses({ ...focuses, order: true }) }
                    onBlur={ ()=>setFocuses({ ...focuses, order: false }) }
                />
                :
                <Typography sx={{ fontSize: '14px' }}>
                    { row.order }
                </Typography>
                }
            </TableCell>
            <TableCell>
                {
                <Select
                    labelId="props-data-type-select-label"
                    id="props-data-type-select"
                    defaultValue="STRING"
                    value={ row.type }
                    onChange={ (e)=>handleOnChange(props.seq, "type", e.target.value)}
                    sx={{ 
                        width: '16ch', 
                        fontSize: 14, 
                        borderRadius: 0,
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: 0
                        },
                        "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "solid 1px"
                        }
                    }}
                    size="small"
                    disabled={ !props.editMode }
                    onFocus={ ()=>setFocuses({ ...focuses, type: true })}
                    onBlur={ ()=>setFocuses({ ...focuses, type: false })}
                >
                    <MenuItem value="BOOLEAN">BOOLEAN</MenuItem>
                    <MenuItem value="BYTE">BYTE</MenuItem>
                    <MenuItem value="SHORT">SHORT</MenuItem>
                    <MenuItem value="INT">INT</MenuItem>
                    <MenuItem value="LONG">LONG</MenuItem>
                    <MenuItem value="DOUBLE">DOUBLE</MenuItem>
                    <MenuItem value="STRING">STRING</MenuItem>
                </Select>
                }
            </TableCell>
            <TableCell>
                {
                props.editMode ?
                <TextField
                    size="small"
                    value={ row.length }
                    sx={{ width: '5ch' }}
                    InputProps={{ disableUnderline: focuses.length?false:true, sx:{ fontSize: "14px"}, }}
                    variant="standard"
                    onChange={ e=>handleOnChange(props.seq, "length", e.target.value) }
                    onFocus={ ()=>setFocuses({ ...focuses, length: true })}
                    onBlur={ ()=>setFocuses({ ...focuses, length: false })}
                />
                :
                <Typography sx={{ fontSize: '14px' }}>
                    { row.length }
                </Typography>
                }
            </TableCell>
            <TableCell>
                {
                props.editMode ?
                <TextField
                    size="small"
                    value={ row.value!==undefined ? row.value : row.strValue }
                    sx={{ width: '10ch' }}
                    InputProps={{ disableUnderline: focuses.value?false:true, sx:{ fontSize: "14px"}, }}
                    variant="standard"
                    onChange={ e=>handleOnChange(props.seq, "value", e.target.value) }
                    onFocus={ ()=>setFocuses({ ...focuses, value: true })}
                    onBlur={ ()=>setFocuses({ ...focuses, value: false })}
                />
                :
                <Typography sx={{ fontSize: '14px' }}>
                    { row.value }
                </Typography>
                }
            </TableCell>
            <TableCell>
                <Tooltip title={ row.description }>
                {
                props.editMode ?
                    <TextField
                        size="small"
                        value={ row.description }
                        sx={{ 
                            width: '30ch',
                            "& .MuiInputBase-input": {
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }
                        }}
                        variant="standard"
                        onChange={ e=>handleOnChange(props.seq, "description", e.target.value) }
                        InputProps={{
                            disableUnderline: focuses.description?false:true,
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
                        onBlur={ handleDescOnBlur }
                    />
                :
                    <Typography sx={{ fontSize: "14px" }} noWrap>
                        { row.description }
                    </Typography>
                }
                </Tooltip>
            </TableCell>
            <TableCell align="center">
                <Tooltip title="삭제">
                    <IconButton 
                        disabled={ props.editMode ? false : true }
                        onClick={ row.oper==="D" ? ()=>handleUndo(props.seq) : ()=>handleOnDelete(props.seq) }
                        size='small'
                    >
                    {
                    row.oper!=="D" ? <RemoveCircleIcon/> : <UndoIcon />
                    }
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
        <LongTextDialog
            title="Description"
            open={ descDialogOpen }
            onCancel={ handleOnDescCancel }
            onConfirm={ handleOnDescConfirm }
            editMode={ props.editMode }
            value={ row.description }
        />
        </>
    )
}

export default InterfsPropListTableRow;