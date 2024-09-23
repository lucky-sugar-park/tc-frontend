import React from 'react';

import { 
    Box,
    Table,
    TableBody,
    TableCell, 
    TableHead,
    TablePagination,
    TableRow, 
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ScheduleJobExecHistoryTableRow from './ScheduleJobExecHistoryTableRow';

import { searchScheduleJobExecHistories } from './ScheduleApi';

const ScheduleJobExecHistoryList = (props) => {

    const theme = useTheme();

    const [pageInfo, setPageInfo] = React.useState({
        page: 0,
        size: 5,
        sortDirection: "DESCENDING",
        sortBy: ["executionTime"]        
    });

    const [conditions, setConditions] = React.useState([{
        "name": "jobName",
        "condType": "EQUALS",
        "value": props.jobName,
    }]);
    
    const [scheduleJobExecHistoryList, setScheduleJobExecHistoryList] = React.useState([]);

    React.useEffect(()=>{
        fetchScheduleJobExecHistories({
            conditions : conditions,
            pageInfo: pageInfo
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(()=>{
        console.log("COND=>" + JSON.stringify(pageInfo));
        fetchScheduleJobExecHistories({
            conditions : conditions,
            pageInfo: pageInfo
        });
    }, [pageInfo, conditions]);

    const fetchScheduleJobExecHistories = (searchCondition) => {
        searchScheduleJobExecHistories(searchCondition, (histories, error)=>{
            if(error===undefined) {
                setScheduleJobExecHistoryList(histories);
            } else {
                setScheduleJobExecHistoryList([]);
            }
        });
    }

    const handlePageChange = (e, newPage) => {
        setPageInfo({
            ...pageInfo,
            page: newPage
        })
    }

    return (
        <Box>
            <Typography variant='h7' guttorBottom component='div'>Job 실행이력</Typography>
            <Table size="small" aria-label='scheduleHistories'>
                <TableHead>
                    <TableRow sx={{backgroundColor: theme.palette.background.tableHead }}>
                        <TableCell>Job이름</TableCell>
                        <TableCell>실행시간</TableCell>
                        <TableCell>실행결과</TableCell>
                        <TableCell>다음실행시간</TableCell>
                        <TableCell>비고</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {
                    scheduleJobExecHistoryList && scheduleJobExecHistoryList.map((hist, index)=>{
                        return (
                            <ScheduleJobExecHistoryTableRow 
                                execHistory={ hist }
                            />
                        )
                    })
                }
                </TableBody>
                <TablePagination
                    rowsPerPageOptions={[ 5, 10, 20, 25, -1 ]}
                    onPageChange={ (e, newPage)=>setPageInfo({ ...pageInfo, page: newPage })}
                    page={ pageInfo.page }
                    rowsPerPage={ pageInfo.size }
                    count={ 100 }
                    onRowsPerPageChange={ e=>setPageInfo({ ...pageInfo, size: e.target.value })}
                    showFirstButton
                    showLastButton
                />
            </Table>
        </Box>
    )
}

export default ScheduleJobExecHistoryList;