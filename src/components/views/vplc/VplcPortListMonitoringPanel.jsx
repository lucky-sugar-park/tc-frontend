import React from 'react';

import { 
    Box, 
    Button, 
    Divider, 
    Link,
    ListItemIcon, 
    ListItemText, 
    Menu, 
    MenuItem, 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableRow, 
    Tooltip,
    Typography 
} from '@mui/material';
import { 
    AddCircleOutline as AddCircleOutlineIcon, 
    RemoveCircle as RemoveCircleIcon, 
    ViewList as ViewListIcon 
} from '@mui/icons-material';
import ConnectedClientListView from './ConnectedClientListView';

function filterByIpAddress (clientList) {
    if(clientList===undefined || clientList.length===0) return "";
    const ret=[];
    clientList.forEach((client, index)=>{
        ret.push(client.clientIp);
    });
    return ret;
}

const VplcPortListMonitoringPanel = (props) => {

    const [clientListOpen, setClientListOpen] = React.useState(false);
    const [selectedPortSeq, setSelectedPortSeq] = React.useState(0);
    const [portList, setPortList] = React.useState([]);
    const [totalInfo, setTotalInfo] = React.useState({ portCount: 0, connectedCount: 0 })
    const [portContextMenu, setPortContextMenu] = React.useState(null);

    React.useEffect(()=>{
        const temp=props.portList===undefined ? [] : props.portList;
        if(temp.length<16) {
            const diff=16-temp.length;
            for(var i=0;i<diff;i++) {
                temp.push({
                    port: 0,
                    connectedCount: 0
                });
            }
        }
        setPortList(temp);
        
        return (()=>{
            setPortList([]);
        });
    }, [props.portList]);

    React.useEffect(()=>{
        var portCount=0;
        var totalConn=0;

        for(var i=0;i<portList.length;i++) {
            if(portList[i].port>0) portCount++;
            totalConn+=portList[i].connectedCount;
        }
        setTotalInfo({
            portCount: portCount,
            connectedCount: totalConn
        });
    }, [portList]);

    const handleOnContextMenu = (e, seq) => {
        e.preventDefault();
        setPortContextMenu({
            mouseY: e.clientY,
            mouseX: e.clientX,
            seq: seq,
            selectedPortNum: portList[seq].port
        });
    }

    const handleOnClose = ()=> {
        setPortContextMenu(null);
    }

    const handleOnShowConnectedClientList = (seq) => {
        setPortContextMenu(null);
        if(portContextMenu.selectedPortNum<=0) return;
        setSelectedPortSeq(seq);
        setClientListOpen(true)
    }

    const PortContextMenu = ()=> {
        return (
            <Paper>
                <Menu 
                    open={ portContextMenu != null }
                    onClose={ ()=>setPortContextMenu(null) }
                    anchorReference="anchorPosition"
                    anchorPosition={
                        portContextMenu != null
                        ? { top: portContextMenu.mouseY, left: portContextMenu.mouseX }
                        : undefined
                    }
                >
                    <MenuItem onClick={ handleOnClose } disabled>
                        <ListItemIcon>
                            <RemoveCircleIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText sx={{ fontSize: 14 }}>Remove Port</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={ handleOnClose } disabled>
                        <ListItemIcon>
                            <AddCircleOutlineIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText sx={{ fontSize: 14 }}>Add Port</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={ ()=>handleOnShowConnectedClientList(portContextMenu.seq) }>
                        <ListItemIcon>
                            <ViewListIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText sx={{ fontSize: 14 }}>Show Connected Client</ListItemText>
                    </MenuItem>
                </Menu>
            </Paper>
        )
    }

    return (
        <Box sx={{ mt: 1.5, mr: 1 }} component={ Paper }>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", m:0, p:1, pb: 0 }}>
                <Typography sx={{ ml: 1, fontSize: 14 }}>
                    { "VPLC Name : " } 
                    { 
                        <Link style={{ cursor: "pointer" }} onClick={ props.onRetrieval } underline='none'>  
                            { (props.vplcName ? props.vplcName : "No Selected") } 
                        </Link> 
                    }
                </Typography>
                <Button 
                    variant="standard" 
                    color="inherit" 
                    disabled 
                    startIcon={<AddCircleOutlineIcon color='inherit'/>} 
                    sx={{ mr: 0, pr: 0 }}
                >
                    포트추가
                </Button>
            </Box>
            <Box sx={{ mt: 1, p: 1, pt:0 }}>
                <Table size='small' sx={{ minWidth: "400px" }}>
                    <TableBody>
                        <TableRow sx={{ border: "1px solid",  }}>
                            <TableCell sx={{ width: "120px", border: "1px solid", bgcolor: "info.dark", color: "info.contrastText" }} align='center'>
                                <Typography sx={{ fontSize: 14 }} noWrap>Port Number</Typography>
                                <Typography sx={{ fontSize: 14 }}>{ "( " + totalInfo.portCount + " ) EA"}</Typography>
                            </TableCell>
                            { portList&&portList.map((portInfo, index)=>{
                                return (
                                    <TableCell
                                        key={ index }
                                        sx={{
                                            width: "100px",
                                            border: "1px solid",
                                            backgroundColor: portInfo.port > 0 ? "info.light" : "",
                                            color: portInfo.port > 0 ? "info.contrastText" : ""
                                        }}
                                        align='right'
                                        onContextMenu={ (e)=>handleOnContextMenu(e, index) }
                                    >
                                        <Typography fontSize={ 14 }>{ portInfo.port }</Typography>
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                        <TableRow sx={{ border: "1px solid",  }}>
                            <TableCell sx={{ width: "120px", border: "1px solid", bgcolor: "info.dark", color: "info.contrastText" }} align='center' >
                                <Typography sx={{ fontSize: 14 }} noWrap>Connection Count</Typography>
                                <Typography sx={{ fontSize: 14 }}>{ "( " + totalInfo.connectedCount + " ) EA"}</Typography>
                            </TableCell>
                            { portList&&portList.map((portInfo, index)=>{
                                return (
                                    <TableCell
                                        key={ index }
                                        sx={{
                                            width: "100px",
                                            border: "1px solid",
                                            backgroundColor: portInfo.connectedCount > 0 ? "warning.light" : "",
                                            color: portInfo.connectedCount > 0 ? "warning.contrastText" : ""
                                        }}
                                        align='right'
                                        onContextMenu={ (e)=>handleOnContextMenu(e, index) }
                                    >
                                        <Tooltip title={ filterByIpAddress(portInfo.connectedClientList) }>
                                            <Typography fontSize={ 14 }>{ portInfo.connectedCount }</Typography>
                                        </Tooltip>
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
            <PortContextMenu 
            />
            <ConnectedClientListView 
                open={ clientListOpen }
                onClose={ ()=>setClientListOpen(false) }
                onCancel={ ()=>setClientListOpen(false) }
                vplcId={ props.vplcId }
                vplcName={ props.vplcName }
                portNum={ portContextMenu&&portContextMenu.selectedPortNum }
                connectedClientList={ portList&&portList[selectedPortSeq]&&portList[selectedPortSeq].connectedClientList }  
            />
        </Box>
    )
}

export default VplcPortListMonitoringPanel;