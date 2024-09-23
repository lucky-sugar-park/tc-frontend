import React from 'react';

import { 
    Box,
    Checkbox,
    Divider,
    Table, 
    TableCell, 
    TableHead, 
    TableContainer, 
    TableBody,
    TablePagination,
    TableRow,
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { AlertContext } from '../../widgets/dialogs/AlertContext';
import { deleteScheduleJob } from './ScheduleApi';
import ScheduleJobListTableRow from './ScheduleJobListTableRow';

const ScheduleJobListTableView = (props) => {

    const theme = useTheme();

    const { Notifier } = React.useContext(AlertContext);

    const [scheduleJobList, setScheduleJobList] = React.useState(props.scheduleJobList);
    const [selectedAll, setSelectedAll] = React.useState(false);

    React.useEffect(()=>{
        setScheduleJobList(props.scheduleJobList);
        setSelectedAll(false);
    },[props.scheduleJobList]);

    const handleOnAllCheckboxClicked = () => {
        for(var i=0;i<scheduleJobList.length;i++) scheduleJobList[i].selected=!selectedAll;
        setSelectedAll(!selectedAll);
    }

    const handleOnSelectedScheduleJob = (seq, selected) => {
        scheduleJobList[seq].selected=selected;
        var found=false;
        scheduleJobList.forEach((v,i)=>{
            if(!v.selected) {
                found=true;
                return;
            }
        });
        if(!found) setSelectedAll(true);
        else setSelectedAll(false);
    }

    const handleOnJobUpdated = (job, idx) => {
        scheduleJobList[idx]=job;
        setScheduleJobList([ ...scheduleJobList ]);
    }

    const handleOnDelete = (id, name) => {
        deleteScheduleJob(id, (resp, error)=>{
            if(error===undefined) {
                Notifier.info({ title: "Success schedule job Deletion", message: "Deleted schedule job successfully["+name+"]", modal: true });
                props.onDeleted();
            } else {
                Notifier.warn({ title: "Fail schedule job Deletion", message: "No deleted schedule job["+name+"]", modal: true });
            }
        });
    }

    return (
        // <TableContainer component={ Paper }>
        <TableContainer component={ Box }>
            <Box sx={{ m:0, p:0, mt: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Box>
                        <Typography variant='h7'>{ props.title } ( { props.count } )</Typography>
                    </Box>
                    <Box sx={{ m: 0, mt: 0, pr: 0 }}>
                    { props.operButtons }
                    </Box>
                </Box>
            </Box>
            <Divider sx={{ mt: 1}} />
            <Table sickyHeader>
                <TableHead>
                    <TableRow sx={{ height: "45px", backgroundColor: theme.palette.background.tableHead }}>
                        <TableCell align="center" size="small"></TableCell>
                        <TableCell type="small" padding='checkbox'>
                            <Checkbox 
                                checked={ selectedAll }
                                onClick={ handleOnAllCheckboxClicked }
                                size='small'
                            />
                        </TableCell>
                        <TableCell align="center" size="small">ID</TableCell>
                        <TableCell align="center" size="small">이름</TableCell>
                        <TableCell align="center" size="small">SCHE명</TableCell>
                        <TableCell align="center" size="small">그룹명</TableCell>
                        <TableCell align="center" size="small">타입</TableCell>
                        <TableCell align="center" size="small">시작시간</TableCell>
                        <TableCell align="center" size="small">상태</TableCell>
                        <TableCell align="center" size="small">삭제</TableCell>
                        <TableCell align="center" size="small">제어</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    scheduleJobList.map((job, index)=>{
                        return (
                            <ScheduleJobListTableRow 
                                key= { "scheduleJob-" + index }
                                seq={ index }
                                scheduleJob={ job }
                                selected={ job.selected===undefined ? false : job.selected }
                                onSelected={ handleOnSelectedScheduleJob }
                                onRowUpdated={ handleOnJobUpdated }
                                onDelete={ handleOnDelete }
                                { ...props }
                            />        
                        )
                    })
                }
                </TableBody>
                <TablePagination
                    onPageChange={()=>console.log("") }
                    page={ 1 }
                    rowsPerPage={ 10 }
                    count={ 100 }
                    onRowsPerPageChange={()=>console.log("")}
                    showFirstButton
                    showLastButton
                />
            </Table>
        </TableContainer>
    )
}

export default ScheduleJobListTableView;