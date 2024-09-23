import React from 'react';
import {
    Box,
    Button,
    Tab,
    TextField
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ClearIcon from '@mui/icons-material/Clear';
import RunCircleIcon from '@mui/icons-material/RunCircle';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';
import { checkWebHookUrl } from './WebHookApi';

const WebHookTestDialog = (props) => {

    const { Notifier } = React.useContext(AlertContext);

    const [open, setOpen] = React.useState(props.open);
    const [webHookInfo, setWebHookInfo] = React.useState(props.webHookInfo);
    const [originalWebHookInfo, setOriginalWebHookInfo] = React.useState(props.webHookInfo);
    const [tabValue, setTabValue] = React.useState('1');
    const [testResponse, setTestResponse] = React.useState("");

    React.useEffect(()=>{
        setOpen(props.open);
    },[props.open]);

    React.useEffect(()=>{
        setWebHookInfo(props.webHookInfo);
        setOriginalWebHookInfo(props.webHookInfo);
    }, [props.webHookInfo]);

    const handleOnClose = () => {
        props.onClose();
    }

    const handleOnConfirm = () => {
        props.onClose();
        props.onTestCompleted(props.seq, webHookInfo);
    }

    const handleTabChange = (event, newvalue) => {
        setTabValue(newvalue);
    }

    const handleOnInitTestData = () => {
        setWebHookInfo(originalWebHookInfo);
    }

    const handleOnTest = () => {
        if(webHookInfo.url==="" || webHookInfo.url===undefined || webHookInfo.sampleData==="" || webHookInfo.sampleData===undefined) {
            Notifier.warn({ title: "Missing WebHook URL", message: "WebHook URL and sample data should be provided. Check it please.", modal: true })
            return;
        }
        setTestResponse("");
        checkWebHookUrl(webHookInfo.url, webHookInfo.sampleData, (resp, error)=>{
            if(error===undefined) {
                if(resp.result==="OK") {
                    setWebHookInfo({
                        ...webHookInfo,
                        status: "OK"
                    });
                    Notifier.info({ title: "Success to check URL", message: "URL ( " + webHookInfo.url + " ) provided works normally.", modal: true });
                } else {
                    setWebHookInfo({
                        ...webHookInfo,
                        status: "FAIL"
                    });
                    Notifier.warn({ title: "Fail to check url", message: "URL ( " + webHookInfo.url + " ) provided does not work normally. [" + resp.cause + "]", modal: true });    
                }
                setTestResponse(JSON.stringify(resp, null, 4));
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
            title="Test WebHook"
            confirmation={ true }
            setOpen={ props.onClose }
            titleDivider
            actionDivider
        >
            <Box>
                <Box sx={{ width: '100%', display: "flex", flexDirection: "column" }}>
                    <TextField
                        sx={{ p:0, width: '55ch', textOverflow: "ellipsis" }}
                        id="webhook-name-text-field"
                        label="WebHook Name"
                        InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                        InputProps={{ sx: { fontSize: 14 }, disableUnderline: true }}
                        value={ webHookInfo !== undefined ? webHookInfo.name: "" }
                        disabled
                        variant='standard'
                    />
                    <TextField
                        sx={{ p:0, mt:1.5,width: '55ch', textOverflow: "ellipsis" }}
                        id="webhook-url-text-field"
                        label="WebHook URL"
                        InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                        InputProps={{ sx: { fontSize: 14 }, disableUnderline: true }}
                        value={ webHookInfo !== undefined ? webHookInfo.url : "" }
                        variant='standard'
                        onChange={ e=>setWebHookInfo({ ...webHookInfo, url: e.target.value} )}
                    />
                    <TextField
                        sx={{ p:0, mt:1.5, width: '55ch', textOverflow: "ellipsis" }}
                        id="webhook-description-text-field"
                        label="Description"
                        InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                        InputProps={{ sx: { fontSize: 14 }, disableUnderline: true }}
                        value={ webHookInfo !== undefined ? webHookInfo.description : "" }
                        multiline
                        minRows={ 2 }
                        maxRows={ 4 }
                        disabled
                        variant='standard'
                    />
                </Box>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                    <TabContext value={ tabValue }>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={ handleTabChange }>
                                <Tab label="Test Data" value="1"/>
                                <Tab label="Test Response" value="2"/>
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Box>
                                <TextField
                                    sx={{ p:0, width: '53ch' }}
                                    value={ webHookInfo&&webHookInfo.sampleData }
                                    multiline
                                    required
                                    rows={16}
                                    id="description-outlined"
                                    label="Make your test data (json 포맷)"
                                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                                    InputProps={{ sx: { fontSize: 14 } }}
                                    onChange={ e=>setWebHookInfo({ ...webHookInfo, sampleData: e.target.value }) }
                                />
                                <Box sx={{ mt: 1, display: "flex", justifyContent: "right" }}>
                                    <Button 
                                        color="inherit" 
                                        startIcon={<ClearIcon fontSize='small'/>}
                                        onClick={ handleOnInitTestData }
                                    >
                                        데이터초기화
                                    </Button>
                                    <Button 
                                        color="inherit" 
                                        startIcon={<RunCircleIcon fontSize='small'/>}
                                        onClick={ handleOnTest }
                                    >
                                        테스트
                                    </Button>
                                </Box>
                            </Box>
                        </TabPanel>
                        <TabPanel value="2">
                            <Box>
                                <TextField
                                    sx={{ p:0, width: '53ch' }}
                                    multiline
                                    rows={18}
                                    id="description-outlined"
                                    label="Response from URL"
                                    InputLabelProps={{ sx: { fontSize: 14 }, shrink: true }}
                                    InputProps={{ sx: { fontSize: 14 }}}
                                    value={ testResponse }
                                    disabled
                                />
                            </Box>
                        </TabPanel> 
                    </TabContext>
                </Box>
            </Box>
        </ConfirmationModalDialog>
    )
}

export default WebHookTestDialog;