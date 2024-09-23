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
} from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { frameFormatItems, manufacturerItems, memTypeItems } from './VplcCommonCodes';
import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';
import VplcPortListMonitoringPanel from './VplcPortListMonitoringPanel';

const VplcRetrievalView = (props) => {

    const [connectionDialogOpen, setConnectionDialogOpen] = React.useState(false);
    const [editMode, setEditMode] = React.useState(props.editMode);
    const [applied, setApplied] = React.useState(true);

    const [newValues, setNewValues] = React.useState({});
    const [origValues, setOrigValues] = React.useState({});

    React.useEffect(()=>{
        setEditMode(props.editMode);
    }, [props.editMode]);

    React.useEffect(()=>{
        setNewValues(props.vplcInfo);
        setOrigValues(props.vplcInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.vplcInfo]);

    React.useEffect(()=>{
        props.onApplied(applied);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[applied]);

    React.useEffect(()=>{
        if(props.onEditModeChanged!==undefined) {
            props.onEditModeChanged(editMode);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editMode]);

    const handleOnChange = (propName, val) => {
        setNewValues({
            ...newValues,
            [propName]: val
        });
        setApplied(false);
    }

    const handleOnMemTypesChange = (event, selectedOptions, reason) => {
        const memTypes=[];
        selectedOptions.forEach(memType=>{
            memTypes.push(memType.value);
        });
        handleOnChange("memoryTypeList", memTypes);
    }

    const handleOnChangeApply = () => {
        props.onChangeApply(newValues)
        setApplied(true);
    }

    const handleOnReset = () => {
        setNewValues(origValues);
        setApplied(true);
        props.onReset();
    }

    const memTypeValues = React.useMemo (
        ()=> {
            const selectedItems = [];
            if(newValues===undefined || newValues.memoryTypeList===undefined) return selectedItems;
            for(var i=0;i<memTypeItems.length;i++) {
                for(var j=0;j<newValues.memoryTypeList.length;j++) {
                    if(memTypeItems[i].value===newValues.memoryTypeList[j]) {
                        selectedItems.push(memTypeItems[i]);
                        break;
                    }
                }
            }
            return selectedItems;
        }, [newValues]
    );

    return (
        <>
            <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant='h7'>Virtual PLC 정보</Typography>
                    { props.updatable && props.updatable===true &&
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
                </Box>
                <Box sx={{ display: "flex", mt: 2 }}>
                    <TextField
                        sx={{ p:0, width: '26ch' }}
                        id="vplc-id-text-field-outlined"
                        required
                        label={
                            <Fragment>
                                { "Virtual PLC ID" }
                                <Tooltip title="ID should be unique. Number, text, underline, dash can be used.">
                                    <QuestionMarkIcon fontSize='7px'/>
                                </Tooltip>
                            </Fragment>
                        }
                        InputLabelProps={{ sx:{ fontSize: 14, mt: 0 }, shrink: true }}
                        InputProps={{ sx: { fontSize: 14 } }}
                        value={ newValues ? newValues.id : "" }
                        onChange={ (e)=>handleOnChange("id", e.target.value) }
                        size="small"
                        disabled={ !editMode }
                    />
                    <TextField
                        sx={{ p:0, ml: 1.5, width: '33ch' }}
                        id="vplc-name-text-field-outlined"
                        required
                        label={
                            <Fragment>
                                { "Virtual PLC Name" }
                                <Tooltip title="Virtual plc Name should be unique. kebab case would be preferred">
                                    <QuestionMarkIcon fontSize='7px'/>
                                </Tooltip>
                            </Fragment>
                        }
                        InputLabelProps={{ sx:{ fontSize: 14, mt: 0 }, shrink: true }}
                        InputProps={{ sx: { fontSize: 14 } }}
                        value={ newValues!==undefined ? newValues.name : "" }
                        size="small"
                        onChange={ (e)=>handleOnChange("name", e.target.value) }
                        disabled={ !editMode }
                    />
                </Box>
                <Box sx={{ display: "flex", mt: 2 }}>
                    <FormControl>
                        <InputLabel sx={{  m: 0, p:0, fontSize: 14 }} required shrink>
                            Manufacturer
                        </InputLabel>
                        <Select
                            labelId="vplc-manufacturer-select-label"
                            id="vplc-manufacturer-select"
                            InputLabelProps={{ shrink: true }}
                            value={ newValues&&newValues.manufacturer ? newValues.manufacturer : "None" }
                            label="manufacturer"
                            onChange={ e=>handleOnChange("manufacturer", e.target.value) }
                            sx={{ width: '29.9ch', fontSize: "14px" }}
                            size="small"
                            disabled={ !editMode }
                        >
                            {manufacturerItems&&manufacturerItems.map((item, index)=>{
                                return(
                            <MenuItem key={ item.key } value={ item.value } sx={{ fontSize: 14 }}>{ item.text }</MenuItem>            
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel sx={{  m: 0, p:0, ml: 1.5, fontSize: 14 }} required shrink>
                            Manufacturer
                        </InputLabel>
                        <Select
                            labelId="vplc-frame-format-select-label"
                            id="vplc-frame-format-select"
                            InputLabelProps={{ shrink: true }}
                            value={ newValues&&newValues.frameFormat ? newValues.frameFormat : "None" }
                            label="frameFormat"
                            onChange={ e=>handleOnChange("frameFormat", e.target.value) }
                            sx={{ width: '24ch', fontSize: "14px", ml: 1.5 }}
                            size="small"
                            disabled={ !editMode }
                        >
                            {frameFormatItems&&frameFormatItems.map((item, index)=>{
                                return(
                            <MenuItem key={ item.key } value={ item.value } sx={{ fontSize: 14 }}>{ item.text }</MenuItem>            
                                    )
                                })
                            }
                        </Select>
                    </FormControl>
                    <FormControlLabel 
                        sx={{ m: 0, ml: 1, pt: 0 }} 
                        control={<Switch size="small" checked={ newValues&&newValues.published ? newValues.published : false } />} 
                        label={ <Typography sx={{ fontSize: 14 }}>Publish</Typography> }
                        onClick={ e=>handleOnChange("published", e.target.checked) }
                        labelPlacement='right'
                        disabled={ !editMode }
                    />
                </Box>
                <Box sx={{ display: "flex", alignItems:"center", mt: 2 }}>
                <TextField
                    sx={{ p:0, width: '20ch' }}
                    id="vplc-ip-address-text-field-outlined"
                    label={
                        <Fragment>
                            { "IP Address" }
                            <Tooltip title="PLC IP Address">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputLabelProps={{ sx:{ fontSize: 14, mt: 0 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 } }}
                    value={ newValues&&newValues ? newValues.ipAddress : "" }
                    onChange={ e=>handleOnChange("ipAddress", e.target.value) }
                    size="small"
                    disabled={ !editMode }
                />
                <TextField
                    sx={{ p:0, ml: 1.5, width: '12ch' }}
                    id="plc-start-port-text-field-outlined"
                    label={
                        <Fragment>
                            { "Start port" }
                            <Tooltip title="Start port number set in PLC">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputLabelProps={{ sx:{ fontSize: 14, mt: 0 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 } }}
                    value={ newValues ? newValues.startPort : "" }
                    onChange={ e=>handleOnChange("startPort",  e.target.value) }
                    size="small"
                    disabled={ !editMode }
                />
                <TextField
                    sx={{ p:0, ml: 1.5, width: '12ch' }}
                    id="plc-port-count-text-field-outlined"
                    label={
                        <Fragment>
                            { "Port count" }
                            <Tooltip title="Port count to use">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputLabelProps={{ sx:{ fontSize: 14, mt: 0 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 } }}
                    value={ newValues ? newValues.portCount : "" }
                    onChange={ e=>handleOnChange("portCount",  e.target.value) }
                    size="small"
                    disabled={ !editMode }
                />
                <TextField
                    sx={{ p:0, ml: 1.5, width: '12ch' }}
                    id="plc-port-conn-limit-text-field-outlined"
                    label={
                        <Fragment>
                            { "Conn limit" }
                            <Tooltip title="Connectable limt per port">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputLabelProps={{ sx:{ fontSize: 14, mt: 0 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 } }}
                    value={ newValues ? newValues.portConnLimit : "" }
                    onChange={ e=>handleOnChange("portConnLimit", e.target.value) }
                    size="small"
                    disabled={ !editMode }
                />
                </Box>
                <Box sx={{ display: "flex", alignItems:"center", mt: 2 }}>
                    <Autocomplete
                        value={ memTypeValues }
                        clearOnEscape={ true }
                        multiple
                        id="memType-list-autocomplete"
                        options={ memTypeItems }
                        getOptionLabel={ (item) => item.text }
                        filterSelectedOptions
                        onChange={ handleOnMemTypesChange }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Memory Types"
                                InputLabelProps={{  sx: { fontSize: 14 }, shrink: true }}
                                placeholder="Choose memory types as many as you want"
                                sx={{ width: "540px", fontSize: 14, "& input::placeholder": { fontSize: 14 } }}
                            />
                        )}
                        sx={{ minWidth: "450px" }}
                        size='small'
                        disabled={ !editMode }
                    />
                </Box>
                <Box sx={{ display: "flex", alignItems:"center", mt: 2 }}>
                    <TextField
                        sx={{ 
                            p:0, width: '60ch',
                            "& .MuiInputBase-input": {
                                // whiteSpace: "nowrap",
                            },
                         }}
                        id="vplc-description-text-field"
                        label="Description"
                        InputProps={{ sx: { fontSize: 14 } }}
                        InputLabelProps={{ sx: { fontSize: 14, mt: 0.3 },  shrink: true }}
                        value={ newValues&&newValues!==undefined ? newValues.description : "" }
                        onChange={ (e)=>handleOnChange("description", e.target.value) }
                        size="small"
                        multiline
                        minRows={ 5 }
                        maxRows={ 5 }
                        disabled={ !editMode }
                    />
                </Box>
                { props.viewMode&&props.viewMode==="R"&&
                <Box sx={{ display: "flex", alignItems:"center", mt: 2 }}>
                    <TextField
                        sx={{ p:0, ml: 0, width: '18ch' }}
                        id="vplc-status-text-field-outlined"
                        label={
                            <Fragment>
                                { "Virtual PLC Satsus" }
                                <Tooltip title="REGISTERED | PUBLISHED | RUNNING | PAUSED | STOPPED | RELEASED | UNKNOWN">
                                    <QuestionMarkIcon fontSize='7px'/>
                                </Tooltip>
                            </Fragment>
                        }
                        InputLabelProps={{ sx:{ fontSize: 14, mt: 0 }, shrink: true }}
                        InputProps={{ sx: { fontSize: 14 }, disableUnderline: true }}
                        value={ newValues&&newValues ? newValues.status : "" }
                        onChange={ e=>handleOnChange("status", e.target.value) }
                        size="small"
                        disabled
                        variant='standard'
                    />
                    <Button
                        size='small'
                        color="inherit"
                        variant='standard' 
                        sx={{ ml: 0.5 }}
                        onClick={ ()=>setConnectionDialogOpen(true) }
                        disabled={ props.viewMode==="N" ? true : false }
                    >
                        <Typography sx={{ fontSize: 14 }}>Client 연결상태</Typography>
                    </Button>
                </Box>
                }
            </Box>
            <ConfirmationModalDialog
                open={ connectionDialogOpen }
                onClose={ ()=>setConnectionDialogOpen(false) }
                onCancel={ ()=>setConnectionDialogOpen(false) }
                title="Connection status for VPLC"
                setOpen={ ()=>setConnectionDialogOpen(false) }
                titleDivider
                actionDivider
            >
                <VplcPortListMonitoringPanel 
                    vplcId={ origValues && origValues.id }
                    vplcName={ origValues && origValues.name }
                    portList={ origValues && origValues.connections }
                />
            </ConfirmationModalDialog>

        </>
    )
}

export default VplcRetrievalView;