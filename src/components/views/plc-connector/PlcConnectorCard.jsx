import React, { Fragment } from 'react';

import { 
    Box, 
    Card, 
    CardActions, 
    CardContent, 
    Divider, 
    IconButton, 
    TextField,
    Tooltip, 
    Typography 
} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HistoryIcon from '@mui/icons-material/History';

import { useTheme } from '@mui/material/styles';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import { useConfirm } from '../../widgets/dialogs/useConfirm';
import { deletePlcConnector, publishPlcConnector, releasePlcConnector, testPlcConnection } from './PlcConnectorApi';

const PlcConnectorCard = (props) => {

    const theme = useTheme();

    const { Notifier } = React.useContext(AlertContext);

    const { confirm } = useConfirm();

    const [plcConInfo, setPlcConInfo] = React.useState(props.plcConInfo);
    const [selected, setSelected] = React.useState(false);
    const [ctrlKeyPressed, setCtrlKeyPressed] = React.useState(false);
    const [actionShow, setActionShow] = React.useState(false);

    React.useEffect(()=>{
        setPlcConInfo(props.plcConInfo);
    }, [props.plcConInfo]);

    React.useEffect(()=>{
        setCtrlKeyPressed(props.ctrlKeyPressed);
    }, [props.ctrlKeyPressed]);

    React.useEffect(()=>{
        props.onChecked(props.seq, selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    const onCardClick = () => {
        if(ctrlKeyPressed) {
            setSelected(!selected);
        }
    }

    const handleOnDeletePlc = async () => {
        const res=await checkConfirm("PLC Connector deletion");
        if(!res) return;

        deletePlcConnector(plcConInfo.id, (resp, error)=> {
            if(error===undefined) {
                Notifier.info({ 
                    title: "Success to delete PLC Connector", 
                    message: "Success to delete PLC Connector [" + plcConInfo.name + "]", 
                    modal: false 
                })
                props.onDeleted();
            } else {
                Notifier.warn({ 
                    title: "Fail to delete PLC Connector", 
                    message: "name [ "+plcConInfo.name + " ], Cause:" + error, 
                    modal: true 
                })
            }
        });
    }

    const handleOnPublishPlc = async () => {
        const res=await checkConfirm("PLC Connector publish");
        if(!res) return;

        publishPlcConnector(plcConInfo.id, (resp, error)=>{
            if(error===undefined) {
                Notifier.info({ 
                    title: "Success to publish PLC Connector", 
                    message: "Success to publish PLC Connector [" + plcConInfo.name + "]", 
                    modal: false 
                })
                props.onUpdated();
            } else {
                Notifier.warn({ 
                    title: "Fail to publish PLC Connector", 
                    message: "name [ "+plcConInfo.name + " ], Cause:" + error, 
                    modal: true 
                })
            }
        });
    }

    const handleOnReleasePlc = async () => {
        const res=await checkConfirm("PLC Connector release");
        if(!res) return;

        releasePlcConnector(plcConInfo.id, (resp, error)=>{
            if(error===undefined) {
                Notifier.info({ 
                    title: "Success to release PLC Connector", 
                    message: "Success to release PLC Connector [" + plcConInfo.name + "]", 
                    modal: false 
                });
                props.onUpdated();
            } else {
                Notifier.warn({ 
                    title: "Fail to release PLC Connector", 
                    message: "name [ "+plcConInfo.name + " ], Cause:" + error, 
                    modal: true 
                })
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

    const handleOnConnectionHistories = () => {
        props.onShowPlcConHistory(plcConInfo.id);
    }

    const handleOnTestPlcConnection = async () => {
        const res=await checkConfirm("PLC connection test");
        if(!res) return;

        testPlcConnection(plcConInfo.id, (reply, error) => {
            if(error===undefined) {
                setPlcConInfo({ ...plcConInfo, status2: reply.result })
                Notifier.info({ 
                    title: " PLC connection test result", 
                    message: "result: [" + reply.result + "], cause: [" + reply.cause + "], details: [" + reply.description + "]", 
                    modal: false 
                });
            } else {
                Notifier.warn({ 
                    title: "Fail to do PLC's connection test", 
                    message: "name [ "+plcConInfo.name + " ], Cause:" + error, 
                    modal: true 
                });
            }
        });
    }

    return (
        <Box sx={{ minWidth: 200, maxWidth: 320 }} >
            <Card 
                sx={{ 
                    backgroundColor: selected?theme.palette.background.footer:theme.palette.background.default,
                    ":hover" : {
                        backgroundColor: "info.light",
                        color: "info.contrastText"
                    } 
                }} 
                onClick={ onCardClick }
            >
                <CardContent sx={{ pb: 0 }}>
                    <Box 
                        sx={{ cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                        onClick={ ()=>props.onRetrieval(props.seq) }
                    >
                        <Tooltip title={ plcConInfo.name + " ( ID: " + plcConInfo.id + " )" }>
                            <Typography sx={{ fontSize: 15 }} noWrap>
                                { (plcConInfo.name ? plcConInfo.name + " ( ID: " + plcConInfo.id + " )" : "No named PLC Connector") }
                            </Typography>
                        </Tooltip>
                        
                    </Box>
                    <Divider sx={{ mt: 1, mb: 2 }}/>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box>
                                <TextField
                                    sx={{ p:0, m:0, mt: 0.5, width: '14ch' }}
                                    id="host-ip-text-field-outlined"
                                    label="Host IP"
                                    InputLabelProps={{ sx:{ fontSize: 13, mt: 0 }, shrink: true }}
                                    InputProps={{ sx: { fontSize: 14 }, disableUnderline: true  }}
                                    value={ plcConInfo.hostIp }
                                    variant='standard'
                                    size="small"
                                />
                                <TextField
                                    sx={{ p:0, m:0, mt: 0.5, width: '14ch' }}
                                    id="manufacturer-text-field-outlined"
                                    label="Manufacturer"
                                    InputLabelProps={{ sx:{ fontSize: 13, mt: 0 }, shrink: true }}
                                    InputProps={{ sx: { fontSize: 14 }, disableUnderline: true  }}
                                    value={ plcConInfo.manufacturer }
                                    variant='standard'
                                    size="small"
                                />
                                <TextField
                                    sx={{ p:0, m:0, mt: 0.5, width: '14ch' }}
                                    id="publish-status-text-field-outlined"
                                    label="Publish status"
                                    InputLabelProps={{ sx:{ fontSize: 13, mt: 0 }, shrink: true }}
                                    InputProps={{ sx: { fontSize: 14 }, disableUnderline: true  }}
                                    value={ plcConInfo.status1 }
                                    variant='standard'
                                    size="small"
                                />
                            </Box>
                            <Box sx={{ display: "block", mr: 3 }}>
                                <Tooltip title={ plcConInfo.status2 }>
                                    { 
                                    (plcConInfo.status2==="CONNECTION_TEST_OK" || plcConInfo.status2==="RUNNING")?
                                    <SentimentSatisfiedAltIcon color="success" sx={{ fontSize:'64px' }}/>
                                    : (plcConInfo.status2==="CONNECTION_TEST_ERROR" || plcConInfo.status2==="ERROR") ?
                                    <SentimentVeryDissatisfiedIcon color="error" sx={{ fontSize:'64px' }}/>
                                    :
                                    <SentimentNeutralIcon color="action" sx={{ fontSize:'64px' }}/>
                                    }
                                </Tooltip>
                            </Box>
                        </Box>
                        <Box>
                            <TextField
                                sx={{ p:0, m:0, mt: 0.5, width: '28ch' }}
                                id="frame-format-and-memory-type-text-field-outlined"
                                label="Frame format / Memory type"
                                InputLabelProps={{ sx:{ fontSize: 13, mt: 0 }, shrink: true }}
                                InputProps={{ sx: { fontSize: 14 }, disableUnderline: true  }}
                                value={ plcConInfo.messageFrameFormat + " / [ " + plcConInfo.memTypes + " ]" }
                                variant='standard'
                                size="small"
                            />
                            <Tooltip title={ plcConInfo.description }>
                                <TextField
                                    sx={{ 
                                        width: '28ch',
                                        "& .MuiInputBase-input": {
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis"
                                        },
                                        p:0, m:0, mt: 0.5
                                    }}
                                    id="description-text-field-outlined"
                                    label="Description"
                                    InputLabelProps={{ sx:{ fontSize: 13, mt: 0 }, shrink: true }}
                                    InputProps={{ sx: { fontSize: 14 }, disableUnderline: true  }}
                                    value={ plcConInfo.description }
                                    variant='standard'
                                    size="small"
                                    noWrap
                                />
                            </Tooltip>
                        </Box>
                    </Box>
                </CardContent>
                {/* <Divider/> */}
                <CardActions onMouseLeave={ ()=>setActionShow(false) } sx={{ m:0, p:0, mr: 1.5 }}>
                    <Box sx={{ m:0, p:0, width: "100%", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
                        <Box sx={{ m:0, p:0, display: actionShow ? "none" : "block" }}>
                            <IconButton onMouseOver={ ()=>setActionShow(true) }>
                                <MoreHorizIcon color="disabled" fontSize='small'/>
                            </IconButton>
                        </Box>
                        <Box sx={{ m:0, p:0, display: actionShow ? "block" : "none" }}>
                            <Tooltip title="Edit">
                                <IconButton onClick={ ()=>props.onRetrieval(props.seq, true)}>
                                    <EditIcon color="inherit" fontSize='small'/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Remove">
                                <IconButton onClick={ handleOnDeletePlc }>
                                    <DeleteIcon color="inherit" fontSize='small'/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Connection History">
                                <IconButton onClick={ handleOnConnectionHistories }>
                                    <HistoryIcon color="inherit" fontSize='small'/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Connection Test to PLC">
                                <IconButton onClick={ handleOnTestPlcConnection }>
                                    <CloudSyncIcon color="inherit" fontSize='small'/>
                                </IconButton>
                            </Tooltip>
                            {/* <Button size="small" color="inherit" component={ RouterLink } to="/vplc_monitoring">See & Control</Button> */}
                            {
                            plcConInfo.status1 && (plcConInfo.status1==="REGISTERED" || plcConInfo.status1==="RELEASED") ?
                            <Tooltip title="Publish">
                                <IconButton onClick={ handleOnPublishPlc }>
                                    <PublishedWithChangesIcon color="inherit" fontSize='small'/>
                                </IconButton>
                            </Tooltip>
                            : 
                            <Tooltip title="Release">
                                <IconButton onClick={ handleOnReleasePlc }>
                                    <UnpublishedIcon color="inherit" fontSize='small'/>
                                </IconButton>
                            </Tooltip>
                            }
                        </Box>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    )
}

export default PlcConnectorCard;