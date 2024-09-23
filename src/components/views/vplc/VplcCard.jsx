import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { 
    Box, 
    Button,
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
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useTheme } from '@mui/material/styles';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import { deleteVplc, publishVplc, releaseVplc } from './VplcApi';

const VplcCard = (props) => {
    
    const theme = useTheme();

    const { Notifier } = React.useContext(AlertContext);

    const [vplcInfo, setVplcInfo] = React.useState(props.vplcInfo);
    const [selected, setSelected] = React.useState(false);
    const [ctrlKeyPressed, setCtrlKeyPressed] = React.useState(false);
    const [actionShow, setActionShow] = React.useState(false);

    React.useEffect(()=>{
        setVplcInfo(props.vplcInfo);
    }, [props.vplcInfo]);

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

    const handleOnDeleteVplc = () => {
        if(vplcInfo.status==="RUNNING") {
            Notifier.warn({ 
                title: "No permitted virtual PLC's status", 
                message: "No running status virtual plc can be deleted [ "+vplcInfo.name + " ]", 
                modal: true 
            })
            return;
        }

        deleteVplc(vplcInfo.id, (resp, error)=> {
            if(error===undefined) {
                Notifier.info({ 
                    title: "Success to delete Virtual PLC", 
                    message: "Success to delete Virtual PLC [" + vplcInfo.name + "]", 
                    modal: false 
                })
                props.onDeleted();
            } else {
                Notifier.warn({ 
                    title: "Fail to delete Virtual PLC", 
                    message: "name [ "+vplcInfo.name + " ], Cause:" + error, 
                    modal: true 
                })
            }
        });
    }

    const handleOnPublishVplc = () => {
        publishVplc(vplcInfo.id, (resp, error)=>{
            if(error===undefined) {
                Notifier.info({ 
                    title: "Success to publish Virtual PLC", 
                    message: "Success to publish Virtual PLC [" +vplcInfo.name + "]", 
                    modal: false 
                })
                props.onUpdated();
            } else {
                Notifier.warn({ 
                    title: "Fail to publish Virtual PLC", 
                    message: "name [ "+vplcInfo.name + " ], Cause:" + error, 
                    modal: true 
                })
            }
        });
    }

    const handleOnReleaseVplc = () => {
        if(vplcInfo.status==="RUNNING") {
            Notifier.warn({ 
                title: "No permitted virtual PLC's status", 
                message: "No running status virtual plc can be released [ "+vplcInfo.name + " ]", 
                modal: true 
            })
            return;
        }
        releaseVplc(vplcInfo.id, (resp, error)=>{
            if(error===undefined) {
                Notifier.info({ 
                    title: "Success to release Virtual PLC", 
                    message: "Success to release Virtual PLC [" + vplcInfo.name + "]", 
                    modal: false 
                })
                props.onUpdated();
            } else {
                Notifier.warn({ 
                    title: "Fail to release Virtual PLC", 
                    message: "name [ "+vplcInfo.name + " ], Cause:" + error, 
                    modal: true 
                });
            }
        });
    }

    return (
        <Box sx={{ minWidth: 200, maxWidth: 320 }} 
        >
            <Card
                sx={{ 
                    backgroundColor: selected?theme.palette.background.footer:theme.palette.background.default,
                    ":hover": {
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
                        <Tooltip title={ vplcInfo.name + " ( ID: " + vplcInfo.id + " )" }>
                            <Typography sx={{ fontSize: 15 }} noWrap>
                                { (vplcInfo.name ? vplcInfo.name + " ( ID: " + vplcInfo.id + " )" : "No named Virtual PLC") }
                            </Typography>
                        </Tooltip>
                    </Box>
                    <Divider sx={{ mt: 1, mb: 2 }}/>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Box>
                                <TextField
                                    sx={{ p:0, m:0, mt: 0.5, width: '14ch' }}
                                    id="ip-address-text-field-outlined"
                                    label="IP Address"
                                    InputLabelProps={{ sx:{ fontSize: 13, mt: 0 }, shrink: true }}
                                    InputProps={{ sx: { fontSize: 14 }, disableUnderline: true  }}
                                    value={ vplcInfo.ipAddress }
                                    variant='standard'
                                    size="small"
                                />
                                <TextField
                                    sx={{ p:0, m:0, mt: 0.5, width: '14ch' }}
                                    id="manufacturer-text-field-outlined"
                                    label="Manufacturer"
                                    InputLabelProps={{ sx:{ fontSize: 13, mt: 0 }, shrink: true }}
                                    InputProps={{ sx: { fontSize: 14 }, disableUnderline: true  }}
                                    value={ vplcInfo.manufacturer }
                                    variant='standard'
                                    size="small"
                                />
                                <TextField
                                    sx={{ p:0, m:0, mt: 0.5, width: '14ch' }}
                                    id="vplc-status-text-field-outlined"
                                    label="Virtual plc status"
                                    InputLabelProps={{ sx:{ fontSize: 13, mt: 0 }, shrink: true }}
                                    InputProps={{ sx: { fontSize: 14 }, disableUnderline: true  }}
                                    value={ vplcInfo.status }
                                    variant='standard'
                                    size="small"
                                />
                                
                            </Box>
                            <Box sx={{ display: "block", mr: 3 }}>
                                
                                <Tooltip title={ vplcInfo.status }>
                                    { 
                                    vplcInfo.status && vplcInfo.status==="RUNNING" ?
                                    <SentimentSatisfiedAltIcon color="success" sx={{ fontSize:'64px' }}/>
                                    : (vplcInfo.status==="STOPPED" || vplcInfo.status==="PAUSED") ?
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
                                value={ vplcInfo.frameFormat + " / [ " + vplcInfo.memoryTypeList + " ]" }
                                variant='standard'
                                size="small"
                            />
                        </Box>
                        <Divider sx={{ mt: 1, mb: 1 }} />
                        <Box>
                            <Tooltip title={ vplcInfo.description }>
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
                                    value={ vplcInfo.description }
                                    variant='standard'
                                    size="small"
                                    noWrap
                                />
                            </Tooltip>
                        </Box>
                    </Box>
                </CardContent>
                <CardActions onMouseLeave={ ()=>setActionShow(false) } sx={{ m:0, p:0, mr: 1.5, mt: 1 }}>
                    <Box sx={{ m:0, p:0, ml: 1.5, width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Box>
                            {/* <RouterLink 
                                to="/vplc/monitor"
                                state={{ vplcInfo: vplcInfo }}
                            > */}
                            <Button
                                size='small'
                                color='inherit'
                                LinkComponent={ RouterLink } 
                                to="/vplc/monitor"
                                state={{ vplcInfo: vplcInfo }}
                            >
                                See & Control
                            </Button>
                            {/* </RouterLink> */}
                        </Box>
                        <Box>
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
                                    <IconButton onClick={ handleOnDeleteVplc }>
                                        <DeleteIcon color="inherit" fontSize='small'/>
                                    </IconButton>
                                </Tooltip>
                                {
                                vplcInfo.status && (vplcInfo.status==="REGISTERED" || vplcInfo.status==="RELEASED") ?
                                <Tooltip title="Publish">
                                    <IconButton onClick={ handleOnPublishVplc }>
                                        <PublishedWithChangesIcon color="inherit" fontSize='small'/>
                                    </IconButton>
                                </Tooltip>
                                : 
                                <Tooltip title="Release">
                                    <IconButton onClick={ handleOnReleaseVplc }>
                                        <UnpublishedIcon color="inherit" fontSize='small'/>
                                    </IconButton>
                                </Tooltip>
                                }
                            </Box>
                        </Box>
                    </Box>
                </CardActions>
            </Card>
        </Box>
    )

}

export default VplcCard;