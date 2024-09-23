import React from 'react';

import { 
    Button,
    Checkbox, 
    IconButton, 
    InputAdornment,
    TableCell, 
    TableRow, 
    TextField,
    Tooltip, 
    Typography
} from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DoneIcon from '@mui/icons-material/Done';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PageviewIcon from '@mui/icons-material/Pageview';

import { useLongTextCommonDialog } from '../../widgets/dialogs/useLongTextCommonDialog';

const WebHookListTableRow = (props) => {

    const { showLongTextCommonDialog } = useLongTextCommonDialog();

    const [webHookInfo, setWebHookInfo] = React.useState(props.webHook);
    const [selected, setSelected] = React.useState(false);
    const [nameOnFocus, setNameOnFocus] = React.useState(false);
    const [urlOnFocus, setUrlOnFocus] = React.useState(false);
    const [descOnFocus, setDescOnFocus] = React.useState(false);

    React.useEffect(()=>{
        setWebHookInfo(props.webHook);
    }, [props.webHook])

    React.useEffect(()=>{
        setSelected(props.selected);
        setWebHookInfo({
            ...webHookInfo,
            selected: props.selected
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.selected]);

    React.useEffect(()=>{
        props.onSelected(props.seq, selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    const handleOnCheckboxClicked = (e) => {
        handleOnChange("selected", !selected)
        setSelected(!selected);
    }

    const handleOnChange = (propName, value) => {
        const temp={
            ...webHookInfo,
            [propName]: value,
            selected: true,
            oper: "U"
        };
        setWebHookInfo(temp);
        setSelected(true);
        props.onRowUpdated(props.seq, temp);
    }

    const handleOnUpdate = () => {
        props.onUpdate(webHookInfo);
    }

    const handleOnLongTextDialogConfirm = (val, kind) => {
        if(kind==="DESCRIPTION") {
            handleOnChange("description", val);
        } else if(kind==="SAMPLE_DATA") {
            handleOnChange("sampleData", val);
        }
    }

    const handleOnDescClick = () => {
        showLongTextCommonDialog({
            title: "Description",
            kind: "DESCRIPTION",
            editMode: true,
            text: webHookInfo.description,
            isOpen: true,
            onConfirm: handleOnLongTextDialogConfirm
        });
    }

    const handleOnSampleDataClick = () => {
        showLongTextCommonDialog({
            title: "WebHook Sample Data",
            kind: "SAMPLE_DATA",
            editMode: true,
            text: webHookInfo.sampleData,
            isOpen: true,
            onConfirm: handleOnLongTextDialogConfirm
        });
    }

    const handleOnDescOnBlur = () => {
        const handle=setInterval(()=>{
            setDescOnFocus(false);
            clearInterval(handle);
        }, 500);
    }

    return (
        <>
        <TableRow sx={{ m: 0, p: 0 }} hover role="checkbox">
            <TableCell type="small" padding='checkbox' >
                <Checkbox 
                    checked={ selected | webHookInfo.oper==="U" ? true : false }
                    onClick={ handleOnCheckboxClicked }
                    size='small'
                    color={ webHookInfo.oper==="U" ? "success" : "error" }
                />
            </TableCell>
            <TableCell type="small" sx={{ m: 0, p: 0 }}>
                <TextField 
                    value={ webHookInfo.name }
                    onChange={ (e)=>handleOnChange("name", e.target.value) }
                    // sx={{ width: '30ch' }}
                    size="small"
                    InputProps={{ sx:{ fontSize: 14 }, disableUnderline: !nameOnFocus }}
                    variant='standard'
                    onFocus={ e=>setNameOnFocus(true) }
                    onBlur={ e=>setNameOnFocus(false) }
                    disabled
                />
            </TableCell>
            <TableCell type="small" sx={{ m: 0, p: 0 }}>
                <TextField 
                    value={ webHookInfo.url }
                    onChange={ (e)=>handleOnChange("url", e.target.value) }
                    // size="small"
                    InputProps={{ sx:{ fontSize: 14 }, disableUnderline: !urlOnFocus }}
                    variant='standard'
                    sx={{ minWidth: '25ch' }}
                    onFocus={ e=>setUrlOnFocus(true) }
                    onBlur={ e=>setUrlOnFocus(false) }
                />
            </TableCell>
            <TableCell type="small" sx={{ m: 0, p: 0 }} align='center'>
                <Tooltip 
                    title={ webHookInfo.status==="NONE"?"No Tested":webHookInfo.status==="OK"?"Test Success":"Test Failed" } 
                    sx={{ ml: 0, p: 0 }}
                >
                    <IconButton>
                    {
                        webHookInfo.status==="NONE" ? <SentimentNeutralIcon color="action" fontSize='small'/>
                        : webHookInfo.status==="OK" ? <SentimentSatisfiedAltIcon color="success" fontSize='small'/>
                        : <SentimentVeryDissatisfiedIcon color="error" fontSize='small'/>
                    }
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell type="small" sx={{ m: 0, p: 0 }}>
                <Button 
                    key="web-hook-sample-data-view-button"
                    size="small" 
                    color="inherit" 
                    startIcon={<PageviewIcon color='inherit' fontSize='small'/>} 
                    variant='standard' 
                    onClick={ handleOnSampleDataClick }
                >
                    <Typography sx={{ fontSize: 14 }}>보기</Typography>
                </Button>
            </TableCell>
            <TableCell type="small" sx={{ m: 0, p: 0 }}>
                <Tooltip title={ webHookInfo.description }>
                    <TextField 
                        value={ webHookInfo.description }
                        onChange={ (e)=>handleOnChange("description", e.target.value) }
                        size="small"
                        InputProps={{ 
                            disableUnderline: descOnFocus?false:true, 
                            endAdornment: (
                                descOnFocus&&
                                <InputAdornment position="end" sx={{ fontSize: '12px' }}>
                                    <IconButton  onClick={ (e)=>handleOnDescClick() }>
                                        <MoreHorizIcon fontSize='small'/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx:{ 
                                fontSize: "14px", 
                                textDecoration: webHookInfo.oper==='D' ? 'line-through' : "none",
                            }
                        }}
                        variant='standard'
                        sx={{ 
                            minWidth: '30ch',
                            "& .MuiInputBase-input": {
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis"
                            }
                        }}
                        onFocus={ e=>setDescOnFocus(true) }
                        onBlur ={ handleOnDescOnBlur }
                    />
                </Tooltip>
            </TableCell>
            <TableCell type="small" sx={{ m: 0, p: 0 }}>
                <Typography sx={{ cursor: "pointer", fontSize: 14 }} onClick={ ()=>props.openWebHookTestDialog(props.seq) }>
                    연결확인
                </Typography>
            </TableCell>
            <TableCell type="small" sx={{ m: 0, p: 0 }}>
                <Tooltip title="삭제">
                    <IconButton color="inherit" onClick={ ()=>props.onDelete(webHookInfo.id, webHookInfo.name) }>
                        <RemoveCircleIcon fontSize='small'/>
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell type="small" sx={{ m: 0, p: 0 }}>
                <Tooltip title="수정">
                    <IconButton color="inherit" onClick={ handleOnUpdate }>
                        <DoneIcon fontSize='small'/>
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
        </>
    )
}

export default WebHookListTableRow;