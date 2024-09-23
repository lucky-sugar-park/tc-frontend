import React from 'react';
import {
    Box,
    Divider,
    Typography
} from '@mui/material';

import ScheduleJobSearchView from './ScheduleJobSearchView';
import ScheduleJobInfoView from './ScheduleJobInfoView';

const ScheduleJobRetrievalView = (props) => {

    const [scheduleJobList, setScheduleJobList] = React.useState([]);
    const [selectedJob, setSelectedJob] = React.useState(undefined);
    const [selectedIndex, setSelectionIndex] = React.useState(200);

    React.useEffect(()=>{
        setSelectedJob(scheduleJobList[0]);
        setSelectionIndex(0);
    },[scheduleJobList]);

    const handleSearchResult = (scheduleJobs) => {
        setScheduleJobList([scheduleJobs, scheduleJobs]);
    }

    const handleJobSelection = (job, index) => {
        setSelectionIndex(index);
        setSelectedJob(job);
    }

    return (
        <Box sx={{ alignContents: "center" }}>
            <Box sx={{ width: "660px" }}>
                <ScheduleJobSearchView
                    hideSearchBy={ false }
                    onSearchResult={ handleSearchResult }
                />
            </Box>
            <Divider sx={{ mt: 2 }} />
            <Box>
                <Typography sx={{ mt: 1, mb: 3 }}>검색결과</Typography>
            {
                scheduleJobList && scheduleJobList.map((job, index)=>{
                    return (
                        <Typography
                            sx={{ 
                                mt: 1, 
                                cursor: "pointer", 
                            }}
                            onClick={ e=>handleJobSelection(job, index) }
                            color={ index===selectedIndex ? 'primary' : '' }
                        >
                            { index + ": " + job.id + " (" + job.name + ", " + job.triggerType + ", " + job.triggerState + ", " + job.stateChangedTime + ")" }
                        </Typography>
                    )
                })
            }
            </Box>
            <Divider sx={{ mt: 2 }} />
            <Box sx={{ mt: 3, display: selectedJob ? "block" : "block", maxWidth: "md", width: "660px" }}>
                <Typography>Schedule Job ID : { selectedJob ? selectedJob.id: "" }</Typography>
                <ScheduleJobInfoView 
                    detailsShow={ true }
                    scheduleJob={ selectedJob }
                />
            </Box>
            
        </Box>
    )
}

export default ScheduleJobRetrievalView;