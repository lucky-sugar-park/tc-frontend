import React from 'react';

import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';

import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';

const ConnectedClientListView = (props) => {

    const [connClientList, setConnClientList] = React.useState([]);

    React.useEffect(()=>{
        if(props.connectedClientList===undefined) return;
        setConnClientList(props.connectedClientList);
    }, [props.connectedClientList]);

    React.useEffect(()=>{
        if(props.vplcId===undefined || props.vplcName===undefined || props.portNum===undefined) return;
        console.log("PORT CLIENT: "+props.vplcId+","+props.vplcName+","+props.portNum);
    }, [props.vplcId, props.vplcName, props.portNum]);

    return (
        <>
        <ConfirmationModalDialog
            open={ props.open }
            onClose={ props.onClose }
            onCancel={ props.onCancel }
            title= { "Connected Client List ( " + connClientList.length + " )"}
            setOpen={ props.onClose }
            titleDivider
            actionDivider
        >
            <Box>
                <Table>
                    {/* <caption style={{ captionSide: "top" }}>
                        <Typography fontSize={ 14 }>Connected Client List</Typography>
                    </caption> */}
                    <TableHead>
                        <TableRow>
                            <TableCell size='small'><Typography fontSize={ 14 }>Seq</Typography></TableCell>
                            <TableCell size='small'><Typography fontSize={ 14 }>VPLC ID</Typography></TableCell>
                            <TableCell size='small'><Typography fontSize={ 14 }>Port</Typography></TableCell>
                            <TableCell size='small'><Typography fontSize={ 14 }>Client IP</Typography></TableCell>
                            <TableCell size='small'><Typography fontSize={ 14 }>Channel ID</Typography></TableCell>
                            <TableCell size='small'><Typography fontSize={ 14 }>Timestamp</Typography></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {connClientList&&connClientList.map((conn,index)=>{
                        return (
                        <TableRow>
                            <TableCell><Typography fontSize={ 14 }>{ (index+1) }</Typography></TableCell>
                            <TableCell><Typography fontSize={ 14 }>{ conn.vplcId }</Typography></TableCell>
                            <TableCell><Typography fontSize={ 14 }>{ conn.port }</Typography></TableCell>
                            <TableCell><Typography fontSize={ 14 }>{ conn.clientIp }</Typography></TableCell>
                            <TableCell><Typography fontSize={ 14 }>{ conn.clientChannelId }</Typography></TableCell>
                            <TableCell><Typography fontSize={ 14 }>{ new Date(conn.connTimestamp).toLocaleString() }</Typography></TableCell>
                        </TableRow>    
                        )
                    })}
                    </TableBody>
                </Table>
            </Box>
        </ConfirmationModalDialog>
        </>
    )
}

export default ConnectedClientListView;