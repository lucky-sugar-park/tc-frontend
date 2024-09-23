import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { 
    Checkbox, 
    IconButton, 
    TableCell, 
    TableRow, 
    Tooltip, 
    Typography 
} from '@mui/material';
import {
    Delete as DeleteIcon,
    PublishedWithChanges as PublishedWithChangesIcon,
    Unpublished as UnpublishedIcon,
    SentimentSatisfiedAlt as SentimentSatisfiedAltIcon,
    SentimentVeryDissatisfied as SentimentVeryDissatisfiedIcon,
    SentimentNeutral as SentimentNeutralIcon,
    VideogameAsset as VideogameAssetIcon
 } from '@mui/icons-material';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import { deleteVplc, publishVplc, releaseVplc } from './VplcApi';

const VplcListTableViewRow = (props) => {

    const { Notifier } = React.useContext(AlertContext);

    const [values, setValues] = React.useState(props.vplcInfo);
    const [checked, setChecked] = React.useState(false);

    React.useEffect(()=>{
        setValues(props.vplcInfo);
    }, [props.vplcInfo]);

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

    const handleOnDeleteVplc = () => {
        deleteVplc(values.id, (resp, error)=> {
            if(error===undefined) {
                Notifier.info({ 
                    title: "Success to delete virtual PLC", 
                    message: "Success to delete virtual PLC [" + values.name + "]", 
                    modal: false 
                })
                props.onDeleted();
            } else {
                Notifier.warn({ 
                    title: "Fail to delete virtual PLC", 
                    message: "name [ "+values.name + " ], Cause:" + error, 
                    modal: true 
                })
            }
        });
    }

    const handleOnPublishVplc = () => {
        publishVplc(values.id, (resp, error)=>{
            if(error===undefined) {
                Notifier.info({ 
                    title: "Success to publish virtual PLC", 
                    message: "Success to publish virtual PLC [" + values.name + "]", 
                    modal: false 
                })
                props.onUpdated();
            } else {
                Notifier.warn({ 
                    title: "Fail to publish virtual PLC", 
                    message: "name [ "+values.name + " ], Cause:" + error, 
                    modal: true 
                })
            }
        });
    }

    const handleOnReleaseVplc = () => {
        if(values.status==="RUNNING") {
            Notifier.warn({ 
                title: "No permitted virtual PLC's status", 
                message: "No running status virtual plc can be released [ "+values.name + " ]", 
                modal: true 
            })
            return;
        }
        releaseVplc(values.id, (resp, error)=>{
            if(error===undefined) {
                Notifier.info({ 
                    title: "Success to release virtual PLC", 
                    message: "Success to release virtual PLC [" + values.name + "]", 
                    modal: false 
                })
                props.onUpdated();
            } else {
                Notifier.warn({ 
                    title: "Fail to release virtual PLC", 
                    message: "name [ "+values.name + " ], Cause:" + error, 
                    modal: true 
                });
            }
        });
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
                <Typography sx={{ fontSize: 14, cursor: "pointer" }} onClick={ ()=>props.onRetrieval(props.seq) }>{ values.id }</Typography>
            </TableCell>
            <TableCell  size="small">
                <Typography sx={{ fontSize: 14, cursor: "pointer" }} onClick={ ()=>props.onRetrieval(props.seq) }>{ values.name }</Typography>
            </TableCell>
            <TableCell size="small">
                <Typography sx={{ fontSize: 14, cursor: "pointer" }} onClick={ ()=>props.onRetrieval(props.seq) }>{ values.ipAddress }</Typography>
            </TableCell>
            <TableCell size="small" align="center">
                <Typography sx={{ fontSize: 14 }}>{ values.startPort }</Typography>
            </TableCell>
            <TableCell size="small">
                <Typography sx={{ fontSize: 14 }}>{ values.portCount }</Typography>
            </TableCell>
            <TableCell size="small">
                <Typography sx={{ fontSize: 14 }}>{ values.manufacturer }</Typography>
            </TableCell>
            <TableCell size="small" align="center">
                <Tooltip title={ values.status } sx={{ m: 0, p: 0 }}>
                    {
                        "RUNNING"=== values.status ?
                    <IconButton>
                        <SentimentSatisfiedAltIcon color="success" fontSize='small'/>
                    </IconButton>
                        : ("STOPPED"===values.status || "PAUSED"===values.status) ?
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
            <TableCell size="small" align="center">{ values.frameFormat }</TableCell>
            <TableCell size="small" align="center">
                <Tooltip title={ values.published===true ? "Release" : "Publish" } sx={{ m: 0, p: 0 }}>
                    {values.published===true?
                    <IconButton onClick={ handleOnReleaseVplc }>
                        <UnpublishedIcon color='inherit' fontSize='small'/>
                    </IconButton>
                    :
                    <IconButton onClick={ handleOnPublishVplc }>
                        <PublishedWithChangesIcon color='inherit' fontSize='small'/>
                    </IconButton>
                    }
                </Tooltip>
            </TableCell>
            <TableCell size="small" align="center">
                <Tooltip title="See & Control" sx={{ m: 0, p: 0 }}>
                    <IconButton
                        size='small'
                        color='inherit'
                        LinkComponent={ RouterLink } 
                        to="/vplc/monitor"
                        state={{ vplcInfo: values }}
                    >
                        <VideogameAssetIcon color='inherit' fontSize='small'/>
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell size="small" align="center">
                <IconButton onClick={ handleOnDeleteVplc }>
                    <DeleteIcon color='inherit' fontSize='small'/>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default VplcListTableViewRow;