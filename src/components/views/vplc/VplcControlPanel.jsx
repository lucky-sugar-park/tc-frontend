import React, { Fragment } from 'react';

import {
    Box,
    Button,
    FormControl,
    Divider,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';

import {
    ClearAll as ClearAllIcon,
    Delete as DeleteIcon,
    Pause as PauseIcon,
    QuestionMark as QuestionMarkIcon,
    RestartAlt as RestartAltIcon,
    Send as SendIcon,
    Stop as  StopIcon,
    Start as StartIcon
 } from '@mui/icons-material';

const VplcControlPanel = (props) => {

    const { frameFormat, vplcId, vplcName, vplcStatus } = props;

    const [memTypeOptions, setMemTypeOptions] = React.useState([]);

    const [values, setValues] = React.useState({
       memType: "",
       startAddress: 0,
       dataToWrite: "",
       wordCountToDelete: 0 
    });

    React.useEffect(()=>{
        if(props.memTypeOptions===undefined || props.memTypeOptions.length===0) return;
        setMemTypeOptions(props.memTypeOptions);
        setValues({ ...values, memType:props.memTypeOptions[0].value })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.memTypeOptions]);

    const handleOnChange = (propName, val) => {
        setValues({
            ...values,
            [propName]: val
        })
    }

    const handleOnMoveBy = () => {
        props.onMemOperCommand({
            type: "READ",
            vplcId: vplcId,
            vplcName: vplcName,
            memoryType: values.memType,
            frameFormat: frameFormat,
            startAddress: values.startAddress,
            wordCount: 20
        });
    }

    const handleOnMoveTo = (len) => {
        setValues({ ...values, startAddress:(Number(values.startAddress)+Number(len)) })
        props.onMemOperCommand({
            type: "READ",
            vplcId: vplcId,
            vplcName: vplcName,
            memoryType: values.memType,
            frameFormat: frameFormat,
            startAddress: (Number(values.startAddress)+Number(len)),
            wordCount: 20
        });
    }

    const handleOnDeleteByAddr = () => {
        const wcnt=values.wordCountToDelete;
        var ndata="";
        for(var i=0;i<wcnt<<1;i++) ndata=ndata+"\0";

        props.onMemOperCommand({
            type: "WRITE",
            vplcId: vplcId,
            vplcName: vplcName,
            memoryType: values.memType,
            frameFormat: frameFormat,
            startAddress: values.startAddress,
            data: ndata,
            wordCount: wcnt
        });
    }

    const handleOnWrite = ()=>{
        props.onMemOperCommand({
            type: "WRITE",
            vplcId: vplcId,
            vplcName: vplcName,
            memoryType: values.memType,
            frameFormat: frameFormat,
            startAddress: values.startAddress,
            data: values.dataToWrite,
            wordCount: (values.dataToWrite.length>>1)+(values.dataToWrite.length%2===1?1:0)
        });
    }

    const handleOnClearAll = () => {
        props.onMemOperCommand({
            type: "CLEAR-ALL",
            vplcId: vplcId,
            vplcName: vplcName,
            memoryType: values.memType,
            frameFormat: frameFormat,
            currentPosition: values.startAddress
        })
    }

    const handleOnStart = () => {
        props.onControlCommand(vplcId, "START");
    }

    const handleOnStop = () => {
        props.onControlCommand(vplcId, "STOP");
    }

    const handleOnPause = () => {
        props.onControlCommand(vplcId, "PAUSE");
    }

    const handleOnResume = () => {
        props.onControlCommand(vplcId, "RESUME");
    }

    return (
        <Box>
            {/* <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Button 
                    sx={{ ml: 0 }} 
                    startIcon={ <StartIcon color='inherit'/>} 
                    disabled={ vplcStatus==="REGISTERED" || vplcStatus==="RELEASED" || vplcStatus==="RUNNING" || vplcStatus==="PAUSED" }
                    onClick={ handleOnStart }
                >
                    <Typography fontSize={ 14 }>Start</Typography>
                </Button>
                <Button 
                    sx={{ ml: 1 }} 
                    startIcon={ <StopIcon />}
                    disabled={ vplcStatus!=="RUNNING" && vplcStatus!=="PAUSED" }
                    onClick={ handleOnStop }
                >
                    <Typography fontSize={ 14 }>Stop</Typography>
                </Button>
                <Button 
                    sx={{ ml: 0 }} 
                    startIcon={ <RestartAltIcon color='inherit'/>} 
                    disabled={ vplcStatus!=="PAUSED" }
                    onClick={ handleOnResume }
                >
                    <Typography fontSize={ 14 }>Resume</Typography>
                </Button>                
                <Button 
                    sx={{ ml: 1 }} 
                    startIcon={ <PauseIcon />}
                    disabled={ vplcStatus!=="RUNNING" }
                    onClick={ handleOnPause }
                >
                    <Typography fontSize={ 14 }>Pause</Typography>
                </Button>
            </Box>
            <Divider sx={{ mt: 1 }} /> */}
            <Box sx={{ mt: 3, display: "flex" }}>
                <Box>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <TextField
                            sx={{ p:0, width: '36ch' }}
                            id="vplc-write-data-text-field-outlined"
                            label={
                                <Fragment>
                                    { "Data to write" }
                                    <Tooltip title="Type data with max 20 word (40 bytes)-Only alphabet and number are permitted">
                                        <QuestionMarkIcon fontSize='7px'/>
                                    </Tooltip>
                                </Fragment>
                            }
                            InputLabelProps={{ sx:{ fontSize: 14, mt: 0 }, shrink: true }}
                            InputProps={{ sx: { fontSize: 14 } }}
                            value={ values&&values.dataToWrite }
                            onChange={ e=>handleOnChange("dataToWrite", e.target.value) }
                            size="small"
                        />
                        <Button 
                            sx={{ ml: 2, width: "150px" }} 
                            startIcon={ <SendIcon fontSize='small'/>}
                            onClick={ handleOnWrite }
                        >
                            <Typography fontSize={ 14 }>Write to VPLC</Typography>
                        </Button>
                    </Box>
                    <Box sx={{ display: "flex", mt: 2, alignItems: "center", justifyContent: "space-between" }}>
                        <TextField
                            sx={{ p:0, width: '17.3ch' }}
                            id="vplc-delete-word-count-text-field-outlined"
                            label={
                                <Fragment>
                                    { "Word count to delete" }
                                    <Tooltip title="Only number is permitted">
                                        <QuestionMarkIcon fontSize='7px'/>
                                    </Tooltip>
                                </Fragment>
                            }
                            InputLabelProps={{ sx:{ fontSize: 14, mt: 0 }, shrink: true }}
                            InputProps={{ sx: { fontSize: 14 } }}
                            value={ values&&values.wordCountToDelete }
                            onChange={ e=>handleOnChange("wordCountToDelete", e.target.value) }
                            size="small"
                        />
                        <Button 
                            sx={{ ml: 2, width: "155px" }} 
                            startIcon={ <DeleteIcon fontSize='small'/>}
                            onClick={ handleOnDeleteByAddr }
                        >
                            <Typography fontSize={ 14 }>Delete By Addr</Typography>
                        </Button>
                        <Button 
                            sx={{ ml: 2, width: "150px" }} 
                            startIcon={ <ClearAllIcon fontSize='small'/>}
                            onClick={ handleOnClearAll }
                        >
                            <Typography fontSize={ 14 }>Clear All Data</Typography>
                        </Button>
                    </Box>
                </Box>
                <Box sx={{ ml: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <FormControl>
                            <InputLabel sx={{  m: 0, p:0, fontSize: 14 }} required>Memory Type</InputLabel>
                            <Select
                                labelId="memory-type-select-label"
                                id="memory-type-select"
                                InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                                value={ values&&values.memType }
                                label="Memory Types"
                                onChange={ e=>handleOnChange("memType", e.target.value) }
                                sx={{ width: '180px', fontSize: 14 }}
                                size='small'
                                required
                            >
                                {memTypeOptions&&memTypeOptions.map((item,index)=>{
                                    return(
                                <MenuItem key={ item.key } value={ item.value } sx={{ fontSize: 14 }}>{ item.text }</MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{ p:0, mt: 2, width: '20ch' }}
                            id="vplc-delete-word-count-text-field-outlined"
                            label={
                                <Fragment>
                                    { "Start address" }
                                    <Tooltip title="Only number is permitted">
                                        <QuestionMarkIcon fontSize='7px'/>
                                    </Tooltip>
                                </Fragment>
                            }
                            InputLabelProps={{ sx:{ fontSize: 14, mt: 0 }, shrink: true }}
                            InputProps={{ sx: { fontSize: 14 } }}
                            value={ values&&values.startAddress }
                            onChange={ e=>handleOnChange("startAddress", e.target.value) }
                            size="small"
                        />
                    </Box>
                    <Box>
                        <Button 
                            sx={{ ml: 1, width: "120px", height: "90px"}} 
                            variant='contained'
                            onClick={ handleOnMoveBy }
                        >
                            <Typography>Move By</Typography>
                        </Button>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column"}}>
                        <Button 
                            sx={{ ml: 1, pt: 1.5, pb: 1, width: "140px" }} 
                            variant='contained'
                            onClick={ ()=>handleOnMoveTo(-20) }
                        >
                            <Typography fontSize={ 14 } sx={{ }} >Move To (-20)</Typography>
                        </Button>
                        <Button 
                            sx={{ ml: 1, mt: 1, pt: 1.5, pb: 1, width: "140px" }} 
                            variant='contained'
                            onClick={ ()=>handleOnMoveTo(20) }
                        >
                            <Typography fontSize={ 14 }>Move To (+20)</Typography>
                        </Button>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column"}}>
                        <Button 
                            sx={{ ml: 1, pt: 1.5, pb: 1, width: "140px" }} 
                            variant='contained'
                            onClick={ ()=>handleOnMoveTo(-1) }
                        >
                            <Typography fontSize={ 14 }>Move To (-01)</Typography>
                        </Button>
                        <Button 
                            sx={{ ml: 1, mt: 1, pt: 1.5, pb: 1, width: "140px" }} 
                            variant='contained'
                            onClick={ ()=>handleOnMoveTo(1) }
                        >
                            <Typography fontSize={ 14 }>Move To (+01)</Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default VplcControlPanel;