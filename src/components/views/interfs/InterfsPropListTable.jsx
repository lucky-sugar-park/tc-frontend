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
import TableHeadCell from '../../widgets/table/TabelHeadCell';
import InterfsPropListTableRow from './InterfsPropListTableRow';

const InterfsPropListTable = (props) => {

    const theme = useTheme();

    const [editMode, setEditMode] = React.useState(props.editMode);
    const [sortColumnName, setSortColumnName] = React.useState("");
    const [rows, setRows] = React.useState([]);
    const [allChecked, setAllChecked] = React.useState(false);
    const [applied, setApplied] = React.useState(true);

    React.useEffect(()=>{
        if(props.rows===undefined) return;
        if(rows.length !== props.rows.length) {
            setApplied(false);
        }

        props.rows.sort((a,b)=>{
            return a.order-b.order;
        });
        setSortColumnName("order");
        setRows(props.rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.rows]);

    React.useEffect(()=>{
        if(props.onDisabled!==undefined) {
            props.onDisabled(editMode);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editMode]);

    const handleOnEmptyRowAddition = () => {
        setRows([...rows, {
            name: "",
            order: 0,
            type: "STRING",
            value: "",
            length: 0,
            description: "description",
            checked: false,
            oper: "N"
        }]);
    }

    const handleOnAllCheck = () => {
        for(var i=0;i<rows.length;i++) rows[i].checked=!allChecked;
        setAllChecked(!allChecked);
    }

    const hancleOnRowChecked = (seq, checked) => {
        rows[seq].checked=checked;
        var found=false;
        rows.forEach((v,i)=>{
            if(!v.checked) {
                found=true;
                return;
            }
        });
        if(!found) setAllChecked(true);
        else setAllChecked(false);
    }

    const handleOnRowDeletion = (seq) => {
        setRows(rows.filter((value,index)=>seq!==index));
    }

    const handleOnRowUpdate = (seq, propName, value) => {
        setApplied(false);
        const nrows = [];
        rows.forEach((row,index)=>{
            nrows.push(row);
        });
        nrows[seq][propName]=value;
        setRows(nrows);
    }

    const handleOnChangeApply = () => {
        setApplied(true);
        props.onUpdate(rows);
    }

    const handleOnChangeServerApply = () => {
        setApplied(true);
        props.onServerApply(rows);
    }

    const handleOnBatchDeletion = () => {

    }

    const handleOnReset = () => {
        props.onReset();
    }

    const handleOnSort = (columnName, direction) => {
        setSortColumnName(columnName);
        var temp=[];
        rows.forEach(row=>temp.push(row));
        temp.sort((a,b)=>{
            if(a[columnName]<=b[columnName]) return "ASC"===direction ? -1 : 1;
            return "ASC"===direction ? 1 : -1;
        });
        setRows(temp);        
    }

    return (
        <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", minWidth: "870px"}}>
                <Typography variant='h7' guttorBottom component='div'>{ props.title } ( { rows.length } )</Typography>
                {
                    props.updatable && props.updatable === true &&
                    <Box sx={{ display:"flex", alignItems:"center" }}>
                    <FormControlLabel 
                        sx={{ m: 0, pt: 0, mr: 1.5 }} 
                        control={<Switch size="small" checked={ editMode } />} 
                        label="Edit"
                        onClick={ (e)=>setEditMode(e.target.checked) }
                    />
                    { props.extensions&&props.extensions  }
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
                        size="small" 
                        color="inherit" 
                        startIcon={<CloudDoneIcon color='inherit'/>} 
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
                        startIcon={<RestartAltIcon color='inherit'/>} 
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
                    aria-label='interface-data-props'
                    sx={{
                        "& .MuiTableCell-sizeSmall" : {
                            paddingLeft: "5px",
                            paddingRight: "5px",
                        }
                    }}
                    // stickyHeader
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
                                name="이름"
                                columnName="name"
                                onSort={ handleOnSort }
                                sortSelected={ "name"===sortColumnName ? true : false }
                                helperText="영문, 숫자, _, Camel Case로 작성"
                                required
                            />
                            <SortableTableHeadCell 
                                name="순서"
                                columnName="order"
                                onSort={ handleOnSort }
                                sortSelected={ "order"===sortColumnName ? true : false }
                                helperText="데이터 배열순서"
                                required
                            />
                            <SortableTableHeadCell 
                                name="타입"
                                columnName="type"
                                onSort={ handleOnSort }
                                sortSelected={ "type"===sortColumnName ? true : false }
                                helperText="데이터 타입"
                                required
                            />
                            <SortableTableHeadCell 
                                name="길이"
                                columnName="length"
                                onSort={ handleOnSort }
                                sortSelected={ "length"===sortColumnName ? true : false }
                                helperText="데이터의 바이트 길이"
                                required
                            />
                            <TableHeadCell 
                                name="값"
                                columnName="value"
                                helperText="필요할 경우 입력"
                            />
                            <TableCell>설명</TableCell>
                            <TableCell align="center">삭제</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    { rows.map((row, index)=>{
                        return (
                            <InterfsPropListTableRow 
                                key={ "interfs-data-props-" + index }
                                seq={ index }
                                row={ row }
                                editMode={ editMode }
                                onDelete={ handleOnRowDeletion }
                                onUpdate={ handleOnRowUpdate }
                                checked={ row.checked === undefined ? false : row.checked  }
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

export default InterfsPropListTable;