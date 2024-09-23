import React from 'react';
import {
    Box,
    Button
} from '@mui/material';
import DetailsIcon from '@mui/icons-material/Details';

import { AlertContext } from '../../widgets/dialogs/AlertContext';

import ConfirmationModalDialog from '../../widgets/dialogs/ConfirmationModalDialog';
import ScheduleJobInfoView from './ScheduleJobInfoView';
import ScheduleJobDetailListTable from './ScheduleJobDetailListTableView';

import { updateScheduldJob } from './ScheduleApi';

const ScheduleJobRetrievalDialog = (props) => {

    const { info, warn } = React.useContext(AlertContext);

    const [open, setOpen] = React.useState(props.open);
    const [detailsOpen, setDetailsOpen] = React.useState(false);

    const [scheduleJob, setScheduleJob] = React.useState(props.scheduleJob);
    const [originalScheduleJob, setOriginalScheduleJob] = React.useState(props.scheduleJob);

    React.useEffect(()=>{
        setScheduleJob(props.scheduleJob);
        setOriginalScheduleJob(props.scheduleJob);
    }, [props.scheduleJob]);

    React.useEffect(()=>{
        setOpen(props.open); 
    }, [props.open])

    const handleClose = () => {
        setOpen(false);
        props.onClose();
    }

    const handleOnSubmit = () => {
        setOpen(false);
        props.onClose();
        updateScheduldJob(scheduleJob, (resp, error)=>{
            if(error!==undefined) {
                warn({ 
                    title: "Fail to update schedule job", 
                    message: "Fail updating schedule job named " + scheduleJob.name, 
                    modal: true 
                });            
            } else {
                info({ 
                    title: "Success to update schedule job", 
                    message: "Successfully updating schedule job named " + scheduleJob.name, 
                    modal: false 
                });
                props.onUpdateCompleted();
            } 
        });
    }

    const handleOnDetailsClose = () => {
        setDetailsOpen(false);
    }

    const handleOnDetailsUpdate = (jobDetails) => {
        setScheduleJob({
            ...scheduleJob,
            jobDetails: jobDetails
        });
    }

    const handleOnDetailsReset = () => {
        setScheduleJob({ ...scheduleJob, jobDetails: originalScheduleJob.jobDetails })
    }

    const handleOnDetailsServerApply = () => {
        // to do
    }

    const handleOnInfoReset = () => {
        setScheduleJob(originalScheduleJob);
    }

    const handleOnInfoUpdateApply = (value) => {
        setScheduleJob({
            ...scheduleJob,
            id: value.id,
            name: value.name,
            schedulerName: value.schedulerName,
            use: value.use,
            jobClassName: value.jobClassName,
            groupName: value.groupName,
            triggerType: value.triggerType,
            startDelay: value.startDelay,
            repeatInterval: value.repeatInterval,
            cronExpression: value.cronExpression,
            description: value.description,
        });
    }

    return (
        <>
        <ConfirmationModalDialog
            open={ open }
            onClose={ handleClose }
            onCancel={ handleClose }
            onConfirm={ handleOnSubmit }
            title="Schedule Job Information"
            confirmation={ props.confirmation }
            setOpen={ props.onClose }
            titleDivider
            actionDivider
        >
            <ScheduleJobInfoView 
                { ...props } 
                onReset={ handleOnInfoReset }
                onUpdateApply={ handleOnInfoUpdateApply }
                scheduleJob={ scheduleJob }
                editMode={ false }
                updatable={ true }
            />
            <Box sx={{ display: "flex", mt: 4 }}>
                <Button 
                    startIcon={<DetailsIcon/>}
                    onClick={ e=>setDetailsOpen(true) }
                >
                    Job Details
                </Button>
            </Box>
        </ConfirmationModalDialog>
        <ConfirmationModalDialog
            open={ detailsOpen }
            onClose={ handleOnDetailsClose }
            onCancel={ handleOnDetailsClose }
            title="Schedule Job Details Dialog"
            setOpen={ handleOnDetailsClose }
            titleDivider
            actionDivider
        >
            <ScheduleJobDetailListTable 
                jobDetails={ scheduleJob ? scheduleJob.jobDetails : [] }
                editMode={ false }
                updatable={ true }
                title="Job Details"
                onUpdate={ handleOnDetailsUpdate }
                onReset={ handleOnDetailsReset }
                onServerApply={ handleOnDetailsServerApply }
            />
        </ConfirmationModalDialog>
        </>
    )
}

export default ScheduleJobRetrievalDialog;