import React from 'react';

import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearAllIcon from '@mui/icons-material/ClearAll';

import { AlertContext } from '../../widgets/dialogs/AlertContext';

import ScheduleJobAddDialog from './ScheduleJobAddDialog';
import ScheduleJobListTableView from './ScheduleJobListTableView';
import ScheduleJobSearchView from './ScheduleJobSearchView';
import ScheduleJobRetrievalDialog from './ScheduleJobRetrievalDialog';

import GeneralContainerTemplate from '../GeneralContainerTemplate';

import {
    deleteScheduleJobsByBatch,
    rescheduleJobsByBatch,
    unscheduleJobsByBatch,
    pauseScheduleJobsByBatch,
    resumeScheduleJobsByBatch
} from './ScheduleApi';

const ScheduleJobContainer = (props) => {

    const { info, warn } = React.useContext(AlertContext);

    const [scheduleJobListReload, setScheduleJobListReload] = React.useState(false);
    const [selectedSeq, setSelectedSeq] = React.useState(0);
    const [scheduleJobRetrievalDialogOpen, setScheduleJobRetrievalDialogOpen] = React.useState(false);
    const [scheduleJobAddDialogOpen, setScheduleJobAddDialogOpen] = React.useState(false);
    const [scheduleJobList, setScheduleJobList] = React.useState([]);

    React.useEffect(()=>{
        setScheduleJobListReload(true);
    }, []);

    const handleOnBatchDeletion = () => {
        const jobList = _extractJobList();
        deleteScheduleJobsByBatch(jobList, (resp, error)=>{
            if(error===undefined) {
                info({ 
                    title: "Success to delete schedule jobs", 
                    message: "Successfully deleted schedule jobs [" + jobList + "]", 
                    modal: false 
                });
                handleOnSearchcheduleJob();
            } else {
                warn({ 
                    title: "Fail to delete schedule jobs", 
                    message: "Fail deleting schedule jobs [" + jobList + "]", 
                    modal: true 
                });
            }
        });
    }

    const _extractJobList = () => {
        const jobList = [];
        scheduleJobList.forEach((job, index)=>{
            if(job.selected===true) {
                jobList.push(job.id);
            }
        });
        return jobList;
    }

    const handleOnBatchApplyPause = () => {
        const jobList = _extractJobList();
        pauseScheduleJobsByBatch(jobList, (resp, error)=>{
            if(error===undefined) {
                info({ 
                    title: "Success to pause schedule jobs", 
                    message: "Successfully paused schedule jobs [" + jobList + "]", 
                    modal: false 
                });
                handleOnSearchcheduleJob();
            } else {
                warn({ 
                    title: "Fail to pause schedule jobs", 
                    message: "Fail pausing schedule jobs [" + jobList + "]", 
                    modal: true 
                });
            }
        })
    }

    const handleOnSearchcheduleJob = () => {
        setScheduleJobListReload(true);
    }

    const handleOnScheduleJobRetrieval = (seq) => {
        setScheduleJobRetrievalDialogOpen(true);
        setSelectedSeq(seq);
    }

    const handleOnScheduleJobListChange = (scheduleJobs) => {
        setScheduleJobListReload(false);
        setScheduleJobList(scheduleJobs);
    }

    const handleOnBatchApplySchedule = () => {
        const jobList = _extractJobList();
        rescheduleJobsByBatch(jobList, (resp, error)=>{
            if(error===undefined) {
                info({ 
                    title: "Success schedule jobs", 
                    message: "Successfully scheduled jobs [" + jobList + "]", 
                    modal: false 
                });
                handleOnSearchcheduleJob();
            } else {
                warn({ 
                    title: "Fail to schedule jobs", 
                    message: "Fail scheduling jobs [" + jobList + "]", 
                    modal: true 
                });
            }
        })
    }

    const handleOnBatchApplyUnschedule = () => {
        const jobList = _extractJobList();
        unscheduleJobsByBatch(jobList, (resp, error)=>{
            if(error===undefined) {
                info({ 
                    title: "Success unschedule jobs", 
                    message: "Successfully unscheduled jobs [" + jobList + "]", 
                    modal: false 
                });
                handleOnSearchcheduleJob();
            } else {
                warn({ 
                    title: "Fail to unschedule jobs", 
                    message: "Fail unscheduling jobs [" + jobList + "]", 
                    modal: true 
                });
            }
        })
    }

    const handleOnBatchApplyResume = () => {
        const jobList = _extractJobList();
        resumeScheduleJobsByBatch(jobList, (resp, error)=>{
            if(error===undefined) {
                info({ 
                    title: "Success resume schedule jobs", 
                    message: "Successfully resumed schedule jobs [" + jobList + "]", 
                    modal: false 
                });
                handleOnSearchcheduleJob();
            } else {
                warn({ 
                    title: "Fail to resume schedule jobs", 
                    message: "Fail resuming schedule jobs [" + jobList + "]", 
                    modal: true 
                });
            }
        })
    }

    return (
        <>
        <GeneralContainerTemplate 
            // title="Schedule Job 목록"
            searchView={ 
                <ScheduleJobSearchView
                    hideSearchBy={ false }
                    onScheduleJobListChange={ handleOnScheduleJobListChange }
                    reloadScheduleJobList={ scheduleJobListReload }
                /> 
            }
            listTableView={
                <ScheduleJobListTableView 
                    title="Schedule Job 목록"
                    count={ scheduleJobList.length }
                    style={{ marginTop: 15 }}
                    scheduleJobList={ scheduleJobList }
                    onScheduleJobRetrieval={ handleOnScheduleJobRetrieval }
                    onDeleted={ handleOnSearchcheduleJob }
                    onUpdated={ handleOnSearchcheduleJob }
                    operButtons={[
                        <Button 
                            size="small" 
                            color="inherit" 
                            startIcon={<ClearAllIcon color='inherit'/>} 
                            variant='contained' 
                            sx={{ mr: 1 }}
                            onClick={ handleOnBatchApplySchedule }
                        >
                            {/* 일괄예약 { authInfo&&authInfo.loginInfo.data.user.id } */}
                            일괄예약
                        </Button>,
                        <Button 
                            size="small" 
                            color="inherit" 
                            startIcon={<ClearAllIcon color='inherit'/>} 
                            variant='contained' 
                            sx={{ mr: 1 }}
                            onClick={ handleOnBatchApplyUnschedule }
                        >
                            일괄취소
                        </Button>,
                        <Button 
                            size="small" 
                            color="inherit" 
                            startIcon={<ClearAllIcon color='inherit'/>} 
                            variant='contained' 
                            sx={{ mr: 1 }}
                            onClick={ handleOnBatchApplyResume }
                        >
                            일괄시작
                        </Button>,
                        <Button 
                            size="small" 
                            color="inherit" 
                            startIcon={<ClearAllIcon color='inherit'/>} 
                            variant='contained' 
                            sx={{ mr: 1 }}
                            onClick={ handleOnBatchApplyPause }
                        >
                            일괄멈춤
                        </Button>,
                        <Button 
                            size="small" 
                            color="inherit" 
                            startIcon={<ClearAllIcon color='inherit'/>} 
                            variant='contained' 
                            sx={{ mr: 1 }}
                            onClick={ handleOnBatchDeletion }
                        >
                            일괄삭제
                        </Button>,
                        <Button 
                            size="small" 
                            color="inherit" 
                            startIcon={<AddCircleIcon color='inherit'/>} 
                            variant='contained' 
                            sx={{ mr: 0 }}
                            onClick={ ()=>setScheduleJobAddDialogOpen(true) }
                        >
                            추가
                        </Button>
                    ]}
               />
            }
            addDialog={
                <ScheduleJobAddDialog 
                    open={ scheduleJobAddDialogOpen }
                    onClose={ ()=>setScheduleJobAddDialogOpen(false) }
                    onAdditionCompleted={ handleOnSearchcheduleJob }
                />
            }
        />
        {
            scheduleJobList.length>0 && 
            <ScheduleJobRetrievalDialog 
                open={ scheduleJobRetrievalDialogOpen }
                onClose={ ()=>setScheduleJobRetrievalDialogOpen(false) }
                onCancel={ ()=>setScheduleJobRetrievalDialogOpen(false) }
                onConfirm={ ()=>setScheduleJobRetrievalDialogOpen(false) }
                scheduleJob={ scheduleJobList[selectedSeq] }
                confirmation
                seq={ selectedSeq }
                onUpdateCompleted={ handleOnSearchcheduleJob }
            />
        }
        </>
    )
}

export default ScheduleJobContainer;