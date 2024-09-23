import React from 'react';

import {
    Box,
    Typography
} from '@mui/material';

import { AlertContext } from '../../widgets/dialogs/AlertContext';

import SimpleHorizontalStepperDialog from '../../widgets/dialogs/SimpleHorizontalStepperDialog';
import ScheduleJobDetailListTable from './ScheduleJobDetailListTableView';
import ScheduleJobInfoView from './ScheduleJobInfoView';

import { registerScheduleJob } from './ScheduleApi';

const emptyScheduleJob = {
    id: "",
    name: "",
    schedulerName: "NO_ASSIGNED",
    use: false,
    jobClassName: "com.mymes.equip.tc.schedule.jobs.PlcGeneralScheduleJob",
    groupName: "TEST",
    triggerType: "CRON",
    startDelay: -1,
    repeatInterval: -1,
    cronExpression: "",
    description: "",
    jobDetails: [],
    oper: "N"
}

const ScheduleJobAddDialog = (props) => {

    const { info, warn } = React.useContext(AlertContext);

    const [open, setOpen] = React.useState(props.open);
    const [newScheduleJob, setNewScheduleJob] = React.useState(emptyScheduleJob);
    const [originalScheduleJob, setOriginalScheduleJob] = React.useState(emptyScheduleJob);

    React.useEffect(()=>{
        setNewScheduleJob(emptyScheduleJob);
        setOriginalScheduleJob(emptyScheduleJob);
    }, []);

    React.useEffect(()=>{
        setOpen(props.open); 
    }, [props.open])

    const handleOnClose = () => {
        setOpen(false);
        props.onClose();
    }

    const handleOnSubmit = () => {
        setOpen(false);
        props.onClose();
        registerScheduleJob(newScheduleJob, (resp, error)=>{
            if(error!==undefined) {
                warn({ 
                    title: "Fail to add new schedule job", 
                    message: "Fail adding new schedule job named " + newScheduleJob.name, 
                    modal: true 
                });            
            } else {
                info({ 
                    title: "Success to add new schedule job", 
                    message: "Successfully addes new schedule job named " + newScheduleJob.name, 
                    modal: false 
                });
                props.onAdditionCompleted();
            } 
        });
    }

    const handleOnJobDetailsUpdate = (jobDetails) => {
        setNewScheduleJob({
            ...newScheduleJob,
            jobDetails: jobDetails
        });
    }

    const handleOnInfoReset = () => {
        setNewScheduleJob(originalScheduleJob);
    }

    const handleOnInfoUpdateApply = (value) => {
        setNewScheduleJob({
            ...newScheduleJob,
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

    const handleOnJobDetailsReset = () => {
        setNewScheduleJob({ ...newScheduleJob, jobDetails: originalScheduleJob.jobDetails })
    }

    const handleOnJobDetailsServerApply = () => {
        // should be implemented later
    }

    const ScheduleJobStep = () =>{
        return (
            <ScheduleJobInfoView 
                onReset={ handleOnInfoReset }
                onUpdateApply={ handleOnInfoUpdateApply }
                scheduleJob={ newScheduleJob }
                editMode={ true }
                updatable={ true }
                mode="NEW"
            />
        )
    }

    const JobDetailStep = () =>{
        return (
            <Box sx={{ width: "1000px" }}>
                <ScheduleJobDetailListTable 
                    title="Job Details"
                    onUpdate={ handleOnJobDetailsUpdate }
                    onReset={ handleOnJobDetailsReset }
                    onServerApply={ handleOnJobDetailsServerApply }
                    jobDetails={ newScheduleJob.jobDetails }
                    mode="NEW"
                    editMode={ true }
                    updatable={ true }
                />
            </Box>
        )
    }

    const DataCheckStep = () => {
        return (
            <Box>
                <Typography variant="h7">입력 데이타 (JSON 포맷)</Typography>
                <Typography variant="body1" gutterBottom noWrap={ true }>
                    <pre><code>{ JSON.stringify(newScheduleJob, null, 2) }</code></pre>
                </Typography>
            </Box>
        )
    }

    const steps = [
        { label: "Job Info", step: ScheduleJobStep() },
        { label: "Job Details Info",  step: JobDetailStep() },
        { label: "Input Check",  step: DataCheckStep() }
    ]

    return (
        <SimpleHorizontalStepperDialog
            open={ open }
            onClose={ handleOnClose }
            onCancel={ handleOnClose }
            onConfirm={ handleOnSubmit }
            title="Schedule Job Addition"
            confirmation={ true }
            setOpen={ props.onClose }
            titleDivider
            actionDivider
            steps={ steps }
            height="550px"
        />
    )
}

export default ScheduleJobAddDialog;