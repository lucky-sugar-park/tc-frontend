import React from 'react';
import { 
    Button,
    Checkbox, 
    IconButton, 
    TableCell, 
    TableRow, 
    TextField,
    Tooltip 
} from '@mui/material';

// jobName: "opcode.test.schedule.read",
//             execTime: "2024-04-17 14:22:00",
//             execResult: "SUCCESS",
//             nextFireTime: "2024-04-17 14:24:00.000000",
//             remark: "SUCCESS !!!"

const ScheduleJobExceHistoryTableRow = (props) => {
    const [execHistory, setExecHistory] = React.useState(props.execHistory);

    React.useEffect(()=>{
        setExecHistory(props.execHistory);
    }, [props.execHistory]);
    
    return (
        <TableRow  sx={{ verticalAlign: "top" }}>
            <TableCell>{ execHistory.jobName }</TableCell>
            <TableCell>{ new Date(execHistory.executionTime).toLocaleString() }</TableCell>
            <TableCell>{ execHistory.executionResult }</TableCell>
            <TableCell>{ new Date(execHistory.nextFireTime).toLocaleString() }</TableCell>
            <TableCell>{ execHistory.remark }</TableCell>
        </TableRow>
    )
}

export default ScheduleJobExceHistoryTableRow;