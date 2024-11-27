import React from 'react';

import Draggable from 'react-draggable';

import {
    Box,
    Button,
    DialogContent,
    DialogTitle,
    Divider,
    FormControlLabel,
    IconButton,
    Paper,
    styled,
    Switch,
    Typography
} from '@mui/material';

import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    Pause as PauseIcon,
    RestartAlt as RestartAltIcon,
    Start as StartIcon,
    Stop as StopIcon,
} from '@mui/icons-material';
import VplcPortListMonitoringPanel from './VplcPortListMonitoringPanel';

const VplcMonitorFloatControlToolbar = (props) => {

    const { 
        vplcId,
        vplcName,
        vplcStatus,
        onControlCommand,
        onShowSearchChange,
        onShowPortsChange,
        onShowControlPanelChange
    } = props;

    const [showSearch, setShowSearch] = React.useState(false);
    const [showPorts, setShowPorts] = React.useState(false);
    const [showControlPanel, setShowControlPanel] = React.useState(false);

    const [expand, setExpand] = React.useState(true);

    const handleOnShowSearchChange = (e) => {
        setShowSearch(e.target.checked);
        onShowSearchChange(e.target.checked);
    }

    const handleOnShowPortsChange = (e) => {
        setShowPorts(e.target.checked);
        onShowPortsChange(e.target.checked);
    }

    const handleOnShowControlPanelChange = (e) => {
        setShowControlPanel(e.target.checked);
        onShowControlPanelChange(e.target.checked);
    }

    const handleOnStart = () => {
        onControlCommand(vplcId, "START");
    }

    const handleOnStop = () => {
        onControlCommand(vplcId, "STOP");
    }

    const handleOnResume = () => {
        onControlCommand(vplcId, "RESUME");
    }

    const handleOnPause = () => {
        onControlCommand(vplcId, "PAUSE");
    }

    return(
        <Draggable>
            <Paper
                maxWidth="lg"
                aria-labelledby="draggable-vplc-monitor-toolbar-title"
                sx={{ 
                    position: "absolute",
                    top: '215px', 
                    right: '80px',
                    zIndex: 10000,
                    backgroundColor: "info.light",
                    opacity: 0.9
                }}
            >
                <DialogTitle 
                    sx={{ cursor: "move", width: "420px", height: "25px", m:0, p:0, ml: 1, mr: 1, overflow: 'hidden' }} 
                    id="draggable-vplc-monitor-toolbar-title"
                >
                    <Box sx={{ display: "flex", m:0, p:0, justifyContent: "space-between", alignItems: "center" }}>
                        <Typography sx={{ fontSize: 13, color: "info.contrastText" }}>Toolbar [ { vplcName && vplcName + " - " + vplcStatus } ]</Typography>
                        <IconButton 
                            onClick={ ()=>setExpand(!expand) }
                            sx={{ m: 0.5, p: 0 }}
                        >
                            { expand === true ? 
                                <ExpandLessIcon sx={{ fontSize: 18, color: "info.contrastText" }} />
                            :
                                <ExpandMoreIcon sx={{ fontSize: 18, color: "info.contrastText" }} />
                            }
                        </IconButton>
                    </Box>
                </DialogTitle>
                <Divider sx={{ borderColor: "info.contrastText" }}/>
                <DialogContent 
                    sx={{ display: expand ? "flex" : "none", m: 0, p: 0, ml: 1, mr: 1 }}
                >
                    <Box>
                        <Box sx={{ display: "flex", justifyContent: "flex-start", ml: 1 }}>
                            <Button 
                                sx={{ 
                                    ml: 0 ,
                                    "&.Mui-disabled": {
                                        color: "info.dark"
                                    },
                                    color: "info.contrastText"
                                }}
                                startIcon={ <StartIcon sx={{ fontSize: 18 }} />} 
                                disabled={ vplcStatus===undefined || vplcStatus==="REGISTERED" || vplcStatus==="RELEASED" || vplcStatus==="RUNNING" || vplcStatus==="PAUSED" }
                                onClick={ handleOnStart }
                            >
                                <Typography fontSize={ 12 }>Start</Typography>
                            </Button>
                            <Button 
                                sx={{ 
                                    ml: 0 ,
                                    "&.Mui-disabled": {
                                        color: "info.dark"
                                    },
                                    color: "success.contrastText"
                                }} 
                                startIcon={ <StopIcon sx={{ fontSize: 18 }} />}
                                disabled={ vplcStatus===undefined || (vplcStatus!=="RUNNING" && vplcStatus!=="PAUSED") }
                                onClick={ handleOnStop }
                            >
                                <Typography fontSize={ 12 }>Stop</Typography>
                            </Button>
                            <Button 
                                sx={{ 
                                    ml: 0 ,
                                    "&.Mui-disabled": {
                                        color: "info.dark"
                                    },
                                    color: "info.contrastText"
                                }}
                                startIcon={ <RestartAltIcon sx={{ fontSize: 18 }} />} 
                                disabled={ vplcStatus===undefined || vplcStatus!=="PAUSED" }
                                onClick={ handleOnResume }
                            >
                                <Typography fontSize={ 12 }>Resume</Typography>
                            </Button>                
                            <Button 
                                sx={{ 
                                    ml: 0 ,
                                    "&.Mui-disabled": {
                                        color: "info.dark"
                                    },
                                    color: "info.contrastText"
                                }}
                                startIcon={ <PauseIcon sx={{ fontSize: 18 }} />}
                                disabled={ vplcStatus===undefined || vplcStatus!=="RUNNING" }
                                onClick={ handleOnPause }
                            >
                                <Typography fontSize={ 12 }>Pause</Typography>
                            </Button>
                        </Box>
                        <Box sx={{ justifyContent:"center", p: 0.4 }}>
                            <FormControlLabel 
                                sx={{ m: 0, pt: 0, ml: 0.5 }} 
                                control={<Switch size="small" checked={ showSearch } />} 
                                label={ <Typography sx={{ fontSize: 12, color: "info.contrastText" }}>Show Search Panel</Typography> }
                                onClick={ handleOnShowSearchChange }
                            />
                            <FormControlLabel 
                                sx={{ m: 0, pt: 0, ml: 0.5 }} 
                                control={<Switch size="small" checked={ showPorts } />} 
                                label={ <Typography sx={{ fontSize: 12, color: "info.contrastText" }}>Show Ports</Typography> }
                                onClick={ handleOnShowPortsChange }
                            />
                            <FormControlLabel 
                                sx={{ m: 0, pt: 0, ml: 0.5 }} 
                                control={<Switch size="small" checked={ showControlPanel } />} 
                                label={ <Typography sx={{ fontSize: 12, color: "info.contrastText" }}>Show Control Panel</Typography> }
                                onClick={ handleOnShowControlPanelChange }
                            />
                        </Box>
                    </Box>
                </DialogContent>
            </Paper>
        </Draggable>
    )
}

export default VplcMonitorFloatControlToolbar;
