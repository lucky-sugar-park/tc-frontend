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
import UndoIcon from '@mui/icons-material/Undo';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import LongTextDialog from '../../widgets/dialogs/LongTextDialog';

const EntryValueTypeList = [
    { id: "ref", name: "REF" },
    { id: "list", name: "LIST" },
    { id: "map", name: "MAP" },
    { id: "STRING", name: "STRING" },
    { id: "INT", name: "INT" },
    { id: "LONG", name: "LONG" },
]

const ScheduleJobDetailListTableRow = (props) => {

    const { Notifier } = React.useContext(AlertContext);

    const [checked, setChecked] = React.useState(false);
    const [jobDetail, setJobDetail] = React.useState(props.jobDetail);
    const [focuses, setFocuses] = React.useState({
        name: false,
        order: false,
        type: false,
        length: false,
        value: false,
        description: false
    })
    const [descDialogOpen, setDescDialogOpen] = React.useState(false);

    React.useEffect(()=>{
        setJobDetail(props.jobDetail);
    }, [props.jobDetail]);

    React.useEffect(()=>{
        setChecked(props.checked);
    }, [props.checked]);

    React.useEffect(()=>{
        props.onChecked(props.seq, checked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked])

    const handleOnChange = (seq, propName, val) => {
        if(jobDetail.oper==='D') {
            Notifier.alert("You cannot change in state of DELETE!", true);
            return;
        }

        var state = jobDetail.oper;
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
        if(jobDetail.oper==="N") {
            props.onDelete(seq);
        } else {
            setJobDetail({ ...jobDetail, oper: "D" });
            props.onUpdate(seq, "oper", "D");
        }
    }

    const handleOnUndo = (seq) => {
        if(jobDetail.oper!=="D") return;
        setJobDetail({ ...jobDetail, "oper": "R" });
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
        setJobDetail({
            ...jobDetail,
            description: desc
        })
    }

    const handleOnDescOnBlur = () => {
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
                    checked={ checked | jobDetail.oper==="D" | jobDetail.oper==='U' | jobDetail.oper==='N' }
                    onClick={ handleOnCheck }
                    size='small'
                    color={ jobDetail.oper==="D" ? "error" : jobDetail.oper==='U' ? "success" : jobDetail.oper==="N" ? "secondary" : "primary" }
                />
            </TableCell>
            <TableCell align="left">
                {
                props.editMode ?
                <TextField
                    size="small"
                    value={ jobDetail.entryKey }
                    sx={{ width: '20ch' }}
                    InputProps={{ 
                        disableUnderline: focuses.name?false:true, 
                        sx:{ 
                            fontSize: "14px", 
                            textDecoration: jobDetail.oper==='D' ? 'line-through' : "none",
                        }
                    }}
                    variant="standard"
                    onChange={ e=>handleOnChange(props.seq, "entryKey", e.target.value) }
                    onFocus={ ()=>setFocuses({ ...focuses, name: true }) }
                    onBlur={ ()=>setFocuses({ ...focuses, name: false }) }
                />
                :
                <Typography sx={{ fontSize: "14px" }}>
                    { jobDetail.entryKey }
                </Typography>
                }
            </TableCell>
            <TableCell align="left">
                {
                props.editMode ?
                <TextField
                    size="small"
                    value={ jobDetail.entryValue }
                    sx={{ width: '20ch' }}
                    variant="standard"
                    InputProps={{ 
                        disableUnderline: focuses.name?false:true, 
                        sx:{ 
                            fontSize: "14px", 
                            textDecoration: jobDetail.oper==='D' ? 'line-through' : "none",
                        }
                    }}
                    onChange={ e=>handleOnChange(props.seq, "entryValue", e.target.value) }
                    onFocus={ ()=>setFocuses({ ...focuses, entryValue: true }) }
                    onBlur={ ()=>setFocuses({ ...focuses, entryValue: false }) }
                />
                :
                <Typography sx={{ fontSize: "14px" }}>
                    { jobDetail.entryValue }
                </Typography>
                }
            </TableCell>
            <TableCell align="center">
                { props.editMode ?
                <Select
                    labelId="schedule-details-item-type-select-label"
                    id="schedule-details-item-type-select"
                    defaultValue="STRING"
                    value={ jobDetail.entryValueType }
                    onChange={ (e)=>handleOnChange(props.seq, "entryValueType", e.target.value) }
                    sx={{ 
                        width: '17ch', 
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
                    {
                        EntryValueTypeList&&EntryValueTypeList.map((item,index)=>{
                            return (
                                <MenuItem key={ index } value={ item.id } sx={{ fontSize: 14 }}>{ item.name }</MenuItem>
                            )
                        })
                    }
                </Select>
                :
                <Typography sx={{ fontSize: "14px" }}>
                    { jobDetail.enttryValueType }
                </Typography>
                }
            </TableCell>
            <TableCell align="center">
                <Tooltip title={ jobDetail.description }>
                {
                props.editMode ?
                <TextField
                    size="small"
                    value={ jobDetail.description }
                    sx={{ 
                        width: '38ch',
                        "& .MuiInputBase-input": {
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }
                    }}
                    variant="standard"
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
                        sx:{ 
                            fontSize: "14px", 
                            textDecoration: jobDetail.oper==='D' ? 'line-through' : "none",
                        }
                    }}
                    onChange={ e=>handleOnChange(props.seq, "description", e.target.value) }
                    onFocus={ ()=>setFocuses({ ...focuses, description: true }) }
                    onBlur={ handleOnDescOnBlur }
                />
                :
                <Typography sx={{ fontSize: "14px" }} noWrap>
                    { jobDetail.description }
                </Typography>
                }
                </Tooltip>
            </TableCell>
            <TableCell  align="center">
                <Tooltip title="삭제">
                    <IconButton 
                        disabled={ props.editMode ? false : true }
                        onClick={ jobDetail.oper==="D" ? ()=>handleOnUndo(props.seq) : ()=>handleOnDelete(props.seq) }
                    >
                    {
                        jobDetail.oper!=="D" ? <RemoveCircleIcon fontSize='small'/> : <UndoIcon />
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
            value={ jobDetail.description }
        />
        </>
    )
}

export default ScheduleJobDetailListTableRow;