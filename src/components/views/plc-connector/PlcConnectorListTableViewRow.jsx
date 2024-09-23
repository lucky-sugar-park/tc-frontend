import React from 'react';

import { Checkbox, IconButton, TableCell, TableRow, Tooltip, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import HistoryIcon from '@mui/icons-material/History';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import { useConfirm } from '../../widgets/dialogs/useConfirm';
import { deletePlcConnector, publishPlcConnector, releasePlcConnector, testPlcConnection } from './PlcConnectorApi';

const PlcConnectorListTableViewRow = (props) => {

    const { Notifier } = React.useContext(AlertContext);
    const { confirm } = useConfirm();

    const [values, setValues] = React.useState(props.plcConInfo);
    const [checked, setChecked] = React.useState(false);

    React.useEffect(()=>{
        setValues(props.plcConInfo);
    }, [props.plcConInfo]);

    React.useEffect(()=>{
        setChecked(props.checked);
        setValues({
            ...values,
            checked: props.checked
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.checked]);

    React.useEffect(()=>{
        props.onChecked(props.seq, checked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checked]);

    const handleCheckboxClicked = (e) => {
        setValues({
            ...values,
            checked:!checked
        })
        setChecked(!checked);
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

    const handleOnDeletePlcConnector = async () => {
        const res=await checkConfirm("PLC Connector deletion");
        if(!res) return;

        deletePlcConnector(values.id, (resp, error)=> {
            if(error===undefined) {
                Notifier.info({ 
                    title: "Success to delete PLC Connector", 
                    message: "Success to delete PLC Connector [" + values.name + "]", 
                    modal: false 
                })
                props.onDeleted();
            } else {
                Notifier.warn({ 
                    title: "Fail to delete PLC Connector", 
                    message: "name [ "+values.name + " ], Cause:" + error, 
                    modal: true 
                })
            }
        });
    }

    const handleOnPublishPlcConnector = async () => {
        const res=await checkConfirm("PLC Connector publish");
        if(!res) return;

        publishPlcConnector(values.id, (resp, error)=>{
            if(error===undefined) {
                Notifier.info({ 
                    title: "Success to publish PLC Connector", 
                    message: "Success to publish PLC Connector [" + values.name + "]", 
                    modal: false 
                })
                props.onUpdated();
            } else {
                Notifier.warn({ 
                    title: "Fail to publish PLC Connector", 
                    message: "name [ "+values.name + " ], Cause:" + error, 
                    modal: true 
                })
            }
        });
    }

    const handleOnReleasePlcConnector = async () => {
        const res=await checkConfirm("PLC Connector release");
        if(!res) return;

        releasePlcConnector(values.id, (resp, error)=>{
            if(error===undefined) {
                Notifier.info({ 
                    title: "Success to release PLC Connector", 
                    message: "Success to release PLC Connector [" + values.name + "]", 
                    modal: false 
                })
                props.onUpdated();
            } else {
                Notifier.warn({ 
                    title: "Fail to release PLC Connector", 
                    message: "name [ "+values.name + " ], Cause:" + error, 
                    modal: true 
                })
            }
        });
    }

    const handleOnTestPlcConnection = async() => {
        const res=await checkConfirm("PLC connection test");
        if(!res) return;

        testPlcConnection(values.id, (reply, error) => {
            if(error===undefined) {
                setValues({ ...values, status2: reply.result })
                Notifier.info({ 
                    title: " PLC connection test result", 
                    message: "result: [" + reply.result + "], cause: [" + reply.cause + "], details: [" + reply.description + "]", 
                    modal: false 
                });
            } else {
                Notifier.warn({ 
                    title: "Fail to do PLC's connection test", 
                    message: "name [ "+values.name + " ], Cause:" + error, 
                    modal: true 
                });
            }
        });
    }

    const handleOnShowPlcConnectionHistory = () => {
        props.onShowPlcConHistory(values.id);
    }

    return (
        <TableRow sx={{ }} hover role="checkbox" >
            <TableCell size="small" padding='checkbox'>
                <Checkbox 
                    checked={ checked }
                    onClick={ handleCheckboxClicked }
                    size='small'
                />
            </TableCell>
            <TableCell  size="small">
                <Typography sx={{ fontSize: 14, cursor: "pointer" }} onClick={ ()=>props.onRetrieval(props.seq) }>{ values.name }</Typography>
            </TableCell>
            <TableCell size="small">
                <Typography sx={{ fontSize: 14, cursor: "pointer" }} onClick={ ()=>props.onRetrieval(props.seq) }>{ values.hostIp }</Typography>
            </TableCell>
            <TableCell size="small" align="center">
                <Typography sx={{ fontSize: 14 }}>{ values.ports[0] }</Typography>
            </TableCell>
            <TableCell size="small">
                <Typography sx={{ fontSize: 14 }}>{ values.ports.length }</Typography>
            </TableCell>
            <TableCell size="small">
                <Typography sx={{ fontSize: 14 }}>{ values.manufacturer }</Typography>
            </TableCell>
            <TableCell size="small" align="center">
                <Typography sx={{ fontSize: 14 }}>{ values.status1 }</Typography>
            </TableCell>
            <TableCell size="small" align="center">
                <Tooltip title={ values.status2 } sx={{ m: 0, p: 0 }}>
                    {
                        ("CONNECTION_TEST_OK"=== values.status2 || "RUNNING"===values.status2) ?
                    <IconButton>
                        <SentimentSatisfiedAltIcon color="success" fontSize='small'/>
                    </IconButton>
                        : ("CONNECTION_TEST_ERROR"===values.status2 || "ERROR"===values.status2) ?
                    <IconButton>
                        <SentimentVeryDissatisfiedIcon color="error" fontSize='small'/>
                    </IconButton>
                        :
                    <IconButton>
                        <SentimentNeutralIcon color="action" fontSize='small'/>
                    </IconButton>
                    }
                </Tooltip>
            </TableCell>
            <TableCell size="small" align="center">{ values.messageFrameFormat }</TableCell>
            <TableCell size="small" align="center">
                <Tooltip title={ values.published===true ? "Release" : "Publish" } sx={{ m: 0, p: 0 }}>
                    {values.published===true?
                    <IconButton onClick={ handleOnReleasePlcConnector }>
                        <UnpublishedIcon color='inherit' fontSize='small'/>
                    </IconButton>
                    :
                    <IconButton onClick={ handleOnPublishPlcConnector }>
                        <PublishedWithChangesIcon color='inherit' fontSize='small'/>
                    </IconButton>
                    }
                </Tooltip>
            </TableCell>
            <TableCell size="small" align="center">
                <Tooltip title="Connection Test" sx={{ m: 0, p: 0 }}>
                    <IconButton onClick={ handleOnTestPlcConnection }>
                        <CloudSyncIcon color='inherit' fontSize='small'/>
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell size="small" align="center">
                <IconButton onClick={ handleOnShowPlcConnectionHistory }>
                    <HistoryIcon color='inherit' fontSize='small'/>
                </IconButton>
            </TableCell>
            <TableCell size="small" align="center">
                <IconButton onClick={ handleOnDeletePlcConnector }>
                    <DeleteIcon color='inherit' fontSize='small'/>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default PlcConnectorListTableViewRow;