import React, { Fragment } from 'react';
import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Tooltip,
    Typography
} from '@mui/material'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useTheme } from '@mui/material/styles';
// import { useTheme } from '@emotion/react';

import { searchPlcConnectorAll } from '../plc-connector/PlcConnectorApi';
import { searchWebHookAll } from '../webhook/WebHookApi';
import { searchInterface } from './InterfsApi';

const emptyValue = {
    id: "",
    name: "",
    interfaceType: "READ",
    replyName: "",
    plcName: "",
    commandClassName: "com.mymes.equip.tc.dispatcher.GenericMessageCommand",
    useGenericCommandClass: true,
    use: false,
    sync: false,
    reply: false,
    dataLength: 0,
    webHookNameList: [],
    description: ""
}

const InterfsInfoView = (props) => {

    const theme = useTheme();

    const [editMode, setEditMode] = React.useState(props.editMode===true ? true : false);

    const [newValue, setNewValue] = React.useState(emptyValue);
    const [value, setValue] = React.useState(emptyValue);
    const [applied, setApplied] = React.useState(true);

    const [plcConList, setPlcConList] = React.useState([]);
    const [webHookList, setWebHookList] = React.useState([]);
    const [replyIFList, setReplyIFList] = React.useState([]);

    React.useEffect(()=>{
        fetchRelatedData();
    }, []);

    React.useEffect(()=>{
        if(props.interfsInfo!==undefined) {
            setValue(props.interfsInfo);
            setNewValue(props.interfsInfo);
        }        
    }, [props.interfsInfo]);

    const fetchRelatedData = () => {
        const plcConList = [];
        searchPlcConnectorAll((plcCons, error)=>{
            if(error===undefined) {
                plcCons&&plcCons.forEach((plcCon, index)=>{
                    plcConList.push(plcCon.name)
                })
                setPlcConList(plcConList);
            }
        });
        searchWebHookAll((webHooks, error)=>{
            const whList = [];
            if(error===undefined) {
                webHooks.forEach((wh, index)=>{
                    whList.push(wh.name);
                });
                setWebHookList(whList);
            }
        });
        const searchCondition = { conditions:[] };
        searchCondition.conditions.push({
            name: "interfaceType",
            condType: "EQUALS",
            conjType: "NONE",
            value: "REPLY"
        });
        searchInterface(searchCondition, (replyList, error)=>{
            const replys = [];
            if(replyList===undefined || typeof(replyList)!==Array) return;

            replyList.forEach((reply, index)=>{
                replys.push(reply.name)
            });
            setReplyIFList(replys);
        })
    }

    const handleOnChangeApply = () => {
        if(props.onUpdateApply !== undefined) {
            props.onUpdateApply(newValue);
        } else {
            setValue(newValue);
        }
        setApplied(true);
    }

    const handleOnChange = (name, val) => {
        setNewValue({
            ...newValue,
            [name]:val
        })
        setApplied(false);
    }

    const handleOnReplyNameChange = (event, replyName) => {
        handleOnChange("replyName", replyName);
    }

    const handleOnPlcNameChange = (event, plcName) => {
        handleOnChange("plcName", plcName);
    }

    const handleOnWebHookListChange = (event, selectedOptions, reason) => {
        const webHookNames=[];
        selectedOptions.forEach(name=>{
            webHookNames.push(name);
        });
        handleOnChange("webHookNameList", webHookNames);
    }

    const handleOnReset = () => {
        if(props.onReset !== undefined) {
            props.onReset();
        } else {
            setNewValue(value);
        }
    }

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant='h7'>Interface 정보</Typography>
                { props.updatable && props.updatable === true &&
                <Box>
                    <Button 
                        size="small" 
                        color="inherit" 
                        startIcon={<DoneAllIcon color='inherit'/>} 
                        sx={{ mr: 0.5 }}
                        onClick={ handleOnChangeApply }
                        disabled={ !editMode || applied }
                    >
                        임시저장
                    </Button>
                    <Button 
                        size="small" 
                        color="inherit" 
                        startIcon={<RestartAltIcon color='inherit'/>} 
                        sx={{ mr: 0.5 }}
                        onClick={ handleOnReset }
                        disabled={ !editMode }
                    >
                        리셋
                    </Button>
                    <FormControlLabel 
                        sx={{ m: 0, pt: 0, ml: 0.5 }} 
                        control={<Switch size="small" checked={ editMode } />} 
                        label={ <Typography sx={{ fontSize: 14 }}>Edit</Typography> }
                        onClick={ (e)=>setEditMode(e.target.checked) }
                    />
                </Box>
                }
                
                {/* <Divider /> */}
            </Box>
            <Box sx={{ display: "flex", mt: 2 }}>
                <TextField
                    sx={{ p:0, width: '13ch' }}
                    id="interfs-id-text-field-outlined"
                    label={
                        <Fragment>
                            { "Interface ID" }
                            <Tooltip title="ID will be assigned by server side as a number">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputLabelProps={{ sx:{ fontSize: 14, mt: 0.3 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 } }}
                    value={ newValue ? newValue.id : "" }
                    size="small"
                    disabled
                />
                <TextField
                    sx={{ p:0, ml: 1.5, width: '52ch' }}
                    id="interfs-name-text-field-outlined"
                    required
                    label={
                        <Fragment>
                            { "Interface Name" }
                            <Tooltip title="Interface Name should be unique, ex) opcode.test.read">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputLabelProps={{ sx:{ fontSize: 14, mt: 0.3 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 } }}
                    value={ newValue!==undefined ? newValue.name : "" }
                    size="small"
                    onChange={ (e)=>handleOnChange("name", e.target.value) }
                    disabled={ !editMode }
                />
            </Box>
            <Box sx={{ display: "flex", mt: 2 }}>
                <FormControl>
                    <InputLabel sx={{  m: 0, p:0, pl: 0.5, fontSize: 14, mt: 0.3, width: "110px", backgroundColor: theme.palette.background.default }} required shrink>
                        Interface Type
                    </InputLabel>
                    <Select
                        labelId="interfs-type-select-label"
                        id="interfs-type-select"
                        InputLabelProps={{ shrink: true }}
                        value={ newValue.interfaceType }
                        label="Interface Type"
                        onChange={ (e)=>handleOnChange("interfaceType", e.target.value) }
                        sx={{ width: '15ch', fontSize: "14px" }}
                        size="small"
                        disabled={ !editMode }
                    >
                        <MenuItem value="READ">READ</MenuItem>
                        <MenuItem value="WRITE">WRITE</MenuItem>
                        <MenuItem value="REPLY">REPLY</MenuItem>
                        <MenuItem value="PUSH">PUSH</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ ml: 1.5 }}>
                    <InputLabel sx={{  m: 0, p:0, pl: 0.5, fontSize: 14, mt: 0.3, width: "100px", backgroundColor: theme.palette.background.default }} shrink>
                        {<Fragment>
                            { "Reply Name" }
                            <Tooltip title="READ type interface should be assigned reply type interface registered">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>}
                    </InputLabel>
                    <Autocomplete
                        value={ newValue.replyName }
                        clearOnEscape={ true }
                        id="reply-interface-list-autocomplete"
                        options={ replyIFList }
                        getOptionLabel={ (replyName) => replyName }
                        filterSelectedOptions
                        onChange={ handleOnReplyNameChange }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                // label="Select reply"
                                InputLabelProps={{  sx: { fontSize: 14, mt: 0.3 }, shrink: true }}
                                placeholder="Choose reply interface if required"
                                sx={{ width: "34ch", fontSize: 14, "& input::placeholder": { fontSize: 14 } }}
                            />
                        )}
                        size='small'
                        disabled={ !editMode }
                    />
                </FormControl>
                <FormControl sx={{ ml: 2 }}>
                    <InputLabel sx={{  m: 0, p:0, pl: 0.5, fontSize: 14, mt: 0.3, width: "100px", backgroundColor: theme.palette.background.default }} required shrink>
                        {<Fragment>
                            { "PLC Name" }
                            <Tooltip title="Should choose one target PLC registered">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>}
                    </InputLabel>
                    <Autocomplete
                        value={ newValue.plcName }
                        clearOnEscape={ true }
                        id="plc-list-autocomplete"
                        options={ plcConList }
                        getOptionLabel={ (plcName) => plcName }
                        filterSelectedOptions
                        onChange={ handleOnPlcNameChange }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputLabelProps={{  sx: { fontSize: 14, mt: 0.3 }, shrink: true }}
                                placeholder="Choose plc name"
                                sx={{ width: "23ch", fontSize: 14, "& input::placeholder": { fontSize: 14 } }}
                            />
                        )}
                        size='small'
                        disabled={ !editMode }
                    />
                </FormControl>
            </Box>
            <Box sx={{ display: "flex", alignItems:"center", mt: 2 }}>
                <TextField
                    sx={{ p:0, width: '50ch' }}
                    id="command-class-name-text-field"
                    label={
                        <Fragment>
                            { "Command Class Name" }
                            <Tooltip title="Pre-developed java class name, Recommand to use default class">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputProps={{ style: { fontSize: 14 } }}
                    InputLabelProps={{  sx: { fontSize: 14, mt: 0.3 }, shrink: true }}
                    value={ value ? value.commandClassName : "" }
                    size="small"
                    disabled={ !editMode }
                />
                <FormControlLabel 
                    sx={{ m: 0, pt: 0, ml: 1.5 }} 
                    control={<Switch size="small" checked={ newValue.useGenericCommandClass } />} 
                    label={ <Typography fontSize={ 14 }>Use Default Class</Typography> }
                    labelPlacement="top"
                    onClick={ (e)=>handleOnChange("useGenericCommandClass", e.target.checked) }
                    disabled={ !editMode }
                />
            </Box>
            <Box sx={{ display: "flex", alignItems:"center", mt: 2 }}>
                <Autocomplete
                    value={ newValue.webHookNameList }
                    clearOnEscape={ true }
                    multiple
                    id="webhook-list-autocomplete"
                    options={ webHookList }
                    getOptionLabel={ (webHookName) => webHookName }
                    filterSelectedOptions
                    onChange={ handleOnWebHookListChange }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Select Webhooks"
                            InputLabelProps={{  sx: { fontSize: 14, mt: 0.3 }, shrink: true }}
                            placeholder="Choose webhooks as mana as you want"
                            sx={{ width: "445px", fontSize: 14, "& input::placeholder": { fontSize: 14 } }}
                        />
                    )}
                    sx={{ minWidth: "445px" }}
                    size='small'
                    disabled={ !editMode }
                />
                <TextField
                    sx={{ p:0, ml: 1.5, width: '14ch' }}
                    id="data-length-text-field"
                    label={
                        <Fragment>
                            { "Data Length" }
                            <Tooltip title="be calculated automatically">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputProps={{ sx: { fontSize: 14 } }}
                    InputLabelProps={{ sx: { fontSize: 14, mt: 0.3 }, shrink: true }}
                    value={ newValue ? newValue.dataLength : 0 }
                    onChange={ (e)=>handleOnChange("dataLength", e.target.value) }
                    size="small"
                    disabled
                />
            </Box>
            <Box sx={{ display: "flex", alignItems:"center", mt: 2 }}>
                <FormControlLabel 
                    sx={{ m: 0, pt: 0, ml: 1.5 }} 
                    control={<Switch size="small" checked={ newValue.use } />} 
                    label={ <Typography fontSize={ 14 }>Use</Typography> }
                    labelPlacement="right"
                    onClick={ (e)=>handleOnChange("use", e.target.checked) }
                    disabled={ !editMode }
                />
                <FormControlLabel 
                    sx={{ m: 0, pt: 0, ml: 1.5 }} 
                    control={<Switch size="small" checked={ newValue.sync } />} 
                    label={ <Typography fontSize={ 14 }>Sync manner</Typography> }
                    labelPlacement="right"
                    onClick={ (e)=>handleOnChange("sync", e.target.checked) }
                    disabled={ !editMode }
                />
                <FormControlLabel 
                    sx={{ m: 0, pt: 0, ml: 1.5 }} 
                    control={<Switch size="small" checked={ newValue.reply } />} 
                    label={ <Typography fontSize={ 14 }>Should response with reply</Typography> }
                    labelPlacement="right"
                    onClick={ (e)=>handleOnChange("reply", e.target.checked) }
                    disabled={ !editMode }
                />
            </Box>
            <Box sx={{ display: "flex", alignItems:"center", mt: 2 }}>
                <TextField
                    sx={{ p:0, width: '66ch' }}
                    id="interfs-description-text-field"
                    label="Description"
                    InputProps={{ sx: { fontSize: 14  } }}
                    InputLabelProps={{ sx: { fontSize: 14, mt: 0.3 },  shrink: true }}
                    value={ newValue!==undefined ? newValue.description : "" }
                    onChange={ (e)=>handleOnChange("description", e.target.value) }
                    size="small"
                    multiline
                    minRows={ 3 }
                    disabled={ !editMode }
                />
            </Box>
        </Box>
    )
}

export default InterfsInfoView;