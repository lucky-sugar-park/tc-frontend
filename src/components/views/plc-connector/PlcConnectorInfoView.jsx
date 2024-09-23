import React, { Fragment } from 'react';

import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import { useConfirm } from '../../widgets/dialogs/useConfirm';
import { useLongTextCommonDialog } from '../../widgets/dialogs/useLongTextCommonDialog';
import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';
import HeaderPropsTemplateListView from '../interfs/HeaderPropsTemplateView';
import { testPlcConnectionByIpAndPort } from './PlcConnectorApi';
import { frameFormatItems, manufacturerItems, memTypeItems } from './PlcConnectorCommonCodes';
// import LongTextDialog from '../../widgets/dialogs/LongTextDialog';

const PlcInfoView = (props) => {

    const { showLongTextCommonDialog } = useLongTextCommonDialog();
    const { Notifier } = React.useContext(AlertContext);
    const { confirm } = useConfirm();

    const [editMode, setEditMode] = React.useState(props.editMode);
    const [applied, setApplied] = React.useState(true);

    const [newValues, setNewValues] = React.useState({});
    const [origValues, setOrigValues] = React.useState({});
    const [startPort, setStartPort] = React.useState(-1);
    const [portCount, setPortCount] = React.useState(-1);
    const [connectionVips, setConnectionVips] = React.useState("");

    const [headerTemplateInfo, setHeaderTemplateInfo] = React.useState({
        title: "", open: false, kind: "", headers: []
    });

    React.useEffect(()=>{
        setEditMode(props.editMode);
    }, [props.editMode]);

    const makeConnectionVips = (plcConInfo) => {
        var vips="";
        if(plcConInfo===undefined || plcConInfo.connectionVips===undefined || plcConInfo.connectionVips.length<=0) return vips;
        var i=0;
        vips+=plcConInfo.connectionVips[i++]+",";
        for(;i<plcConInfo.connectionVips.length-1;i++) {
            vips+=plcConInfo.connectionVips[i]+",";
        }
        vips+=plcConInfo.connectionVips[i];
        return vips;
    }

    const init = (plcConInfo) => {
        if(plcConInfo&&plcConInfo.ports&&plcConInfo.ports.length>0){
            setStartPort(plcConInfo.ports[0]);
            setPortCount(plcConInfo.ports.length);
        }
        setConnectionVips(makeConnectionVips(plcConInfo));
    }

    React.useEffect(()=>{
        setNewValues(props.plcConInfo);
        setOrigValues(props.plcConInfo);
        init(props.plcConInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.plcConInfo]);

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
        handleOnChange("memTypes", memTypes);
    }

    const handleOnStartPortChange = (val) => {
        setStartPort(val);
        setApplied(false);
    }

    const handleOnPortCountChange = (val) => {
        setPortCount(val);
        setApplied(false);
    }

    const handleOnConnectionVipsChange = (val) => {
        setConnectionVips(val);
        setApplied(false);
    }

    const handleOnChangeApply = () => {
        const ports = [];
        for(var i=0;i<portCount;i++) ports.push(Number(startPort)+i);

        var values = {
            ...newValues,
            ports: ports,
            connectionVips: connectionVips.split(",")
        }
        props.onChangeApply(values)
        setNewValues(values);
        setApplied(true);
    }

    const handleOnReset = () => {
        setNewValues(origValues);
        init(origValues);
        setApplied(true);
        props.onReset();
    }

    const handleOnLongTextDialogConfirm = (longTextValue, kind) => {
        var longTextObj = JSON.parse(longTextValue);
        if(kind==="headerRequestTemplate") {
            setNewValues({
                ...newValues,
                commProtocolHeadersReqTemplate: longTextObj
            });
        } else if(kind==="headerResponseTemplate") {
            setNewValues({
                ...newValues,
                commProtocolHeadersResTemplate: longTextObj
            })
        }
    }

    const handleOnHeaderRequestTemplate = () => {
        showLongTextCommonDialog({
            title: "Communication Protocol Header Request Template",
            kind: "headerRequestTemplate",
            editMode: editMode,
            text: JSON.stringify(newValues.commProtocolHeadersReqTemplate, null, 4),
            isOpen: true,
            onConfirm: handleOnLongTextDialogConfirm
        });
    }

    const handleOnHeaderResponseTemplate = () => {
        showLongTextCommonDialog({
            title: "Communication Protocol Header Response Template",
            kind: "headerResponseTemplate",
            editMode: editMode,
            text: JSON.stringify(newValues.commProtocolHeadersResTemplate, null, 4),
            isOpen: true,
            onConfirm: handleOnLongTextDialogConfirm
        });
    }

    const handleOnOpenTemplateView = (kind) => {
        setHeaderTemplateInfo({
            title:  "Header Template 선택-" + kind,
            kind: kind,
            open: true
        });
    }

    const handleOnHeaderTemplateConfirm = () => {
        setHeaderTemplateInfo({
            ...headerTemplateInfo,
            open: false
        });
        const template={};
        headerTemplateInfo.headers.forEach((header,index)=>{
            template[header["name"]]=header.strValue
        });
        const propName=headerTemplateInfo.kind==="REQUEST_HEADER_TEMPLATE" ? "commProtocolHeadersReqTemplate" : "commProtocolHeadersResTemplate";
        setNewValues({
            ...newValues,
            [propName]: template
        });
    }

    const handleOnTemplateSelect = (template) => {
        if(template===undefined) return;

        setHeaderTemplateInfo({
            ...headerTemplateInfo,
            headers: template.headers
        });
    }

    const handleOnPlcConnectionTest = async () => {
        const res=await checkConfirm("PLC connection test");
        if(!res) return;
        
        testPlcConnectionByIpAndPort(newValues.hostIp, startPort, (reply, error)=>{
            if(error===undefined) {
                setNewValues({ ...newValues, status2: "CONNECTION_TEST_OK" });
                Notifier.info({ 
                    title: "PLC connection test result", 
                    message: "result: [" + reply.result + "], cause: [" + reply.cause + "], details: [" + reply.description + "]", 
                    modal: false 
                });
            } else {
                Notifier.warn({ 
                    title: "Fail to do PLC's connection test", 
                    message: "name [ "+newValues.name + " ], Cause:" + error, 
                    modal: true 
                });
            }
        });
    }

    async function checkConfirm (title) {
        const result = await confirm({
            title: title,
            message: "Are you sure to preceed for this operation?",
            buttons: {
                ok: "Yes",
                cancel: "No"
            }
        });
        return result;
    }

    const memTypeValues = React.useMemo (
        ()=> {
            const selectedItems = [];
            if(newValues===undefined || newValues.memTypes===undefined) return selectedItems;
            for(var i=0;i<memTypeItems.length;i++) {
                for(var j=0;j<newValues.memTypes.length;j++) {
                    if(memTypeItems[i].value===newValues.memTypes[j]) {
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
                <Typography variant='h7'>PLC Connector 정보</Typography>
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
            </Box>

            <Box sx={{ display: "flex", mt: 2 }}>
                <TextField
                    sx={{ p:0, width: '20ch' }}
                    id="plc-id-text-field-outlined"
                    label={
                        <Fragment>
                            { "PLC Connector ID" }
                            <Tooltip title="ID will be assigned by server side as a number">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputLabelProps={{ sx:{ fontSize: 14, mt: 0 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 } }}
                    value={ newValues ? newValues.id : "" }
                    size="small"
                    disabled
                />
                <TextField
                    sx={{ p:0, ml: 2, width: '32ch' }}
                    id="plc-connector-name-text-field-outlined"
                    required
                    label={
                        <Fragment>
                            { "PLC Connector Name" }
                            <Tooltip title="Plc Connector Name should be unique. kebab case would be preferred">
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
                <FormControlLabel 
                    sx={{ m: 0, ml: 1, pt: 0 }} 
                    control={<Switch size="small" checked={ newValues&&newValues.published ? newValues.published : false } />} 
                    label={ <Typography sx={{ fontSize: 14 }}>Publish</Typography> }
                    onClick={ e=>handleOnChange("published", e.target.checked) }
                    labelPlacement='top'
                    disabled={ !editMode }
                />
            </Box>

            <Box sx={{ display: "flex", mt: 2 }}>
                <FormControl>
                    <InputLabel sx={{  m: 0, p:0, fontSize: 14 }} required shrink>
                        Manufacturer
                    </InputLabel>
                    <Select
                        labelId="plc-connector-manufacturer-select-label"
                        id="plc-connector-manufacturer-select"
                        InputLabelProps={{ shrink: true }}
                        value={ newValues&&newValues.manufacturer ? newValues.manufacturer : "None" }
                        label="manufacturer"
                        onChange={ e=>handleOnChange("manufacturer", e.target.value) }
                        sx={{ width: '23ch', fontSize: "14px" }}
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
                <TextField
                    sx={{ p:0, ml: 2, width: '18ch' }}
                    id="plc-connector-info-status-text-field-outlined"
                    label={
                        <Fragment>
                            { "PLC Connector Info Satsus" }
                            <Tooltip title="REGISTERED | PUBLISHED | RELEASED | UNKNOWN">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputLabelProps={{ sx:{ fontSize: 14, mt: 0 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 } }}
                    value={ newValues&&newValues ? newValues.status1 : "" }
                    onChange={ e=>handleOnChange("status1", e.target.value) }
                    size="small"
                    disabled
                />
                <Tooltip title={ newValues&&newValues.status2 }>
                <TextField
                    sx={{ p:0, ml: 2, width: '18ch' }}
                    id="plc-connector-oper-status-text-field-outlined"
                    label={
                        <Fragment>
                            { "PLC Connector Oper Satsus" }
                            <Tooltip title="CONNECTION_TEST_OK | CONNECTION_TEST_FAIL | CONNECTION_TEST_NONE | RUNNING | STOPPED | PAUSED | ERROR | UNKNOWN">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputLabelProps={{ sx:{ fontSize: 14, mt: 0 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 } }}
                    value={ newValues&&newValues ? newValues.status2 : "" }
                    onChange={ e=>handleOnChange("status2", e.target.value) }
                    size="small"
                    disabled
                />
                </Tooltip>
            </Box>

            <Box sx={{ display: "flex", alignItems:"center", mt: 2 }}>
                <TextField
                    sx={{ p:0, width: '60ch' }}
                    id="plc-connector-adapter-class-name-text-field"
                    label={
                        <Fragment>
                            { "Adapter class name" }
                            <Tooltip title="Java class name, No change if no required.">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputProps={{ sx: { fontSize: 14  } }}
                    InputLabelProps={{ sx: { fontSize: 14, mt: 0.3 },  shrink: true }}
                    value={ newValues!==undefined ? newValues.adapterClassName : "" }
                    onChange={ e=>handleOnChange("adapterClassName", e.target.value) }
                    size="small"
                    disabled={ !editMode }
                />
            </Box>

            <Box sx={{ display: "flex", alignItems:"center", mt: 2 }}>
                <TextField
                    sx={{ p:0, width: '20ch' }}
                    id="plc-connector-host-ip-text-field-outlined"
                    label={
                        <Fragment>
                            { "Host IP" }
                            <Tooltip title="PLC Connector IP Address">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputLabelProps={{ sx:{ fontSize: 14, mt: 0 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 } }}
                    value={ newValues&&newValues ? newValues.hostIp : "" }
                    onChange={ e=>handleOnChange("hostIp", e.target.value) }
                    size="small"
                    disabled={ !editMode }
                />
                <TextField
                    sx={{ p:0, ml: 2, width: '12ch' }}
                    id="plc-connector-start-port-text-field-outlined"
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
                    value={ startPort }
                    onChange={ e=>handleOnStartPortChange(e.target.value) }
                    size="small"
                    disabled={ !editMode }
                />
                <TextField
                    sx={{ p:0, ml: 1.3, width: '12ch' }}
                    id="plc-connector-port-count-text-field-outlined"
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
                    value={ portCount }
                    onChange={ e=>handleOnPortCountChange(e.target.value) }
                    size="small"
                    disabled={ !editMode }
                />
                <TextField
                    sx={{ p:0, ml: 1.3, width: '12ch' }}
                    id="plc-connector-port-conn-limit-text-field-outlined"
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
                    value={ newValues ? newValues.connLimitPerPort : "" }
                    onChange={ e=>handleOnChange("connLimitPerPort", e.target.value) }
                    size="small"
                    disabled={ !editMode }
                />
            </Box>

            <Box sx={{ display: "flex", alignItems:"center", mt: 2 }}>
                <TextField
                    sx={{ p:0, width: '60ch' }}
                    id="connection-client-vips-text-field"
                    label={
                        <Fragment>
                            { "Connection client vips (Virtual IPs)" }
                            <Tooltip title="TC's virtual IP addresses to connect PLC (Separated by comma)">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputProps={{ sx: { fontSize: 14  } }}
                    InputLabelProps={{ sx: { fontSize: 14, mt: 0.3 },  shrink: true }}
                    value={ connectionVips }
                    onChange={ (e)=>handleOnConnectionVipsChange(e.target.value) }
                    size="small"
                    disabled={ !editMode }
                    placeholder='ex) 123.123.123.111,123.123.123.112,...'
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
                            sx={{ width: "533px", fontSize: 14, "& input::placeholder": { fontSize: 14 } }}
                        />
                    )}
                    sx={{ minWidth: "450px" }}
                    size='small'
                    disabled={ !editMode }
                />
            </Box>

            <Box sx={{ display: "flex", alignItems:"center", mt: 2 }}>
                <FormControl>
                    <InputLabel sx={{  m: 0, p:0, fontSize: 14 }} required shrink>
                        Message Frame Format
                    </InputLabel>
                    <Select
                        labelId="message-frame-format-select-label"
                        id="message-frame-format-select"
                        InputLabelProps={{ shrink: true }}
                        value={ newValues&&newValues.messageFrameFormat ? newValues.messageFrameFormat : "None" }
                        label="Message Frame Format"
                        onChange={ (e)=>handleOnChange("messageFrameFormat", e.target.value) }
                        sx={{ width: '23ch', fontSize: "14px" }}
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
                    sx={{ m: 0, ml: 2, pt: 0 }} 
                    control={<Switch size="small" checked={ newValues&&newValues.asyncRequestUse ? newValues.asyncRequestUse : false } />} 
                    label={ <Typography sx={{ fontSize: 14 }}>Use Async</Typography> }
                    onClick={ (e)=>handleOnChange("asyncRequestUse", e.target.checked) }
                    disabled={ !editMode }
                    labelPlacement='top'
                />
                <TextField
                    sx={{ p:0, ml: 2, width: '14ch' }}
                    id="plc-connector-start-delay-text-field-outlined"
                    label={
                        <Fragment>
                            { "Start Delay" }
                            <Tooltip title="Async start delay (ms)">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputLabelProps={{ sx:{ fontSize: 14, mt: 0 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 } }}
                    value={ newValues&&newValues ? newValues.asyncTimerStartDelay : "" }
                    onChange={ e=>handleOnChange("asyncTimerStartDelay", e.target.value) }
                    size="small"
                    disabled={ !editMode }
                />
                <TextField
                    sx={{ p:0, ml: 1, width: '14ch' }}
                    id="plc-connector-run-interval-text-field-outlined"
                    label={
                        <Fragment>
                            { "Run Interval" }
                            <Tooltip title="Async run interval">
                                <QuestionMarkIcon fontSize='7px'/>
                            </Tooltip>
                        </Fragment>
                    }
                    InputLabelProps={{ sx:{ fontSize: 14, mt: 0 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 } }}
                    value={ newValues&&newValues ? newValues.asyncTimerRunInterval : "" }
                    onChange={ e=>handleOnChange("asyncTimerRunInterval", e.target.value) }
                    size="small"
                    disabled={ !editMode }
                />
            </Box>

            <Box sx={{ display: "flex", alignItems:"center", mt: 2 }}>
                <TextField
                    sx={{ p:0, width: '60ch' }}
                    id="plc-connector-description-text-field"
                    label="Description"
                    InputProps={{ sx: { fontSize: 14  } }}
                    InputLabelProps={{ sx: { fontSize: 14, mt: 0.3 },  shrink: true }}
                    value={ newValues&&newValues!==undefined ? newValues.description : "" }
                    onChange={ (e)=>handleOnChange("description", e.target.value) }
                    size="small"
                    multiline
                    minRows={ 5 }
                    disabled={ !editMode }
                />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems:"center", mt: 2 }}>
                <Box sx={{ display: "flex", justifyItems: "center" }}>
                    <TextField
                        sx={{ p:0, ml: 0, width: '16ch' }}
                        id="request-header-template-text-field-outlined"
                        label={
                            <Fragment>
                                { "REQ Template" }
                                <Tooltip title="PLC request header template">
                                    <QuestionMarkIcon fontSize='7px'/>
                                </Tooltip>
                            </Fragment>
                        }
                        InputLabelProps={{ sx:{ fontSize: 14, mt: 0 }, shrink: true }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" sx={{ fontSize: '14px' }}>
                                    <IconButton onClick={ handleOnHeaderRequestTemplate }>
                                        <MoreHorizIcon  sx={{ fontSize: 16 }}/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { fontSize: 14, m:0, p:0 }
                        }}
                        value={ newValues ? newValues.commProtocolHeadersReqTemplate : "" }
                        // onChange={ e=>handleOnChange("asyncTimerRunInterval", e.target.value) }
                        size="small"
                        variant='standard'
                        disabled
                    />
                    <Button
                        size='small'
                        color="inherit"
                        // startIcon={ <Grid3x3Icon color='inherit' fontSize='14px' /> } 
                        variant='standard' 
                        sx={{ ml: 0.5 }}
                        onClick={ ()=>handleOnOpenTemplateView("REQUEST_HEADER_TEMPLATE") }
                        disabled={ !editMode }
                    >
                        <Typography sx={{ fontSize: 14 }}>선택</Typography>
                    </Button>
                    <TextField
                        sx={{ p:0, ml: 1, width: '16ch' }}
                        id="response-header-template-text-field-outlined"
                        label={
                            <Fragment>
                                { "RESP Template" }
                                <Tooltip title="PLC response header template">
                                    <QuestionMarkIcon fontSize='7px'/>
                                </Tooltip>
                            </Fragment>
                        }
                        InputLabelProps={{ sx:{ fontSize: 14, mt: 0 }, shrink: true }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" sx={{ fontSize: '14px' }}>
                                    <IconButton onClick={ handleOnHeaderResponseTemplate } >
                                        <MoreHorizIcon sx={{ fontSize: 16 }}/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { m:0, p:0, fontSize: 14 }
                        }}
                        value={ newValues ? newValues.commProtocolHeadersResTemplate : "" }
                        // onChange={ e=>handleOnChange("asyncTimerRunInterval", e.target.value) }
                        size="small"
                        variant='standard'
                        disabled
                    />
                    <Button
                        size='small'
                        color="inherit"
                        // startIcon={ <Grid3x3Icon color='inherit' fontSize='14px' /> } 
                        variant='standard' 
                        sx={{ ml: 0.5 }}
                        onClick={ ()=>handleOnOpenTemplateView("RESPONSE_HEADER_TEMPLATE") }
                        disabled={ !editMode }
                    >
                        <Typography sx={{ fontSize: 14 }}>선택</Typography>
                    </Button>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Button
                        size='small'
                        onClick={ handleOnPlcConnectionTest }
                    >
                        <Typography sx={{ fontSize: 14 }}>연결테스트</Typography>
                    </Button>
                    <Typography
                        sx={{ fontSize: 12 }}
                        color={ (newValues&&(newValues.status2==="CONNECTION_TEST_ERROR" || newValues.status2==="ERROR")) ? "secondary.main" : "" }
                        fontWeight={ (newValues&&(newValues.status2==="CONNECTION_TEST_ERROR" || newValues.status2==="ERROR")) ? 600 : 400 }
                    >
                        { "(" + (newValues&&newValues.status2) + ")"}
                    </Typography>
                </Box>
            </Box>
        </Box>
        <Box>
            <ConfirmationModalDialog 
                open={ headerTemplateInfo.open }
                onClose={ ()=>setHeaderTemplateInfo({ ...headerTemplateInfo, open: false }) }
                onCancel={ ()=>setHeaderTemplateInfo({ ...headerTemplateInfo, open: false }) }
                onConfirm={ handleOnHeaderTemplateConfirm }
                title={ headerTemplateInfo.title }
                confirmation={ true }
                setOpen={ ()=>setHeaderTemplateInfo({ ...headerTemplateInfo, open: false }) }
                titleDivider
                actionDivider
            >
                <HeaderPropsTemplateListView 
                    onTemplateSelect={ handleOnTemplateSelect }
                />
            </ConfirmationModalDialog>
        </Box>
        </>
    );
}

export default PlcInfoView;