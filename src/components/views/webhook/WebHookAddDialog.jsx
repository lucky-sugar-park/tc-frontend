import React from 'react';

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    IconButton,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';

import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral'

import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RunCircleIcon from '@mui/icons-material/RunCircle';
import ClearIcon from '@mui/icons-material/Clear';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import { checkWebHookUrl, registerWebHook } from './WebHookApi';

const WebHookAddDialog = (props) => {

    const { Notifier } = React.useContext(AlertContext);

    const [open, setOpen] = React.useState(props.open);
    const [values, setValues] = React.useState({
        name: "",
        url: "",
        status: "NONE",
        sampleData: "",
        description: "",
    });

    React.useEffect(()=>{
        setOpen(props.open);
    },[props.open]);

    const handleOnClose = () => {
        props.onClose();
    }

    const handleOnConfirm = () => {
        registerWebHook(values, (resp, error)=>{
            if(error===undefined) {
                Notifier.info({ title: "Success to register new WebHook", message: "New WebHook is registered successfully (" + values.name  + ")", modal: false });
                props.onClose();
                props.onAdditionCompleted();

            } else {
                Notifier.warn({ title: "Fail to register WebHook.", message: "Fail to register new WebHook [" + values.name + "], with error [" + error + "]", modal: true });
            }
        });
        
    }

    const handleOnTest = () => {
        if(values.url==="" || values.url===undefined || values.sampleData==="" || values.sampleData===undefined) {
            Notifier.warn({ title: "Missing WebHook URL", message: "WebHook URL and sample data should be provided. Check it please.", modal: true })
            return;
        }
        checkWebHookUrl(values.url, values.sampleData, (resp, error)=>{
            if(error===undefined) {
                if(resp.result==="OK") {
                    setValues({
                        ...values,
                        status: "OK"
                    });
                    Notifier.info({ title: "Success to check URL", message: "URL ( " + values.url + " ) provided works normally.", modal: true });
                } else {
                    setValues({
                        ...values,
                        status: "FAIL"
                    });
                    Notifier.warn({ title: "Fail to check url", message: "URL ( " + values.url + " ) provided does not work normally. [" + resp.cause + "]", modal: true });    
                }
            } else {
                Notifier.warn({ title: "Fail to check url.", message: "No checked because of server error.", modal: true });
            }          
        });
    }

    return (
        <ConfirmationModalDialog
            open={ open }
            onClose={ handleOnClose }
            onCancel={ handleOnClose }
            onConfirm={ handleOnConfirm }
            title="Add New WebHook"
            confirmation={ true }
            setOpen={ props.handleClose }
            titleDivider
            actionDivider
        >
            <Box>
                <TextField
                    sx={{ p:0, width: '50ch' }}
                    required
                    id="webHook-name-text-field-outlined-required"
                    label="Type WebHook Name"
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ sx:{ fontSize: 14 } }}
                    onChange={e=>setValues({
                        ...values,
                        name: e.target.value
                    })}
                    size='small'
                />
            </Box>
            <Box sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
                <TextField
                    sx={{ p:0, width: '50ch' }}
                    required
                    id="url-text-field-outlined-required"
                    label="Type WebHook URL"
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ sx:{ fontSize: 14 } }}
                    onChange={e=>setValues({
                        ...values,
                        url: e.target.value
                    })}
                    size='small'
                />
                <Accordion sx={{ mt: 2 }}>
                    <AccordionSummary
                        expandIcon={ <ArrowDownwardIcon fontSize='small'/> }
                        aria-controls="panel1-content"
                        id="panel1-heaader"
                    >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography fontSize={ 14 }>URL 동작확인</Typography>
                            <Typography fontSize={ 14 }>{ "  :  " }</Typography>
                            <Tooltip 
                                title={ values.status==="NONE"?"No Tested":values.status==="OK"?"Test Success":"Test Failed" } 
                                sx={{ ml: 2, p: 0 }}
                            >
                                <IconButton>
                                {
                                    values.status==="NONE" ? <SentimentNeutralIcon color="action" fontSize='small'/>
                                    : values.status==="OK" ? <SentimentSatisfiedAltIcon color="success" fontSize='small'/>
                                    : <SentimentVeryDissatisfiedIcon color="error" fontSize='small'/>
                                }
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            <TextField
                                sx={{ p:0, width: '46ch' }}
                                multiline
                                required
                                value={ values.sampleData }
                                rows={ 15 }
                                id="sample-data-outlined"
                                label="Your json sample data-This will be saved into server as a sample data"
                                InputLabelProps={{ sx: { fontSize: 13 }, shrink: true }}
                                InputProps={{ sx: { fontSize: 13 } }}
                                onChange={e=>setValues({
                                    ...values,
                                    sampleData: e.target.value
                                })}
                            />
                        </Box>
                        <Box sx={{ mt: 1, display: "flex", justifyContent: "right" }}>
                            <Button 
                                color="inherit" 
                                startIcon={<ClearIcon fontSize='small'/>}
                                onClick={ ()=>setValues({ ...values, sampleData: "" }) }
                            >
                                데이터초기화
                            </Button>
                            <Button 
                                color="inherit" 
                                startIcon={<RunCircleIcon fontSize='small'/>}
                                onClick={ handleOnTest }
                            >
                                동작확인
                            </Button>
                        </Box>

                    </AccordionDetails>
                </Accordion>
            </Box>
            <Box sx={{ mt: 2.5 }}>
                <TextField
                    sx={{ p:0, width: '50ch' }}
                    multiline
                    rows={4}
                    id="description-outlined"
                    label="Description"
                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                    InputProps={{ sx: { fontSize: 14 }}}
                    onChange={e=>setValues({
                        ...values,
                        description: e.target.value
                    })}
                />
            </Box>
        </ConfirmationModalDialog>
    )
}

export default WebHookAddDialog;