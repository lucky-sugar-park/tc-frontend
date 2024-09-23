import React from 'react';

import { 
    Checkbox, 
    Collapse,
    IconButton, 
    TableCell, 
    TableRow, 
    Tooltip
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PauseIcon from '@mui/icons-material/Pause';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import StartIcon from '@mui/icons-material/Start';
import HistoryToggleOffIcon from '@mui/icons-material/HistoryToggleOff';

import ScheduleJobDetailsList from './ScheduleJobDetailListTableView';
import SimpleTab from '../../widgets/tabs/SimpleTab';
import ScheduleJobExecHistoryList from './ScheduleJobExecHistoryList';

import {
    pauseScheduleJob,
    rescheduleJob,
    resumeScheduleJob,
    unscheduleJob
} from './ScheduleApi';

const ScheduleJobListTableRow = (props) => {

    const [selected, setSelected] = React.useState(false);
    const [detailsOpen, setDetailsOpen] = React.useState(false);
    const [scheduleJob, setScheduleJob] = React.useState(props.scheduleJob);

    React.useEffect(()=>{
        setScheduleJob(props.scheduleJob);
    }, [props.scheduleJob]);

    React.useEffect(()=>{
    }, [scheduleJob]);

    React.useEffect(()=>{
        setSelected(props.selected);
        setScheduleJob({
            ...scheduleJob,
            selected: props.selected
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.selected]);

    React.useEffect(()=>{
        props.onSelected(props.seq, selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selected]);

    const handleOnCheckboxClicked = (e) => {
        setScheduleJob({
            ...scheduleJob,
            selected:!selected
        })
        setSelected(!selected);
    }

    const handleOnJobRescheduling = (jobName) => {
        rescheduleJob(jobName, (reply)=>{
            setScheduleJob(reply);
            props.onRowUpdated(reply, props.seq);
        });
    }

    const handleOnJobUnscheduling = (jobName) => {
        unscheduleJob(jobName, (reply)=>{
            setScheduleJob(reply);
            props.onRowUpdated(reply, props.seq);
        });
    }

    const handleOnJobPause = (jobName) => {
        pauseScheduleJob(jobName, (reply)=>{
            setScheduleJob(reply);
            props.onRowUpdated(reply, props.seq);
        });
    }

    const HandleOnJobResume = (jobName) => {
        resumeScheduleJob(jobName, (reply)=>{
            setScheduleJob(reply);
            props.onRowUpdated(reply, props.seq);
        });
    }

    const handleScheduleJobRetrieval = () => {
        props.onScheduleJobRetrieval(props.seq);
    }

    return (
        <React.Fragment>
        <TableRow 
            sx={{ '& > *': { borderBottom: 'unset' } }}
        >
            <TableCell>
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setDetailsOpen(!detailsOpen) }
                >
                    { detailsOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
            </TableCell>
            <TableCell type="small" padding='checkbox' >
                <Checkbox 
                    checked={ selected }
                    onClick={ handleOnCheckboxClicked }
                    size='small'
                />
            </TableCell>
            <TableCell onClick={ handleScheduleJobRetrieval } sx={{ cursor: "pointer" }}>{ scheduleJob && scheduleJob.id }</TableCell>
            <TableCell onClick={ handleScheduleJobRetrieval } sx={{ cursor: "pointer" }}>{ scheduleJob && scheduleJob.name }</TableCell>
            <TableCell>{ scheduleJob && scheduleJob.schedulerName }</TableCell>
            <TableCell>{ scheduleJob && scheduleJob.groupName }</TableCell>
            <TableCell>{ scheduleJob && scheduleJob.triggerType }</TableCell>
            <TableCell>{ scheduleJob && scheduleJob.startedTime }</TableCell>
            <TableCell>{ scheduleJob && scheduleJob.triggerState }</TableCell>
            <TableCell align="center">
                <Tooltip title="삭제">
                    <IconButton onClick={ e=>props.onDelete(scheduleJob.id, scheduleJob.name)}>
                        <RemoveCircleIcon/>
                    </IconButton>
                </Tooltip>
            </TableCell>
            <TableCell align="center">
                {
                scheduleJob && scheduleJob.triggerState==="NONE" ?
                <Tooltip title="작업예약">
                    <IconButton onClick={ e=>handleOnJobRescheduling(scheduleJob.name) }>
                        <ScheduleIcon />
                    </IconButton>
                </Tooltip>
                :
                <Tooltip title="작업취소">
                    <IconButton onClick={ e=>handleOnJobUnscheduling(scheduleJob.name) }>
                        <HistoryToggleOffIcon/>
                    </IconButton>
                </Tooltip>
                }
                {
                scheduleJob && scheduleJob.triggerState!=="NONE" ? scheduleJob.triggerState==="PAUSED" ?
                <Tooltip title="작업다시시작">
                    <IconButton onClick={ e=>HandleOnJobResume(scheduleJob.name) }>
                        <StartIcon/>
                    </IconButton>
                </Tooltip>
                :
                <Tooltip title="작업일시정지">
                    <IconButton onClick={ e=>handleOnJobPause(scheduleJob.name) }>
                        <PauseIcon/>
                    </IconButton>
                </Tooltip>
                :
                ""
                }
            </TableCell>
        </TableRow>
        <TableRow>
            <TableCell sx={{ paddingBottom: 0, paddingTop: 0, paddingLeft: 2 }} colSpan={ 11 }>
                <Collapse in={ detailsOpen } timeout="auto" unmountOnExit>
                    <SimpleTab 
                        tabs={[
                            { label: "Schedule Job Details" },
                            { label: "Execution Histories" }
                        ]}
                        panels={[
                            <ScheduleJobDetailsList 
                                jobDetails={ scheduleJob && scheduleJob.jobDetails }
                                title="Job Details"
                            />,
                            <ScheduleJobExecHistoryList 
                                scheduleJobId={ scheduleJob && scheduleJob.id }
                                jobName={ scheduleJob && scheduleJob.name }
                            />
                        ]}
                    />
                </Collapse>
            </TableCell>
        </TableRow>
        </React.Fragment>
    )
}

export default ScheduleJobListTableRow;