import React, { Fragment } from 'react';

import {
    Autocomplete,
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const InterfsSvcTestRequestView = (props) => {

    const theme = useTheme();

    const [interfsInfo, setInterfsInfo] = React.useState(undefined);
    const [requestJson, setRequestJson] = React.useState("");
    const [requestJsonOrig, setRequestJsonOrig] = React.useState("");
    const [requestType, setRequestType] = React.useState("REQUEST_ONLY");

    React.useEffect(()=>{
        if(props.selectedInterfsInfo===undefined) return;
        setInterfsInfo(props.selectedInterfsInfo);       
    }, [props.selectedInterfsInfo]);

    React.useEffect(()=>{
        if(interfsInfo===undefined) return;
        const requestObject={
            opcode: interfsInfo.name,
            transactionId: "TXR-"+crypto.randomUUID(),
            messageId: "MSG"+crypto.randomUUID(),
            pushResult: false,
            shouldReply: true,
            sync: true,
            sender: "TEST-UI",
            receiver: "Tool Control",
            data: {}
        }
        
        if(interfsInfo.dataProps!==undefined) {
            interfsInfo.dataProps.sort((a,b)=>a.order-b.order);
            interfsInfo.dataProps.forEach((prop, index)=>{
                requestObject.data[prop.name]="";
            });
        }
        const json=JSON.stringify(requestObject, null, 4);
        setRequestJson(json);
        setRequestJsonOrig(json);
        props.onRequestJsonChange(json, undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [interfsInfo]);

    const handleOnRequestJsonReset = () => {
        setRequestJson(requestJsonOrig);
        props.onRequestJsonChange(requestJsonOrig, undefined);
    }

    const handleOnInterfsChange = (event, interfs) => {
        props.onInterfsSelectionChange(interfs.seq);
    }

    const handleOnRequestChange = (requestJson, requestType) => {
        if(requestJson!==undefined) {
            setRequestJson(requestJson);
        } 
        if(requestType!==undefined) {
            setRequestType(requestType);
        }
        props.onRequestJsonChange(requestJson, requestType);
    }

    return (
        <Box sx={{ width: "50%", mt: 2, p: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography 
                    fontSize={ 14 } 
                    sx={{ cursor: "pointer" }} 
                    onClick={ ()=>props.onRetrievalInterfaceSelected(props.selectedNum, undefined) }
                >
                    { "요청 데이터 ( " + (interfsInfo&&interfsInfo.name) + " )"}
                </Typography>
                <Button 
                    startIcon={ <RestartAltIcon /> }
                    size='small'
                    variant='contained'
                    color='inherit'
                    onClick={ handleOnRequestJsonReset }
                >
                    <Typography fontSize={ 14 }>Reset</Typography>
                </Button>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1.5 }}>
                <FormControl sx={{ ml: 0 }}>
                    <InputLabel 
                        sx={{  pl: 0.5, fontSize: 14, width: "120px", backgroundColor: theme.palette.background.default }} 
                        required
                        shrink
                    >
                        Interface Name
                    </InputLabel>
                    <Autocomplete
                        value={ { seq: props.selectedNum, id: interfsInfo&&interfsInfo.id, name: interfsInfo&&interfsInfo.name } }
                        clearOnEscape={ true }
                        id="interface-list-autocomplete"
                        options={ props.interfsItems }
                        getOptionLabel={ (item) => item.name }
                        filterSelectedOptions
                        onChange={ handleOnInterfsChange }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputLabelProps={{  sx: { fontSize: 14, mt: 0.3 }, shrink: true }}
                                placeholder="Choose interface to send message"
                                sx={{ width: "45ch", fontSize: 14, "& input::placeholder": { fontSize: 14 } }}
                            />
                        )}
                        size='small'
                    />
                </FormControl>
                <FormControl sx={{ ml: 1.5 }}>
                    <InputLabel 
                        sx={{  ml: 0.5, fontSize: 14, width: "110px", backgroundColor: theme.palette.background.default }} 
                        required
                        shrink
                    >
                        Request Type
                    </InputLabel>
                    <Select
                        labelId="request-type-select-label"
                        id="request-type-select"
                        InputLabelProps={{ shrink: true }}
                        value={ requestType }
                        label="Request Type"
                        onChange={ e=>handleOnRequestChange(undefined, e.target.value) }
                        sx={{ minWidth: '28ch', fontSize: "14px", height: "40px" }}
                        size="small"
                    >
                        <MenuItem value="REQUEST_ONLY">REQUEST ONLT</MenuItem>
                        <MenuItem value="REQUEST_AND_REPLY">REQUEST AND REPLY</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ mt: 1 }}>
                <TextField
                    required
                    fullWidth
                    sx={{ 
                        p:0, 
                        mt:1, 
                        minWidth: '30ch',
                        "& .MuiInputBase-input": {
                            whiteSpace: "nowrap",
                            overflow: "auto",
                        }
                    }}
                    id="ifsvc-request-input-text-required"
                    label="Type your request data as JSON format"
                    value={ requestJson }
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ 
                        sx: { 
                            fontSize: 14, 
                            padding: 1,
                        }, 
                    }}
                    onChange={ e=>handleOnRequestChange(e.target.value, undefined) }
                    placeholder='Type json text here'
                    size="small"
                    multiline
                    minRows={ 20 }
                />
            </Box>
        </Box>
    )
}

export default InterfsSvcTestRequestView;