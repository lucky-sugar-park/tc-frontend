import React from 'react';

import { 
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Switch,
    Table,
    TableBody,
    TableCell, 
    TableHead,
    TableRow, 
    Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import SortableTableHeadCell from '../../widgets/table/SortableTableHeadCell';
import ScheduleJobDetailListTableRow from './ScheduleJobDetailListTableRow';

const ScheduleJobDetailListTable = (props) => {

    const theme = useTheme();

    const [editMode, setEditMode] = React.useState(props.editMode);
    const [sortColumnName, setSortColumnName] = React.useState("");
    const [jobDetails, setJobDetails] = React.useState([]);
    const [allChecked, setAllChecked] = React.useState(false);
    const [applied, setApplied] = React.useState(true);



    React.useEffect(()=>{
        if(props.jobDetails===undefined) return;
        // if(jobDetails.length!==props.jobDetails) {
        //     // setApplied(false);
        // }
        props.jobDetails.sort((a,b)=>{
            return a.entryKey-b.entryKey;
        });
        setSortColumnName("entrykey");
        setJobDetails(props.jobDetails);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.jobDetails])

    React.useEffect(()=>{
        if(props.onDisabled!==undefined) {
            props.onDisabled(editMode);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editMode]);

    const handleOnEmptyRowAddition = () => {
        setJobDetails([
            ...jobDetails, 
            {
                entryKey: "",
                entryValue: "",
                entryValueType: "STRING",
                description: "",
                oper: "N"
            }
        ]);
    }

    const handleOnAllCheck = () => {
        for(var i=0;i<jobDetails.length;i++) jobDetails[i].checked=!allChecked;
        setAllChecked(!allChecked);
    }

    const hancleOnRowChecked = (seq, checked) => {
        jobDetails[seq].checked=checked;
        var found=false;
        jobDetails.forEach((v,i)=>{
            if(!v.checked) {
                found=true;
                return;
            }
        });
        if(!found) setAllChecked(true);
        else setAllChecked(false);
    }

    const handleOnRowDeletion = (seq) => {
        setJobDetails(jobDetails.filter((detail, index)=>seq!==index));
    }

    const handleOnRowUpdate = (seq, propName, val) => {
        setApplied(false);
        var jobList = [];
        jobDetails.forEach((jobDetail,index)=>{
            jobList.push(jobDetail);
        });
        jobList[seq][propName]=val;
        setJobDetails(jobList);
    }

    const handleOnChangeApply = () => {
        console.log("handleOnChangeApply=>", applied, ", editMode=>", editMode)
        setApplied(true);
        props.onUpdate(jobDetails);
    }

    const handleOnChangeServerApply = () => {
        setApplied(true);
        props.onServerApply(jobDetails);
    }

    const handleOnBatchDeletion = () => {
        // to do
    }

    const handleOnReset = () => {
        props.onReset();
    }

    const handleOnSort = (columnName, direction) => {
        setSortColumnName(columnName);
        var temp=[];
        jobDetails.forEach(jobDetail=>temp.push(jobDetail));
        temp.sort((a,b)=>{
            if(a[columnName]<=b[columnName]) return "ASC"===direction? -1 : 1;
            return "ASC"===direction? 1 : -1;
        })
    }

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between"}}>
                <Typography variant='h7' guttorBottom component='div'>{ props.title } ({ jobDetails.length })</Typography>
                {
                props.updatable && props.updatable === true &&
                <Box sx={{ display:"flex", alignItems:"center" }}>
                    <FormControlLabel 
                        sx={{ m: 0, pt: 0, mr: 1.5 }} 
                        control={<Switch size="small" checked={ editMode } />} 
                        label="Edit"
                        onClick={ (e)=>setEditMode(e.target.checked) }
                    />
                    <Button 
                        size="small" 
                        color="inherit" 
                        startIcon={<ClearAllIcon color='inherit'/>} 
                        variant='contained' 
                        sx={{ mr: 1 }}
                        onClick={ handleOnBatchDeletion }
                        disabled={ !editMode }
                    >
                        일괄행제거
                    </Button>
                    <Button 
                        size="small" 
                        color="inherit" 
                        startIcon={<DoneAllIcon color='inherit'/>} 
                        variant='contained' 
                        sx={{ mr: 1 }}
                        onClick={ handleOnChangeApply }
                        disabled={ !editMode || applied }
                    >
                        임시저장
                    </Button>                
                    {
                    props.mode!=="NEW"&&
                    <Button
                        size='small'
                        color='inherit'
                        startIcon={ <CloudDoneIcon color='inherit'/> }
                        variant='contained' 
                        sx={{ mr: 1 }}
                        onClick={ handleOnChangeServerApply }
                        disabled={ !editMode }
                    >
                        서버적용
                    </Button>
                    }
                    <Button 
                        size="small" 
                        color="inherit" 
                        startIcon={ <RestartAltIcon color='inherit'/> } 
                        variant='contained' 
                        sx={{ mr: 1 }}
                        onClick={ handleOnReset }
                        disabled={ !editMode }
                    >
                        리셋
                    </Button>
                    <Button 
                        size="small" 
                        color="inherit" 
                        startIcon={<AddCircleIcon color='inherit'/>} 
                        variant='contained' 
                        sx={{ mr: 0 }}
                        onClick={ handleOnEmptyRowAddition }
                        disabled={ !editMode }
                    >
                        추가
                    </Button>
                </Box>
                }
            </Box>
            <Box component='div' sx={{ mt: 1.5, maxHeight: 400, overflow: 'auto' }}>
                <Table 
                    size="small" 
                    aria-label='schedule-job-details-table-label'
                    sx={{
                        "& .MuiTableCell-sizeSmall" : {
                            paddingLeft: "5px",
                            paddingRight: "5px",
                        }
                    }}
                >
                    <TableHead sx={{ backgroundColor: theme.palette.background.tableHead, position: "sticky", top: 0 }}>
                        <TableRow>
                            <TableCell type="small" padding='checkbox' align="center">
                                <Checkbox 
                                    checked={ allChecked } 
                                    size='small' 
                                    onClick={ handleOnAllCheck }
                                />
                            </TableCell>
                            <SortableTableHeadCell 
                                name="Entry Key"
                                columnName="entryKey"
                                onSort={ handleOnSort }
                                sortSelected={ "entryKey"===sortColumnName ? true : false }
                                helperText="영문, 숫자, -, _ 사용가능, camelCase/Kebap-case/snake_case 적용"
                                required
                            />
                            <SortableTableHeadCell 
                                name="Entry Value"
                                columnName="entryValue"
                                onSort={ handleOnSort }
                                sortSelected={ "entryValue"===sortColumnName ? true : false }
                                required
                            />
                            <SortableTableHeadCell 
                                name="Entry Value Type"
                                columnName="entryValueType"
                                onSort={ handleOnSort }
                                sortSelected={ "entryValueType"===sortColumnName ? true : false }
                                required
                            />                            
                            <TableCell>설명</TableCell>
                            <TableCell>변경</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    { jobDetails.map((detail, index)=>{
                        return (
                            <ScheduleJobDetailListTableRow 
                                key={ "schedule-detail-" + index }
                                seq={ index }
                                jobDetail={ detail }
                                editMode={ editMode }
                                onDelete={ handleOnRowDeletion }
                                onUpdate={ handleOnRowUpdate }
                                checked={ detail.checked === undefined ? false : detail.checked  }
                                onChecked={ hancleOnRowChecked }
                            />
                        )
                    })}
                    </TableBody>
                </Table>
            </Box>
        </Box>
    )
}

export default ScheduleJobDetailListTable;